import asyncio
import json
import logging
import sys
import time

import websockets
from getmac import get_mac_address
from websockets.exceptions import WebSocketException

import data
from response_handler import ResponseHandler


class Client:
    def __init__(self, host: str, ws_port: str, interval: int = 5000, reconnect_timeout: int = 5000):
        self.host = host
        self.ws_port = ws_port
        self.interval = interval
        self.reconnect_timeout = reconnect_timeout
        self.mac_address = None

    def init_mac_address(self):
        # data.ip()
        try:
            self.mac_address = get_mac_address()
        except Exception:
            pass

    async def loop(self) -> None:
        websocket_address = f'ws://{self.host}:{self.ws_port}/client/{self.mac_address}'
        async with websockets.connect(websocket_address) as websocket:
            logging.debug(f'Connected to "{websocket_address}"')

            async def receiving():
                while True:
                    try:
                        response = await websocket.recv()
                        logging.debug('Received message from server')
                        ResponseHandler(json.loads(response)).start()
                        await asyncio.sleep(1)
                    except WebSocketException:
                        logging.error('Connection lost')
                        break

            async def sending():
                while True:
                    msg = json.dumps({
                        'hostname': data.hostname(),
                        'ip': data.ip(),
                        'os': sys.platform,
                        'cpuUsage': int(data.cpu_usage(self.interval / 1000)),
                        'ramUsage': int(data.ram_usage()),
                        'diskUsage': int(data.disk_space_used()),
                        'installed': [*ResponseHandler.installed_packages_ids],
                        'failedInstall': [*ResponseHandler.failed_installs_ids],
                        'executedScripts': [*ResponseHandler.executed_scripts_ids],
                        'failedScripts': [*ResponseHandler.failed_scripts_ids]
                    })

                    try:
                        await websocket.send(msg)

                        logging.debug('Sent message to server')

                        # clear all lists
                        [c.clear() for c in [ResponseHandler.executed_scripts_ids,
                                             ResponseHandler.failed_scripts_ids,
                                             ResponseHandler.installed_packages_ids,
                                             ResponseHandler.failed_installs_ids]]

                    except WebSocketException:
                        logging.error('Connection lost')
                        break
                    await asyncio.sleep(1)

            await asyncio.wait([receiving(), sending()])

    def start(self) -> None:
        logging.debug('Client started')

        while self.mac_address is None:
            logging.error(f'Waiting for client to get a mac address!')
            self.init_mac_address()
            time.sleep(5)

        while True:
            try:
                asyncio.get_event_loop().run_until_complete(self.loop())
            except Exception:  # ConnectionError or WebSocketException or TimeoutError or OSError:
                logging.error('Could not connect')
            logging.error(f'Reconnecting in {self.reconnect_timeout}ms')
            time.sleep(self.reconnect_timeout / 1000)

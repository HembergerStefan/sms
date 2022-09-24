import socket
from threading import Thread

import requests

import health
from config import *


class StatsSenderThread(Thread):
    def __init__(self):
        super().__init__()

    def run(self) -> None:
        super().run()
        while True:
            response = requests.post(API_URL, data={
                'hostname': socket.gethostname(),
                'cpu_usage': health.cpu_usage(60),
                'ram_usage': health.ram_usage(),
                'disk_space_used': health.disk_space_used()
            })

            if response.status_code != 200:
                print(str(response))

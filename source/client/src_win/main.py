import configparser
import logging
import os

from client import Client


def init_logger(_format: str, filepath: str, level: int):
    log_formatter = logging.Formatter(_format)
    root_logger = logging.getLogger()

    file_handler = logging.FileHandler(filepath)
    file_handler.setFormatter(log_formatter)
    root_logger.addHandler(file_handler)

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(log_formatter)
    root_logger.addHandler(console_handler)
    root_logger.setLevel(level)


def main():
    app_dir = r"C:\Program Files\SMS"
    config = configparser.ConfigParser()
    config.read(os.path.join(app_dir, 'config.ini'))

    init_logger(_format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
                filepath=os.path.join(app_dir, 'sms_client.log'),
                level=logging.DEBUG)

    Client(host=config['SERVER']['HOST'],
           ws_port=config['SERVER']['WEBSOCKET_PORT'],
           interval=int(config['APP']['SENDING_INTERVAL']),
           reconnect_timeout=int(config['APP']['RECONNECT_TIMEOUT'])).start()


if __name__ == '__main__':
    main()

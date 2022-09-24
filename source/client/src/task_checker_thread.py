from threading import Thread

import requests

import health
from config import *


class TaskCheckerThread(Thread):
    def __init__(self):
        super().__init__()

    def run(self) -> None:
        super().run()
        requests.post(API_URL, data={
            'cpu_usage': health.cpu_usage(1),
            'ram_usage': health.ram_usage(),
            'disk_space_used': health.disk_space_used()
        })

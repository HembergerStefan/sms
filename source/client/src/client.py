from config import MAC_ADDRESS
from stats_sender_thread import StatsSenderThread
from task_checker_thread import TaskCheckerThread


class Client:
    def __init__(self):
        ...

    def start(self):
        print('Client started:', MAC_ADDRESS)
        StatsSenderThread().start()
        TaskCheckerThread().start()

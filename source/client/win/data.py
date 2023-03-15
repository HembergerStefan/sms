import shutil
import socket

import psutil


def cpu_usage(seconds: float) -> float:
    return psutil.cpu_percent(seconds)


def ram_usage() -> float:
    return psutil.virtual_memory().percent


def disk_space_used() -> float:
    total, used, free = shutil.disk_usage('/')
    used_space = int(100 / total * used)
    return used_space


def free_disk_space() -> float:
    total, used, free = shutil.disk_usage('/')
    free_space = int(100 / total * free)
    return free_space


def hostname() -> str:
    return socket.gethostname()


def ip() -> str:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(('8.8.8.8', 80))
    _ip = s.getsockname()[0]
    s.close()
    return _ip

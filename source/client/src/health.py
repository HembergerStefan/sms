import psutil
import shutil


def cpu_percent(seconds: float) -> float:
    return psutil.cpu_percent(seconds)


def ram_percent() -> float:
    return psutil.virtual_memory().percent


def used_disk_space() -> float:
    total, used, free = shutil.disk_usage("/")
    used_space = int(100 / total * used)
    return used_space


def free_disk_space() -> float:
    total, used, free = shutil.disk_usage("/")
    free_space = int(100 / total * free)
    return free_space

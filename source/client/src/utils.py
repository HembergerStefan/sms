import os
import urllib.request
import uuid


def get_download_folder_path():
    return os.path.join(os.getenv('USERPROFILE'), 'Downloads')


def download_file(url: str) -> str:
    ori_filename = url[url.rindex('/') + 1:]
    downloaded_file_path = f'{get_download_folder_path()}\\{ori_filename}'
    while os.path.exists(downloaded_file_path):
        filename = f'{uuid.uuid4()}_{ori_filename}'
        downloaded_file_path = f'{get_download_folder_path()}\\{filename}'

    urllib.request.urlretrieve(url, downloaded_file_path)
    return downloaded_file_path

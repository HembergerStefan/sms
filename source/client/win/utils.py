import os
import urllib.request
import uuid


def get_download_folder_path():
    return os.path.join(os.getenv('USERPROFILE'), 'Downloads')


def download_file(url: str) -> tuple[int, str]:
    try:
        ori_filename = url[url.rindex('/') + 1:]
    except ValueError:
        ori_filename = uuid.uuid4()

    # create non existing filename
    downloaded_file_path = f'{get_download_folder_path()}\\{ori_filename}'
    while os.path.exists(downloaded_file_path):
        filename = f'{uuid.uuid4()}_{ori_filename}'
        downloaded_file_path = f'{get_download_folder_path()}\\{filename}'

    # download from url
    try:
        urllib.request.urlretrieve(url, downloaded_file_path)
    except Exception as e:
        return False, str(e)

    return True, downloaded_file_path


if __name__ == '__main__':
    print(download_file(
        "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.4.7/npp.8.4.7.Installer.x64.exe"))

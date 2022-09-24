import os
import subprocess
import urllib.request
import uuid

from getmac import get_mac_address

import config


# def register(api_url) -> str:
#     return 'f24ffee8-9f10-4dda-8832-89c7eeea69a7'
#     response = requests.get(api_url).json()
#     uuid = response['uuid']
#     return uuid


def install(installer_url: str):
    ori_filename = installer_url[installer_url.rindex('/') + 1:]
    downloaded_file_path = f'{get_download_folder_path()}\\{ori_filename}'
    while os.path.exists(downloaded_file_path):
        print(downloaded_file_path, 'exists!')
        filename = f'{uuid.uuid4()}_{ori_filename}'
        downloaded_file_path = f'{get_download_folder_path()}\\{filename}'

    urllib.request.urlretrieve(installer_url, downloaded_file_path)
    subprocess.run([downloaded_file_path, "/S"])
    os.remove(downloaded_file_path)
    print('installed successfully')


def run_script(script_url: str):
    ori_filename = script_url[script_url.rindex('/') + 1:]
    downloaded_file_path = f'{get_download_folder_path()}\\{ori_filename}'
    while os.path.exists(downloaded_file_path):
        print(downloaded_file_path, 'exists!')
        filename = f'{uuid.uuid4()}_{ori_filename}'
        downloaded_file_path = f'{get_download_folder_path()}\\{filename}'

    urllib.request.urlretrieve(script_url, downloaded_file_path)
    subprocess.run(['python', downloaded_file_path])
    os.remove(downloaded_file_path)
    print('installed successfully')


def get_download_folder_path():
    return os.path.join(os.getenv('USERPROFILE'), 'Downloads')


def init_constants():
    config.API_URL = 'http://192.168.178.27:8080'
    config.MAC_ADDRESS = get_mac_address()


def main():
    npp = 'https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.4.5/npp.8.4.5.Installer.x64.exe'
    run_script('https://download2293.mediafire.com/dnfqirsgk0hg/3ltoj2wu7yixeni/test_scri%27%2B%27pt.py')
    # install(npp)
    # Client().start()


if __name__ == '__main__':
    main()

import logging
import os
import subprocess

import utils


# def install(installer_url: str):
#     downloaded_file_path = download_file(installer_url)
#     subprocess.run([downloaded_file_path, '/S'])
#     os.remove(downloaded_file_path)
#     print('installed successfully')


class PackageInstaller:
    def __init__(self, package: dict):
        self.package = package

    def install(self) -> int:
        logging.debug(f'Downloading {self.package["downloadlink"]}')
        success, filepath = utils.download_file(self.package['downloadlink'])
        if success:
            logging.debug(f'Downloaded file at "{filepath}"')

            resp = subprocess.run([filepath, self.package['silentSwitch']])
            os.remove(filepath)
            if resp.returncode == 0:
                logging.debug(f'{self.package["name"]} installed successfully')
            else:
                logging.error(f'Could not install {self.package["name"]} error code {resp.returncode}')
            return resp.returncode
        else:
            logging.error(f'Could not download {self.package["name"]} from {self.package["downloadlink"]}')
        return -1

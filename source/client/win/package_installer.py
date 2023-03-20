import logging
import os
import subprocess

import utils


class PackageInstaller:
    def __init__(self, package: dict):
        self.package = package

    def install(self) -> int:
        logging.debug(f'Downloading {self.package["downloadLink"]}')
        success, filepath = utils.download_file(self.package['downloadLink'])

        if success:
            logging.debug(f'Downloaded file at "{filepath}"')

            # silent install the package
            resp = subprocess.run([filepath, self.package['silentSwitch']])
            os.remove(filepath)

            if resp.returncode == 0:
                logging.debug(f'{self.package["name"]} installed successfully')
            else:
                logging.error(f'Could not install {self.package["name"]} error code {resp.returncode}')
            return resp.returncode
        else:
            logging.error(f'Could not download {self.package["name"]} from {self.package["downloadLink"]}')
        return -1

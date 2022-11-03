import logging
import os
import subprocess
import tempfile


class ScriptExecutor:
    def __init__(self, script: dict):
        self.script = script

    def execute(self) -> int:
        file = tempfile.TemporaryFile(delete=False, mode='w')
        logging.debug(f'Writing temp file "{file.name}"')
        file.writelines(u'{}'.format(self.script["scriptValue"]))
        file.close()

        logging.debug(f"Executing \"{self.script['interpreter']} {file.name}\"")
        resp = subprocess.run([self.script['interpreter'], file.name])

        if resp.returncode == 0:
            logging.debug(f'{self.script["name"]} executed successfully')
        else:
            logging.error(f'Error while executing {self.script["name"]} error code {resp.returncode}')

        os.remove(file.name)

        return resp.returncode

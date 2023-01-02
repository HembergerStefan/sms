import logging
import os
import subprocess
import tempfile


class ScriptExecutor:
    def __init__(self, script: dict):
        self.script = script

    def execute(self) -> int:

        # file = tempfile.TemporaryFile(delete=False, mode='w')
        file = tempfile.NamedTemporaryFile(suffix=f'.{self.script["fileExtension"]}', delete=False, mode='w')
        logging.debug(f'Writing temp file "{file.name}"')
        file.writelines(u'{}'.format(self.script["script_value"]))
        file.close()

        import time
        time.sleep(3)

        logging.debug(f"Executing \"{self.script['interpreter']} {file.name}\"")

        if self.script['interpreter'] == 'python':
            resp = subprocess.run([self.script['interpreter'], file.name], shell=True)
        elif self.script['interpreter'] == 'cmd':
            resp = subprocess.run(file.name, shell=True)
        else:
            return -1

        if resp.returncode == 0:
            logging.debug(f'{self.script["name"]} executed successfully error code {resp.returncode}')
        else:
            logging.error(f'Error while executing {self.script["name"]} error code {resp.returncode}')

        os.remove(file.name)

        return resp.returncode

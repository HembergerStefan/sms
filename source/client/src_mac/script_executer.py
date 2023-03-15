import logging
import os
import subprocess
import tempfile


class ScriptExecutor:
    def __init__(self, script: dict):
        self.script = script

    def execute(self) -> int:

        # creating temporary script file to execute
        file = tempfile.NamedTemporaryFile(suffix=f'.{self.script["fileExtension"].lower()}',
                                           delete=False,
                                           mode='w',
                                           encoding='utf-8')

        logging.debug(f'Writing temp file "{file.name}"')
        file.writelines(u'{}'.format(self.script["scriptValue"]))
        file.close()

        logging.debug(f"Executing \"{self.script['interpreter']} {file.name}\"")

        interpreter = self.script['interpreter'].lower()

        # run the script, with the right interpreter
        if interpreter == 'bash':
            resp = subprocess.run(['sudo', 'bash', file.name])
        else:
            return -1

        if resp.returncode == 0:
            logging.debug(f'{self.script["name"]} executed successfully error code {resp.returncode}')
        else:
            logging.error(f'Error while executing {self.script["name"]} error code {resp.returncode}')

        os.remove(file.name)

        return resp.returncode

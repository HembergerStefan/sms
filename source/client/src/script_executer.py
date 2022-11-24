import logging
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

        resp = subprocess.run([self.script['interpreter'], file.name], shell=True)
        # resp = subprocess.Popen([file.name], shell=True)
        # vimport os
        # vos.system(f'cmd /c {self.script["script_value"]}')
        # vsubprocess.run(['cmd'])
        if resp.returncode == 0:
            logging.debug(f'{self.script["name"]} executed successfully')
        else:
            logging.error(f'Error while executing {self.script["name"]} error code {resp.returncode}')

        # os.remove(file.name)

        return 0  # resp.returncode

from threading import Thread

from package_installer import PackageInstaller
from script_executer import ScriptExecutor


class ResponseHandler(Thread):
    current_scripts_ids: set[str] = set()
    current_packages_ids: set[str] = set()

    executed_scripts_ids: set[str] = set()

    def __init__(self, response: dict):
        super().__init__()
        self.response = response

    def run(self) -> None:
        for package in self.response['dtopackages']:
            if package['id'] not in self.current_packages_ids:
                self.current_packages_ids.add(package['id'])

                def install_package():
                    current_package = package  # prevent package from changing
                    PackageInstaller(current_package).install()

                Thread(target=install_package).start()

        for script in self.response['dtoScripts']:
            if script['id'] not in self.current_scripts_ids:
                self.current_scripts_ids.add(script['id'])

                def exec_script():
                    current_script = script  # prevent script from changing
                    ScriptExecutor(current_script).execute()
                    self.executed_scripts_ids.add(current_script['id'])

                Thread(target=exec_script).start()

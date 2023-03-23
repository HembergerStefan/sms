from threading import Thread

from package_installer import PackageInstaller
from script_executer import ScriptExecutor


class ResponseHandler(Thread):
    # currently executing scripts or packages
    current_scripts_ids: set[str] = set()
    current_packages_ids: set[str] = set()

    # scripts
    executed_scripts_ids: set[str] = set()
    failed_scripts_ids: set[str] = set()

    # packages
    installed_packages_ids: set[str] = set()
    failed_installs_ids: set[str] = set()

    def __init__(self, response: dict):
        super().__init__()
        self.response = response

    def run(self) -> None:
        for package in self.response['dtopackages']:
            if package['id'] not in self.current_packages_ids:
                self.current_packages_ids.add(package['id'])

                def install_package():
                    current_package = package  # prevent package from changing
                    return_code = PackageInstaller(current_package).install()
                    if return_code == 0:
                        self.installed_packages_ids.add(current_package['id'])
                    else:
                        self.failed_installs_ids.add(current_package['id'])
                    self.current_packages_ids.remove(current_package['id'])

                Thread(target=install_package).start()

        for script in self.response['dtoScripts']:
            if script['id'] not in self.current_scripts_ids:
                self.current_scripts_ids.add(script['id'])

                def exec_script():
                    current_script = script  # prevent script from changing
                    return_code = ScriptExecutor(current_script).execute()
                    if return_code == 0:
                        self.executed_scripts_ids.add(current_script['id'])
                    else:
                        self.failed_scripts_ids.add(current_script['id'])
                    self.current_scripts_ids.remove(current_script['id'])

                Thread(target=exec_script).start()

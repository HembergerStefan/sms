import requests
import yaml


class Client:
    def __init__(self, uuid: str):
        self.uuid = uuid

    def start(self):
        print('Client is registered:', self.uuid)


def register(api_url) -> str:
    return 'f24ffee8-9f10-4dda-8832-89c7eeea69a7'
    response = requests.get(api_url).json()
    uuid = response['uuid']
    return uuid


def create_ini(uuid: str) -> None:
    with open('config.ini', 'w') as file:
        file.write(f'clientId: {uuid}')
        file.close()


def read_uuid():
    try:
        with open('config.ini', 'r') as file:
            config = yaml.load(file, Loader=yaml.FullLoader)
            uuid = config['clientId']
            return uuid
    except Exception:
        return None


def main():

    api_url = 'http://192.168.178.27:8080/client/getUUID'
    uuid = read_uuid()

    while uuid is None:
        user_input = input('Register Client? (y/n): ')
        if user_input in ['y', 'yes', 'j', 'ja']:
            uuid = register(api_url)
            if uuid is not None:
                create_ini(uuid)

    Client(uuid).start()


if __name__ == '__main__':
    main()

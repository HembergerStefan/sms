import requests


class Client:
    def __init__(self, uuid: str):
        self.uuid = uuid

    def start(self):
        print('Client is alive')


def register(api_url) -> str:
    response = requests.get(api_url).json()
    uuid = response['uuid']
    return uuid


def main():
    registered = False
    uuid = '57a67049-3e3c-456e-9d7a-f99f88a4c72d'
    api_url = 'https://apiurl.com/endpoint'

    while not registered:
        user_input = input('Register Client? (y/n): ')
        if user_input in ['y', 'yes', 'j', 'ja']:
            uuid = register(api_url)
            if uuid is not None:
                registered = True

    Client(uuid).start()


if __name__ == '__main__':
    main()

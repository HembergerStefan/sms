import {Client, Group} from '../../data/data_types'

export default class WebSocketService {

    constructor(private socket: WebSocket) {
    }

    public initWebSocket(setUsers: Function, setGroups: Function, setClients: Function) {
        this.socket.onmessage = (event) => {
            const json = JSON.parse(event.data)

            try {
                if ((json.event = 'data')) {
                    /* Set user data */
                    this.setWebSocketUserData(json, setUsers)
                    /* Set group data */
                    this.setWebSocketGroupData(json.groups, setGroups, setClients)
                }
            } catch (err) {
                console.log(`websocket exception: ${err}`)
            }
        }
    }

    private setWebSocketUserData = (json: any, setUsers: Function) => {
        setUsers([{
            id: json.id,
            username: json.username,
            password: '',
            role: json.role.id
        }])
    }

    private setWebSocketGroupData = (json: any, setGroups: Function, setClients: Function) => {
        const groupsTemp: Group[] = []
        let clientsTempList: Client[] = []

        json.forEach((entry: any) => {
            const clientsTemp: string[] = []

            entry.clients.forEach((client: { macAddress: { macAddress: string } }) => {
                clientsTemp.push(client.macAddress.macAddress)

                /* Set client data */
                this.setWebSocketClientData(client, clientsTempList)
            })

            groupsTemp.push({
                id: entry.id,
                name: entry.name,
                clients: clientsTemp,
                users: []
            })
        })

        clientsTempList = clientsTempList.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.macAddress === value.macAddress
                ))
        )

        setGroups(groupsTemp)
        setClients(clientsTempList)
    }

    private setWebSocketClientData = (entry: any, clientsTemp: Client[]) => {
        const scriptsTemp: string[] = []
        const packagesTemp: string[] = []

        if (entry.scripts.length !== 0) {
            entry.scripts.forEach((scriptEntry: { id: string }) => {
                scriptsTemp.push(scriptEntry.id)
            })
        }

        if (entry.packages.length !== 0) {
            entry.packages.forEach((_package: { id: string }) => {
                packagesTemp.push(_package.id)
            })
        }

        clientsTemp.push({
            macAddress: entry.macAddress.macAddress,
            name: entry.name,
            ip: entry.ip,
            os: entry.os,
            lastOnline: new Date(entry.lastOnline),
            usedDiskspace: Number(entry.usedDiskspace),
            cpuUsage: Number(entry.cpuUsage),
            ramUsage: Number(entry.ramUsage),
            packages: packagesTemp,
            scripts: scriptsTemp
        })
    }
}
import create from 'zustand'

import {formatDistance} from 'date-fns'

import {Client} from '../data/data_types'

interface ClientSlice {
    clients: Client[]
    setClients: (entries: Client[]) => void
    addingClient: Client
    addClient: (entry: Client) => void
    removeClient: (macAddress: string) => void
    resetClient: () => void
    getClientByMacAddress: (macAddress: string) => Client
    getClientOnlineStatus: (macAddress: string) => { status: 'Online' | 'Offline', lastOnline: string }
}

export const initialClientState: Client = {
    macAddress: '',
    name: '',
    ip: '',
    lastOnline: new Date(),
    usedDiskspace: 0,
    cpuUsage: 0,
    groups: []
}

const useClientStore = create<ClientSlice>((set, get) => ({
    clients: [],
    addingClient: {
        macAddress: '',
        name: '',
        ip: '',
        lastOnline: new Date(),
        usedDiskspace: 0,
        cpuUsage: 0,
        groups: []
    },
    setClients: (entries) => set(state => ({
        clients: state.clients = entries
    })),
    addClient: (entry) => {
        let clients = get().clients

        clients.forEach(client => {
            if (client.macAddress === entry.macAddress) {
                clients = clients.filter((client) => client.macAddress !== entry.macAddress)
            }
        })

        clients.push(entry)

        set((state) => ({
            clients: state.clients = [...clients],
            addingClient: state.addingClient = {
                macAddress: '',
                name: '',
                ip: '',
                lastOnline: new Date(),
                usedDiskspace: 0,
                cpuUsage: 0,
                groups: []
            } // Reset, to add new data
        }))
    },
    removeClient: (macAddress) => set((state) => ({
        clients: state.clients.filter((client) => client.macAddress !== macAddress)
    })),
    resetClient: () => set(state => ({
        clients: state.clients = []
    })),
    getClientByMacAddress: (macAddress) => {
        const selectedClient = get().clients.find((client) => client.macAddress === macAddress)

        if (selectedClient !== undefined) {
            return selectedClient
        }

        return initialClientState
    },
    getClientOnlineStatus: (macAddress) => {
        const client = get().getClientByMacAddress(macAddress)

        if (client === undefined) {
            return {status: 'Offline', lastOnline: new Date().toLocaleString()}
        }

        const timeDiff = new Date().getTime() - client.lastOnline.getTime()

        // Last five minutes
        if (timeDiff <= 300_000) {
            return {status: 'Online', lastOnline: String(timeDiff)}
        }

        return {
            status: 'Offline', lastOnline: formatDistance(client.lastOnline, new Date(), {addSuffix: true})
        }
    }
}))

export default useClientStore
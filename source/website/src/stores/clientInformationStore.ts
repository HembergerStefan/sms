import {create} from 'zustand'

import {formatDistance} from 'date-fns'
import {deAT, enUS} from 'date-fns/locale'

import {Client} from '../data/data_types'

interface ClientSlice {
    clients: Client[]
    setClients: (entries: Client[]) => void
    addingClient: Client
    addClient: (entry: Client) => void
    removeClient: (macAddress: string) => void
    resetClient: () => void
    getClientByMacAddress: (macAddress: string) => Client | undefined
    getClientByName: (name: string) => Client | undefined
    getClientOnlineStatus: (macAddress: string, selectedLng?: string) => { status: 'Online' | 'Offline', lastOnline: string }
    getOnlineClients: () => Client[]
    getScriptsOfClients: () => string[]
}

export const initialClientState: Client = {
    macAddress: '',
    name: '',
    ip: '',
    os: '',
    lastOnline: new Date(),
    usedDiskspace: 0,
    cpuUsage: 0,
    ramUsage: 0,
    scripts: [],
    packages: []
}

const useClientStore = create<ClientSlice>((set, get) => ({
        clients: [],
        addingClient: {
            macAddress: '',
            name: '',
            ip: '',
            os: '',
            lastOnline: new Date(),
            usedDiskspace: 0,
            cpuUsage: 0,
            ramUsage: 0,
            scripts: [],
            packages: []
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
                    os: '',
                    lastOnline: new Date(),
                    usedDiskspace: 0,
                    cpuUsage: 0,
                    ramUsage: 0,
                    scripts: [],
                    packages: []
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

            return undefined
        },
        getClientByName: (name) => {
            const selectedClient = get().clients.find((client) => client.name === name)

            if (selectedClient !== undefined) {
                return selectedClient
            }

            return undefined
        },
        getClientOnlineStatus: (macAddress, selectedLng) => {
            const client: Client | undefined = get().getClientByMacAddress(macAddress)

            if (client === undefined) {
                return {
                    status: 'Offline', lastOnline: formatDistance(new Date(), new Date(), {
                        addSuffix: true,
                        locale: selectedLng === 'de' ? deAT : enUS
                    })
                }
            }

            const timeDiff = new Date().getTime() - new Date(client.lastOnline).getTime()

            // Last five minutes
            if (timeDiff <= 300_000) {
                return {
                    status: 'Online', lastOnline: formatDistance(new Date(client.lastOnline), new Date(), {
                        addSuffix: true,
                        locale: selectedLng === 'de' ? deAT : enUS
                    })
                }
            }

            return {
                status: 'Offline',
                lastOnline: formatDistance(new Date(client.lastOnline), new Date(), {
                    addSuffix: true,
                    locale: selectedLng === 'de' ? deAT : enUS
                })
            }
        },
        getOnlineClients: () => {
            const onlineClients: Client[] = []

            get().clients.forEach(client => {
                if (get().getClientOnlineStatus(client.macAddress).status === 'Online') {
                    onlineClients.push(client)
                }
            })

            return onlineClients
        },
        getScriptsOfClients: () => {
            const scripts: string[] = []

            get().clients.forEach(client => {
                client.scripts.forEach(script => {
                    if (!scripts.includes(script)) {
                        scripts.push(script)
                    }
                })
            })

            return scripts
        }
    })
)

export default useClientStore
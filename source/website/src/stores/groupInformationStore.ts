import {create} from 'zustand'

import {Group} from '../data/data_types'

export interface GroupSlice {
    groups: Group[]
    setGroups: (entries: Group[]) => void
    addingGroup: Group
    addGroup: (entry: Group) => void
    removeGroup: (id: string) => void
    resetGroup: () => void
    resetAddingGroup: () => void
    getGroupById: (id: string) => Group
    getGroupByName: (name: string) => Group
    getGroupsOfClient: (macAddress: string) => Group[]
    getClientsOfGroups: () => string[]
    getAverageClientsPerGroup: () => number
}

export const initialGroupState: Group = {
    id: '',
    name: '',
    clients: [],
    users: []
}

const useGroupStore = create<GroupSlice>((set, get) => ({
        groups: [],
        addingGroup: {
            id: '',
            name: '',
            clients: [],
            users: []
        },
        setGroups: (entries) => set(state => ({
            groups: state.groups = entries
        })),
        addGroup: (entry) => {
            let groups = get().groups

            groups.forEach(group => {
                if (group.id === entry.id) {
                    groups = groups.filter((group) => group.id !== entry.id)
                }
            })

            groups.push(entry)

            set((state) => ({
                groups: state.groups = [...groups],
                addingGroup: state.addingGroup = {
                    id: '',
                    name: '',
                    clients: [],
                    users: []
                } // Reset, to add new data
            }))
        },
        removeGroup: (id) => set((state) => ({
            groups: state.groups.filter((group) => group.id !== id)
        })),
        resetGroup: () => set(state => ({
            groups: state.groups = []
        })),
        resetAddingGroup: () => set(state => ({
            addingGroup: state.addingGroup = {
                id: '',
                name: '',
                clients: [],
                users: []
            } // Reset, to add new data
        })),
        getGroupById: (id) => {
            const selectedGroup = get().groups.find((group) => group.id === id)

            if (selectedGroup !== undefined) {
                return selectedGroup
            }

            return initialGroupState
        },
        getGroupByName: (name) => {
            const selectedGroup = get().groups.find((group) => group.name === name)

            if (selectedGroup !== undefined) {
                return selectedGroup
            }

            return initialGroupState
        },
        getGroupsOfClient: (macAddress) => {
            const selectedGroups: Group[] = []

            get().groups.forEach(group => {
                group.clients.forEach(client => {
                    if (client === macAddress) {
                        selectedGroups.push(group)
                    }
                })
            })

            return selectedGroups
        },
        getClientsOfGroups: () => {
            const clients: string[] = []

            get().groups.forEach(group => {
                group.clients.forEach(client => {
                    if (!clients.includes(client)) {
                        clients.push(client)
                    }
                })
            })

            return clients
        },
        getAverageClientsPerGroup: () => {
            const groupClients: string[] = get().getClientsOfGroups()
            return Math.round(((groupClients.length / get().groups.length) + Number.EPSILON) * 100) / 100
        }
    })
)


export default useGroupStore
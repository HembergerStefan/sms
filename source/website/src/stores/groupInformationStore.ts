import create from 'zustand'

import {Group} from '../data/data_types'

export interface GroupSlice {
    groups: Group[]
    setGroups: (entries: Group[]) => void
    addingGroup: Group
    addGroup: (entry: Group) => void
    removeGroup: (id: number) => void
    resetGroup: () => void
    getGroupById: (id: number) => Group
    getGroupByName: (name: string) => Group
}

export const initialGroupState: Group = {
    id: -1,
    name: '',
    clients: []
}

const useGroupStore = create<GroupSlice>((set, get) => ({
    groups: [],
    addingGroup: {
        id: -1,
        name: '',
        clients: []
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
                id: -1,
                name: '',
                clients: []
            } // Reset, to add new data
        }))
    },
    removeGroup: (id) => set((state) => ({
        groups: state.groups.filter((group) => group.id !== id)
    })),
    resetGroup: () => set(state => ({
        groups: state.groups = []
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
}))


export default useGroupStore
import { create } from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import {Client, Group} from '../data/data_types'
import {initialClientState} from './clientInformationStore'
import {initialGroupState} from './groupInformationStore'

export interface FilterDataListStore {
    forClient: Client
    forGroup: Group
    setForClient: (client: Client) => void
    setForGroup: (group: Group) => void
}

const useFilterDataListStore = create(
    persist<FilterDataListStore>((set, get) => ({
            table: null,
            forClient: initialClientState,
            forGroup: initialGroupState,
            setForClient: (client) => set(prev => ({
                forClient: prev.forClient = client
            })),
            setForGroup: (group) => set(prev => ({
                forGroup: prev.forGroup = group
            })),
        }), {
            name: 'filter-data-list-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useFilterDataListStore
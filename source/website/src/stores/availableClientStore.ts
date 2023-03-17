import {create} from 'zustand'

import {AvailableClient} from '../data/data_types'

export interface AvailableClientStore {
    availableClients: AvailableClient[]
    setAvailableClients: (clients: AvailableClient[]) => void
}

const useAvailableClientStore = create<AvailableClientStore>((set, get) => ({
        availableClients: [],
        setAvailableClients: (clients) => set(prev => ({
            availableClients: prev.availableClients = clients
        })),
    })
)


export default useAvailableClientStore
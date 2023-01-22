import create from 'zustand'
import {persist} from 'zustand/middleware'

import {AvailableClient} from '../data/data_types'

export interface AvailableClientStore {
    availableClients: AvailableClient[]
    setAvailableClients: (clients: AvailableClient[]) => void
}

const useAvailableClientStore = create(
    persist<AvailableClientStore>((set, get) => ({
            availableClients: [],
            setAvailableClients: (clients) => set(prev => ({
                availableClients: prev.availableClients = clients
            })),
        }), {
            name: 'available-client-store',
            getStorage: () => sessionStorage
        }
    )
)


export default useAvailableClientStore
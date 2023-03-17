import { create } from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export interface CardListClientStore {
    clientDisplayMode: 'Table' | 'Card'
    clientPageSize: number
    clientPageIndex: number
    clientPageCount: number
    canNextClientPage: () => boolean
    canPreviousClientPage: () => boolean
    setClientDisplayMode: (clientDisplayMode: 'Table' | 'Card') => void
    nextClientPage: () => void
    previousClientPage: () => void
    setClientPageSize: (size: number) => void
    setClientPageIndex: (index: number) => void
    setClientPageCount: (size: number) => void
}

const useCardListClientStore = create(
    persist<CardListClientStore>((set, get) => ({
            clientDisplayMode: 'Card',
            clientPageSize: 6,
            clientPageIndex: 0,
            clientPageCount: 0,
            setClientDisplayMode: (clientDisplayMode) => set(state => ({
                clientDisplayMode: state.clientDisplayMode = clientDisplayMode
            })),
            nextClientPage: () => {
                if (get().canNextClientPage()) {
                    set(prev => ({
                        clientPageIndex: prev.clientPageIndex = prev.clientPageIndex + 1
                    }))
                }
            },
            previousClientPage: () => {
                if (get().canPreviousClientPage()) {
                    set(prev => ({
                        clientPageIndex: prev.clientPageIndex = prev.clientPageIndex - 1
                    }))
                }
            },
            setClientPageSize: (size) => {
                /* Set page index to first page then change the page size */
                set(prev => ({
                    clientPageIndex: prev.clientPageIndex = 0
                }))

                set(prev => ({
                    clientPageSize: prev.clientPageSize = size
                }))
            },
            setClientPageIndex: (index) => set(prev => ({
                clientPageIndex: prev.clientPageIndex = index
            })),
            setClientPageCount: (size) => {
                set(prev => ({
                    clientPageCount: prev.clientPageCount = size
                }))
            },
            canPreviousClientPage: () => {
                return get().clientPageIndex > 0
            },
            canNextClientPage: () => {
                if (get().clientPageCount === -1) {
                    return true
                }

                if (get().clientPageCount === 0 || get().clientPageCount === 1) {
                    return false
                }

                return get().clientPageIndex < get().clientPageCount - 1
            }
        }), {
            name: 'card-list-client-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useCardListClientStore
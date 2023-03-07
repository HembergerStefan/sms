import create from 'zustand'
import {persist} from 'zustand/middleware'

export interface DataListClientStore {
    table: any
    clientPageSize: number
    clientPageIndex: number
    clientPageCount: number
    canNextClientPage: () => boolean
    canPreviousClientPage: () => boolean
    selectionClientRows: number[]
    setClientTable: (table: any) => void
    nextClientPage: () => void
    previousClientPage: () => void
    setClientPageSize: (size: number) => void
    setClientPageIndex: (index: number) => void
    setClientPageCount: (size: number) => void
    setSelectionClientRows: (rows: number[]) => void
}

const useDataListClientStore = create(
    persist<DataListClientStore>((set, get) => ({
            table: null,
            clientPageSize: 10,
            clientPageIndex: 0,
            clientPageCount: 0,
            selectionClientRows: [],
            setClientTable: (table) => set(prev => ({
                table: prev.table = table
            })),
            nextClientPage: () => {
                if (get().table !== null) {
                    get().table.nextPage()
                }
            },
            previousClientPage: () => {
                if (get().table !== null) {
                    get().table.previousPage()
                }
            },
            setClientPageSize: (size) => set(prev => ({
                clientPageSize: prev.clientPageSize = size
            })),
            setClientPageIndex: (index) => set(prev => ({
                clientPageIndex: prev.clientPageIndex = index
            })),
            setClientPageCount: (size) => set(prev => ({
                clientPageCount: prev.clientPageCount = size
            })),
            canPreviousClientPage: () => {
                return get().clientPageIndex > 0
            },
            canNextClientPage: () => {
                if (get().clientPageCount === -1) {
                    return true
                }

                if (get().clientPageCount === 0) {
                    return false
                }

                return get().clientPageIndex < get().clientPageCount - 1
            },
            setSelectionClientRows: (rows) => set(prev => ({
                selectionClientRows: prev.selectionClientRows = rows
            }))
        }), {
            name: 'data-list-client-store',
            getStorage: () => sessionStorage
        }
    )
)


export default useDataListClientStore
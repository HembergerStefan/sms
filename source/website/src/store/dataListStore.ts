import create from 'zustand'
import {persist} from 'zustand/middleware'

export interface DataListStore {
    table: any
    pageSize: number
    pageIndex: number
    pageCount: number
    canNextPage: () => boolean
    canPreviousPage: () => boolean
    setTable: (table: any) => void
    nextPage: () => void
    previousPage: () => void
    setPageSize: (size: number) => void
    setPageIndex: (index: number) => void
    setPageCount: (size: number) => void
}

const useDataListStore = create(
    persist<DataListStore>((set, get) => ({
            table: null,
            pageSize: 10,
            pageIndex: 0,
            pageCount: 0,
            setTable: (table) => set(prev => ({
                table: prev.table = table
            })),
            nextPage: () => {
                if (get().table !== null) {
                    get().table.nextPage()
                }
            },
            previousPage: () => {
                if (get().table !== null) {
                    get().table.previousPage()
                }
            },
            setPageSize: (size) => set(prev => ({
                pageSize: prev.pageSize = size
            })),
            setPageIndex: (index) => {
                set(prev => ({
                    pageIndex: prev.pageIndex = index
                }))
            },
            setPageCount: (size) => {
                set(prev => ({
                    pageCount: prev.pageCount = size
                }))
            },
            canPreviousPage: () => {
                return get().pageIndex > 0
            },
            canNextPage: () => {
                if (get().pageCount === -1) {
                    return true
                }

                if (get().pageCount === 0) {
                    return false
                }

                return get().pageIndex < get().pageCount - 1
            },
        }), {
            name: 'data-list-store',
            getStorage: () => sessionStorage
        }
    )
)


export default useDataListStore
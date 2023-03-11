import { create } from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export interface FilterDataListUserGroupStore {
    table: any
    filterPageSize: number
    filterPageIndex: number
    filterPageCount: number
    canNextFilterPage: () => boolean
    canPreviousFilterPage: () => boolean
    setFilterTable: (table: any) => void
    nextFilterPage: () => void
    previousFilterPage: () => void
    setFilterPageSize: (size: number) => void
    setFilterPageIndex: (index: number) => void
    setFilterPageCount: (size: number) => void
}

const useFilterDataListUserGroupStore = create(
    persist<FilterDataListUserGroupStore>((set, get) => ({
            table: null,
            filterPageSize: 10,
            filterPageIndex: 0,
            filterPageCount: 0,
            setFilterTable: (table) => set(prev => ({
                table: prev.table = table
            })),
            nextFilterPage: () => {
                if (get().table !== null) {
                    get().table.nextPage()
                }
            },
            previousFilterPage: () => {
                if (get().table !== null) {
                    get().table.previousPage()
                }
            },
            setFilterPageSize: (size) => set(prev => ({
                filterPageSize: prev.filterPageSize = size
            })),
            setFilterPageIndex: (index) => set(prev => ({
                filterPageIndex: prev.filterPageIndex = index
            })),
            setFilterPageCount: (size) => set(prev => ({
                filterPageCount: prev.filterPageCount = size
            })),
            canPreviousFilterPage: () => {
                return get().filterPageIndex > 0
            },
            canNextFilterPage: () => {
                if (get().filterPageCount === -1) {
                    return true
                }

                if (get().filterPageCount === 0) {
                    return false
                }

                return get().filterPageIndex < get().filterPageCount - 1
            },
        }), {
            name: 'filter-data-list-user-group-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useFilterDataListUserGroupStore
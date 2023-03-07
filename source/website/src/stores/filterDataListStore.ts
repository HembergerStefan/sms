import create from 'zustand'
import {persist} from 'zustand/middleware'
import {Client, DataTypes} from '../data/data_types'
import {initialClientState} from './clientInformationStore'

export interface FilterDataListStore {
    table: any
    forDataType: DataTypes
    forClient: Client
    filterPageSize: number
    filterPageIndex: number
    filterPageCount: number
    canNextFilterPage: () => boolean
    canPreviousFilterPage: () => boolean
    setFilterTable: (table: any) => void
    nextFilterPage: () => void
    previousFilterPage: () => void
    setForDataType: (dataType: DataTypes) => void
    setForClient: (client: Client) => void
    setFilterPageSize: (size: number) => void
    setFilterPageIndex: (index: number) => void
    setFilterPageCount: (size: number) => void
}

const useFilterDataListStore = create(
    persist<FilterDataListStore>((set, get) => ({
            table: null,
            forDataType: DataTypes.SCRIPT,
            forClient: initialClientState,
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
            setForDataType: (dataType) => set(prev => ({
                forDataType: prev.forDataType = dataType
            })),
            setForClient: (client) => set(prev => ({
                forClient: prev.forClient = client
            })),
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
            name: 'filter-data-list-store',
            getStorage: () => sessionStorage
        }
    )
)

export default useFilterDataListStore
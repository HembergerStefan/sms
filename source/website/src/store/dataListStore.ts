import create from 'zustand'

export interface DataListStore {
    table: any
    setTable: (table: any) => void
    nextPage: () => void
    previousPage: () => void
    canNextPage: () => boolean
    canPreviousPage: () => boolean
    getPageSize: () => number
    setPageSize: (size: number) => void
    getPageIndex: () => number
    getPageCount: () => number
}

const useDataListStore = create<DataListStore>((set, get) => ({
    table: null,
    setTable: (table) => set(prev => ({
        table: prev.table = table
    })),
    nextPage: () => {
        get().table.nextPage()
    },
    previousPage: () => {
        get().table.previousPage()
    },
    canNextPage: () => {
        if (get().table !== null) {
            return get().table.getCanNextPage()
        }

        return false
    },
    canPreviousPage: () => {
        if (get().table !== null) {
            return get().table.getCanPreviousPage()
        }

        return false
    },
    getPageSize: () => {
        if (get().table !== null) {
            return get().table.getState().pagination.pageSize
        }

        return 0
    },
    setPageSize: (size) => {
        get().table.setPageSize(size)
    },
    getPageIndex: () => {
        if (get().table !== null) {
            return get().table.getState().pagination.pageIndex
        }

        return 0
    },
    getPageCount: () => {
        if (get().table !== null) {
            return get().table.getPageCount()
        }

        return 0
    }
}))


export default useDataListStore
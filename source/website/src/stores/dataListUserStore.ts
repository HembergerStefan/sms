import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export interface DataListUserStore {
    table: any
    userPageSize: number
    userPageIndex: number
    userPageCount: number
    canNextUserPage: () => boolean
    canPreviousUserPage: () => boolean
    selectionUserRows: string[]
    setUserTable: (table: any) => void
    nextUserPage: () => void
    previousUserPage: () => void
    setUserPageSize: (size: number) => void
    setUserPageIndex: (index: number) => void
    setUserPageCount: (size: number) => void
    setSelectionUserRows: (rows: string[]) => void
}

const useDataListUserStore = create(
    persist<DataListUserStore>((set, get) => ({
            table: null,
            userPageSize: 10,
            userPageIndex: 0,
            userPageCount: 0,
            selectionUserRows: [],
            setUserTable: (table) => set(prev => ({
                table: prev.table = table
            })),
            nextUserPage: () => {
                if (get().table !== null) {
                    get().table.nextPage()
                }
            },
            previousUserPage: () => {
                if (get().table !== null) {
                    get().table.previousPage()
                }
            },
            setUserPageSize: (size) => set(prev => ({
                userPageSize: prev.userPageSize = size
            })),
            setUserPageIndex: (index) => set(prev => ({
                userPageIndex: prev.userPageIndex = index
            })),
            setUserPageCount: (size) => set(prev => ({
                userPageCount: prev.userPageCount = size
            })),
            canPreviousUserPage: () => {
                return get().userPageIndex > 0
            },
            canNextUserPage: () => {
                if (get().userPageCount === -1) {
                    return true
                }

                if (get().userPageCount === 0) {
                    return false
                }

                return get().userPageIndex < get().userPageCount - 1
            },
            setSelectionUserRows: (rows) => set(prev => ({
                selectionUserRows: prev.selectionUserRows = rows
            }))
        }), {
            name: 'data-list-user-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useDataListUserStore
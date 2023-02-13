import create from 'zustand'
import {persist} from 'zustand/middleware'

export interface DataListPackageStore {
    table: any
    packagePageSize: number
    packagePageIndex: number
    packagePageCount: number
    canNextPackagePage: () => boolean
    canPreviousPackagePage: () => boolean
    selectionPackageRows: number[]
    setPackageTable: (table: any) => void
    nextPackagePage: () => void
    previousPackagePage: () => void
    setPackagePageSize: (size: number) => void
    setPackagePageIndex: (index: number) => void
    setPackagePageCount: (size: number) => void
    setSelectionPackageRows: (rows: number[]) => void
}

const useDataListPackageStore = create(
    persist<DataListPackageStore>((set, get) => ({
            table: null,
            packagePageSize: 10,
            packagePageIndex: 0,
            packagePageCount: 0,
            selectionPackageRows: [],
            setPackageTable: (table) => set(prev => ({
                table: prev.table = table
            })),
            nextPackagePage: () => {
                if (get().table !== null) {
                    get().table.nextPage()
                }
            },
            previousPackagePage: () => {
                if (get().table !== null) {
                    get().table.previousPage()
                }
            },
            setPackagePageSize: (size) => set(prev => ({
                packagePageSize: prev.packagePageSize = size
            })),
            setPackagePageIndex: (index) => {
                set(prev => ({
                    packagePageIndex: prev.packagePageIndex = index
                }))
            },
            setPackagePageCount: (size) => {
                set(prev => ({
                    packagePageCount: prev.packagePageCount = size
                }))
            },
            canPreviousPackagePage: () => {
                return get().packagePageIndex > 0
            },
            canNextPackagePage: () => {
                if (get().packagePageCount === -1) {
                    return true
                }

                if (get().packagePageCount === 0) {
                    return false
                }

                return get().packagePageIndex < get().packagePageCount - 1
            },
            setSelectionPackageRows: (rows) => set(prev => ({
                selectionPackageRows: prev.selectionPackageRows = rows
            })),
        }), {
            name: 'data-list-package-store',
            getStorage: () => sessionStorage
        }
    )
)


export default useDataListPackageStore
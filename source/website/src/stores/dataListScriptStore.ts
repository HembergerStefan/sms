import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export interface DataListScriptStore {
    table: any
    scriptPageSize: number
    scriptPageIndex: number
    scriptPageCount: number
    canNextScriptPage: () => boolean
    canPreviousScriptPage: () => boolean
    selectionScriptRows: string[]
    setScriptTable: (table: any) => void
    nextScriptPage: () => void
    previousScriptPage: () => void
    setScriptPageSize: (size: number) => void
    setScriptPageIndex: (index: number) => void
    setScriptPageCount: (size: number) => void
    setSelectionScriptRows: (rows: string[]) => void
}

const useDataListScriptStore = create(
    persist<DataListScriptStore>((set, get) => ({
            table: null,
            scriptPageSize: 10,
            scriptPageIndex: 0,
            scriptPageCount: 0,
            selectionScriptRows: [],
            setScriptTable: (table) => set(prev => ({
                table: prev.table = table
            })),
            nextScriptPage: () => {
                if (get().table !== null) {
                    get().table.nextPage()
                }
            },
            previousScriptPage: () => {
                if (get().table !== null) {
                    get().table.previousPage()
                }
            },
            setScriptPageSize: (size) => set(prev => ({
                scriptPageSize: prev.scriptPageSize = size
            })),
            setScriptPageIndex: (index) => set(prev => ({
                scriptPageIndex: prev.scriptPageIndex = index
            })),
            setScriptPageCount: (size) => set(prev => ({
                scriptPageCount: prev.scriptPageCount = size
            })),
            canPreviousScriptPage: () => {
                return get().scriptPageIndex > 0
            },
            canNextScriptPage: () => {
                if (get().scriptPageCount === -1) {
                    return true
                }

                if (get().scriptPageCount === 0) {
                    return false
                }

                return get().scriptPageIndex < get().scriptPageCount - 1
            },
            setSelectionScriptRows: (rows) => set(prev => ({
                selectionScriptRows: prev.selectionScriptRows = rows
            })),
        }), {
            name: 'data-list-script-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useDataListScriptStore
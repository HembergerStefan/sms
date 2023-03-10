import {create} from 'zustand'

import {Script} from '../../data/data_types'

interface ScriptSlice {
    scripts: Script[]
    setScripts: (entries: Script[]) => void
    addingScript: Script
    addScript: (entry: Script) => void
    removeScript: (id: string) => void
    resetScripts: () => void
    resetAddingScript: () => void
    getScriptById: (id: string) => Script | undefined
    getScriptStatus: (id: string) => string
    getExecutedScripts: () => Script[]
    getNotExecutedScripts: () => Script[]
}

export const initialScriptState: Script = {
    id: '',
    name: '',
    description: '',
    code: '',
    executionDate: new Date(),
    language: 'Python',
    fileExtension: '.py'
}

const useScriptStore = create<ScriptSlice>((set, get) => ({
        scripts: [],
        addingScript: {
            id: '',
            name: '',
            description: '',
            code: '',
            executionDate: new Date(),
            language: 'Python',
            fileExtension: '.py'
        },
        setScripts: (entries) => set(state => ({
            scripts: state.scripts = entries
        })),
        addScript: (entry) => {
            let scripts = get().scripts

            scripts.forEach(script => {
                if (script.id === entry.id) {
                    scripts = scripts.filter((script) => script.id !== entry.id)
                }
            })

            scripts.push(entry)

            set((state) => ({
                scripts: state.scripts = [...scripts],
                addingScript: state.addingScript = {
                    id: '',
                    name: '',
                    description: '',
                    code: '',
                    executionDate: new Date(),
                    language: 'Python',
                    fileExtension: '.py'
                } // Reset, to add new data
            }))
        },
        removeScript: (id) => set((state) => ({
            scripts: state.scripts.filter((script) => script.id !== id)
        })),
        resetScripts: () => set(state => ({
            scripts: state.scripts = []
        })),
        resetAddingScript: () => set(state => ({
            addingScript: state.addingScript = {
                id: '',
                name: '',
                description: '',
                code: '',
                executionDate: new Date(),
                language: 'Python',
                fileExtension: '.py'
            } // Reset, to add new data
        })),
        getScriptById: (id) => {
            const selectedScript = get().scripts.find((script) => script.id === id)

            if (selectedScript !== undefined) {
                return selectedScript
            }

            return undefined
        },
        getScriptStatus: (id) => {
            const script = get().getScriptById(id)

            if (script !== undefined) {
                if (script.id !== '') {
                    if (new Date(script.executionDate) < new Date()) {
                        return 'Executed'
                    }
                }

            }

            return 'Execution Pending'
        },
        getExecutedScripts: () => {
            const executedScripts: Script[] = []

            get().scripts.forEach(script => {
                if (get().getScriptStatus(script.id).toLowerCase() === 'executed') {
                    executedScripts.push(script)
                }
            })

            return executedScripts
        },
        getNotExecutedScripts: () => {
            const notExecutedScripts: Script[] = []

            get().scripts.forEach(script => {
                if (get().getScriptStatus(script.id).toLowerCase() === 'execution pending') {
                    notExecutedScripts.push(script)
                }
            })

            return notExecutedScripts
        }
    })
)


export default useScriptStore
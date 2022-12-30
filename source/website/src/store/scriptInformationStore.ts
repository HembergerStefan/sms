import create from 'zustand'

import {Script} from '../data/data_types'

interface ScriptSlice {
    scripts: Script[]
    setScripts: (entries: Script[]) => void
    addingScript: Script
    addScript: (entry: Script) => void
    removeScript: (id: number) => void
    resetScripts: () => void
    getScriptById: (id: number) => Script
    getScriptStatus: (id: number) => string
}

export const initialScriptState: Script = {
    id: -1,
    name: '',
    description: '',
    code: '',
    executionDate: new Date(),
    language: 'Python'
}

const useScriptStore = create<ScriptSlice>((set, get) => ({
    scripts: [],
    addingScript: {
        id: -1,
        name: '',
        description: '',
        code: '',
        executionDate: new Date(),
        language: 'Python'
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
                id: -1,
                name: '',
                description: '',
                code: '',
                executionDate: new Date(),
                language: 'Python'
            } // Reset, to add new data
        }))
    },
    removeScript: (id) => set((state) => ({
        scripts: state.scripts.filter((script) => script.id !== id)
    })),
    resetScripts: () => set(state => ({
        scripts: state.scripts = []
    })),
    getScriptById: (id) => {
        const selectedScript = get().scripts.find((script) => script.id === id)

        if (selectedScript !== undefined) {
            return selectedScript
        }

        return initialScriptState
    },
    getScriptStatus: (id) => {
        const script = get().getScriptById(id)

        if (script.id !== -1) {
            if (script.executionDate < new Date()) {
                return 'Executed'
            }
        }

        return 'Execution Pending'
    }
}))

export default useScriptStore
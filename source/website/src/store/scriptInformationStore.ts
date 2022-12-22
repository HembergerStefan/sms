import create from 'zustand'

export type Script = {
    id: number
    title: string
    description: string
    code: string
    executionDate: Date
    language: string
}

export interface ScriptSlice {
    scripts: Script[]
    addingScript: Script
    addScript: (entry: Script) => void
    removeScript: (id: number) => void
    resetScripts: () => void
    getScriptById: (id: number) => Script
}

export const initialState: Script = {
    id: -1,
    title: '',
    description: '',
    code: '',
    executionDate: new Date(),
    language: 'Python'
}

const useScriptStore = create<ScriptSlice>((set, get) => ({
    scripts: [],
    addingScript: {
        id: -1,
        title: '',
        description: '',
        code: '',
        executionDate: new Date(),
        language: 'Python'
    },
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
            addingScript: state.addingScript = initialState // Reset, to add new data
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

        return initialState
    }
}))

export default useScriptStore
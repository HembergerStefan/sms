import {create} from 'zustand'

import {Task} from '../../data/data_types'
import {initialScriptState} from '../script/scriptInformationStore'

export interface TaskStore {
    tasks: Task[]
    setTasks: (entries: Task[]) => void
    getTaskById: (id: string) => Task | undefined
}

export const initialTaskState: Task = {
    id: '',
    clientId: '',
    task: initialScriptState
}

const useTaskStore = create<TaskStore>((set, get) => ({
        tasks: [],
        setTasks: (entries) => set(state => ({
            tasks: state.tasks = entries
        })),
        getTaskById: (id) => {
            const selectedTask = get().tasks.find((task) => task.id === id)

            if (selectedTask !== undefined) {
                return selectedTask
            }

            return initialTaskState
        },
    })
)

export default useTaskStore
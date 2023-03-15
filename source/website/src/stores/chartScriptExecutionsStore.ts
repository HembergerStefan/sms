import { create } from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export type Dataset = {
    label: string
    data: number[]
}

export interface ChartScriptExecutionsStore {
    labels: string[]
    setLabels: (labels: string[]) => void
    dataSets: Dataset[]
    setDataSets: (dataSets: Dataset[]) => void
    tickStepSize: number
    setTickStepSize: (size: number) => void
}

const useChartScriptExecutionsStore = create(
    persist<ChartScriptExecutionsStore>((set, get) => ({
            labels: [],
            dataSets: [{label: '', data: []}, {label: '', data: []}],
            tickStepSize: 2,
            setLabels: (labels) => set(prev => ({
                labels: prev.labels = labels
            })),
            setDataSets: (dataSets) => set(prev => ({
                dataSets: prev.dataSets = dataSets
            })),
            setTickStepSize: (size) => set(prev => ({
                tickStepSize: prev.tickStepSize = size
            })),
        }), {
            name: 'script-executions-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useChartScriptExecutionsStore
import { create } from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export type Dataset = {
    label: string
    data: number[]
}

export interface ChartPackageInstallationsStore {
    packageInstallationlabels: string[]
    setPackageInstallationLabels: (labels: string[]) => void
    packageInstallationDataSets: Dataset[]
    setPackageInstallationDataSets: (dataSets: Dataset[]) => void
    packageInstallationTickStepSize: number
    setPackageInstallationTickStepSize: (size: number) => void
}

const useChartPackageInstallationsStore = create(
    persist<ChartPackageInstallationsStore>((set, get) => ({
            packageInstallationlabels: [],
            packageInstallationDataSets: [{label: '', data: []}, {label: '', data: []}],
            packageInstallationTickStepSize: 2,
            setPackageInstallationLabels: (packageInstallationlabels) => set(prev => ({
                packageInstallationlabels: prev.packageInstallationlabels = packageInstallationlabels
            })),
            setPackageInstallationDataSets: (packageInstallationDataSets) => set(prev => ({
                packageInstallationDataSets: prev.packageInstallationDataSets = packageInstallationDataSets
            })),
            setPackageInstallationTickStepSize: (size) => set(prev => ({
                packageInstallationTickStepSize: prev.packageInstallationTickStepSize = size
            })),
        }), {
            name: 'package-installations-store',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useChartPackageInstallationsStore
import create from 'zustand'

import {Package} from '../data/data_types'

export interface PackageSlice {
    _packages: Package[]
    setPackages: (entries: Package[]) => void
    addingPackage: Package
    addPackage: (entry: Package) => void
    removePackage: (id: number) => void
    resetPackages: () => void
    getPackageById: (id: number) => Package
    getPackageStatus: (id: number) => string
}

export const initialPackageState: Package = {
    id: -1,
    name: '',
    version: '',
    url: '',
    installationDate: new Date(),
}

const usePackageStore = create<PackageSlice>((set, get) => ({
    _packages: [],
    addingPackage: {
        id: -1,
        name: '',
        version: '',
        url: '',
        installationDate: new Date()
    },
    setPackages: (entries) => set(state => ({
        _packages: state._packages = entries
    })),
    addPackage: (entry) => {
        let _packages = get()._packages

        _packages.forEach(_package => {
            if (_package.id === entry.id) {
                _packages = _packages.filter((_package) => _package.id !== entry.id)
            }
        })

        _packages.push(entry)

        set((state) => ({
            _packages: state._packages = [..._packages],
            addingPackage: state.addingPackage = {
                id: -1,
                name: '',
                version: '',
                url: '',
                installationDate: new Date()
            } // Reset, to add new data
        }))
    },
    removePackage: (id) => set((state) => ({
        _packages: state._packages.filter((_package) => _package.id !== id)
    })),
    resetPackages: () => set(state => ({
        _packages: state._packages = []
    })),
    getPackageById: (id) => {
        const selectedPackage = get()._packages.find((_package) => _package.id === id)

        if (selectedPackage !== undefined) {
            return selectedPackage
        }

        return initialPackageState
    },
    getPackageStatus: (id) => {
        const _package = get().getPackageById(id)

        if (_package.id !== -1) {
            if (_package.installationDate < new Date()) {
                return 'Installed'
            }
        }

        return 'Installation Pending'
    }
}))

export default usePackageStore
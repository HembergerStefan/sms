import create from 'zustand'
import {persist} from 'zustand/middleware'

import {usa, austria} from '../data/images/language_dropdown'

export interface LngStore {
    selectedLng: string
    setLng: (lng: string) => void
    getLngCountryIcon: () => string
    resetLng: () => void
}

const useLngStore = create(
    persist<LngStore>((set, get) => ({
            selectedLng: 'de',
            setLng: (lng) => set(prev => ({
                selectedLng: prev.selectedLng = lng
            })),
            getLngCountryIcon: () => {
                const lng = get().selectedLng

                if (lng === 'de') {
                    return austria
                }

                return usa
            },
            resetLng: () => set(prev => ({
                selectedLng: prev.selectedLng = 'de'
            }))
        }),
        {
            name: 'selected-lng-store',
            getStorage: () => localStorage
        }
    )
)

export default useLngStore
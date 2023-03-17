import { create } from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import {usa, austria} from '../data/images/language_dropdown'

export interface LngStore {
    selectedLng: string
    setLng: (lng: string) => void
    getLngCountryIcon: () => string
    resetLng: () => void
}

const useLngStore = create(
    persist<LngStore>((set, get) => ({
            selectedLng: 'en',
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
                selectedLng: prev.selectedLng = 'en'
            }))
        }),
        {
            name: 'selected-lng-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useLngStore
import { create } from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import {KeyWord} from '../data/searchbar/SearchKeyWords'

export interface RecentSearchStore {
    recentSearches: KeyWord[]
    addRecentSearch: (entry: KeyWord) => void
    resetRecentSearch: () => void
}

const useRecentSearchStore = create(
    persist<RecentSearchStore>((set, get) => ({
            recentSearches: [],
            addRecentSearch: (entry) => {
                let recentSearch = get().recentSearches

                if (recentSearch.indexOf(entry) === -1) {
                    if (recentSearch.unshift(entry) > 5) {
                        recentSearch.pop()
                    }
                } else {
                    recentSearch = recentSearch.filter((recentlySearched) => recentlySearched !== entry)
                    recentSearch.unshift(entry)
                }

                set((state) => ({recentSearches: state.recentSearches = [...recentSearch]}))
            },
            resetRecentSearch: () => set(state => ({
                recentSearches: state.recentSearches = []
            }))
        }),
        {
            name: 'recent-search-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useRecentSearchStore
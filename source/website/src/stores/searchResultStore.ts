import { create } from 'zustand'
import {KeyWord} from '../data/searchbar/SearchKeyWords'

export interface SearchSlice {
    searchResult: KeyWord[]
    setSearchResult: (data: KeyWord[]) => void
    resetSearchResult: () => void
}

const useSearchStore = create<SearchSlice>((set, get) => ({
    searchResult: [],
    setSearchResult: (data) => set((state) => ({
        searchResult: state.searchResult = data
    })),
    resetSearchResult: () => set(state => ({
        searchResult: state.searchResult = []
    }))
}))

export default useSearchStore
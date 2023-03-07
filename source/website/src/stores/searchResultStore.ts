import create from 'zustand'

export interface SearchSlice {
    searchResult: string[]
    setSearchResult: (data: string[]) => void
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
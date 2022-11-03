import {KeyWords} from '../data/searchbar/SearchKeyWords'

export const addLastSearch = (search: string, recentSearch: string[], setRecentSearch: Function) => {

    if (search !== null) {
        if (recentSearch.indexOf(search) === -1) {
            recentSearch.unshift(search)
            if (recentSearch.length > 5) {
                recentSearch.pop()
            }

            setRecentSearch(recentSearch)
        }
    }
}

export const getLastSearches = (recentSearch: string[]): string[] => {
    if (localStorage['lastSearches']) {
        recentSearch = JSON.parse(localStorage['lastSearches'])
    }

    return recentSearch
}

export const getLinkToItem = (item: string): string => {
    let link = '/'

    KeyWords.forEach(keyWord => {
        if (keyWord.name.toLowerCase().includes(item.toLowerCase())) {
            link = keyWord.link
        }
    })

    return link
}
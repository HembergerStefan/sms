import {KeyWords} from '../data/searchbar/SearchKeyWords'

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
import {KeyWords} from '../data/searchbar/SearchKeyWords';

export const addLastSearch = (search: string, lastSearch: string[]) => {
    let pastSearches: any[] = lastSearch;

    if (search !== null) {
        if (pastSearches.indexOf(search) === -1) {
            pastSearches.unshift(search);
            if (pastSearches.length > 5) {
                pastSearches.pop();
            }

            localStorage['lastSearches'] = JSON.stringify(pastSearches);
        }
    }
}

export const getLastSearches = (setLastSearch: Function) => {
    let pastSearches: any[] = [];

    if (localStorage['lastSearches']) {
        pastSearches = JSON.parse(localStorage['lastSearches']);
    }

    setLastSearch(pastSearches)
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
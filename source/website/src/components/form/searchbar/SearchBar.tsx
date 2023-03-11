import React, {useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import {KeyWords} from '../../../data/searchbar/SearchKeyWords'

import useSearchStore from '../../../stores/searchResultStore'

import DiceCoefficient from '../../../data/algorithm/DiceCoefficient'

import './SearchBar.css'


const SearchBar = () => {

    const {t} = useTranslation()

    const [searchQuery, setQuery] = useState('')

    /* Update the search result in the store */
    const {setSearchResult} = useSearchStore()

    const memorizedSearchFoundData = useMemo(() => {
        let foundWords: string[] = []

        if (searchQuery !== '') {
            KeyWords.forEach(keyWord => {
                const s = DiceCoefficient.distance(searchQuery, t(keyWord.name))

                // Filter if the item should be added or not
                if (s >= 0.21) {
                    foundWords.push(keyWord.name)
                }
            })
        }

        return foundWords
    }, [searchQuery])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div id='search-bar--container'>
            <form onSubmit={handleSubmit}>
                <input id='search-bar--text-input' className='fs-sc-body-1 fw-regular md-input' type='text'
                       placeholder={t('Search for anything ...')}
                       onChange={event => setQuery(() => event.target.value)}
                       onKeyUp={() => setSearchResult(memorizedSearchFoundData)}
                       autoComplete='off'
                       autoFocus/>
            </form>

            <div id='search-bar--icon-container'>
                <SearchRoundedIcon/>
            </div>
        </div>
    )
}

export default SearchBar
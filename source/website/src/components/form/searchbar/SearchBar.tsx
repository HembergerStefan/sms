import React, {useEffect, useState} from 'react';
import DiceCoefficient from '../../../data/algorithm/DiceCoefficient'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {KeyWords} from '../../../data/searchbar/SearchKeyWords';
import {useTranslation} from 'react-i18next';
import './SearchBar.css'

const SearchBar = ({searchData}: { searchData: Function }) => {

    const {t} = useTranslation();

    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState<string[]>([])

    /* Call the callback function of the parent (send him the found data) */
    useEffect(() => {
        searchData(data)
    }, [data])

    const getFoundKeyWords = () => {
        let foundWords: string[] = []

        if (searchText !== '') {
            KeyWords.forEach(keyWord => {
                const s = DiceCoefficient.distance(searchText, t(keyWord.name))

                // Filter if the item should be added or not
                if (s >= 0.21) {
                    foundWords.push(keyWord.name)
                }
            })
        }

        setData(foundWords)
    }

    return (
        <div id='search-bar--container'>
            <input id='search-bar--text-input' className='fs-sc-body-1 fw-regular' type='text'
                   placeholder={t('Search for anything ...')}
                   onChange={event => setSearchText(event.target.value)}
                   onKeyUp={getFoundKeyWords}
                   autoComplete='off'
                   autoFocus/>

            <div id='search-bar--icon-container'>
                <SearchRoundedIcon/>
            </div>
        </div>
    );
};

export default SearchBar;
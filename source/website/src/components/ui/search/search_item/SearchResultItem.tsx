import React, {useEffect, useState, memo} from 'react'

import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'

import TagIcon from '@mui/icons-material/Tag'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

import {getLinkToItem} from '../../../../utils/SearchBarHelper'

import useRecentSearchStore from '../../../../stores/recentSearchStore'

import './SearchItem.css'

interface SearchItemProps {
    entry: string
    isSearchResult: boolean
}

const SearchResultItem = ({entry, isSearchResult}: SearchItemProps) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const [searchIcon, setSearchIcon] = useState<JSX.Element>(<TagIcon/>)

    /* Update the recent searches in the store */
    const {addRecentSearch} = useRecentSearchStore()

    useEffect(() => {
        if (isSearchResult) {
            setSearchIcon(() => <TagIcon/>)
        } else {
            setSearchIcon(() => <AccessTimeRoundedIcon/>)
        }
    }, [])

    return (
        <>
            <div className='search-item-container'
                 onClick={() => {
                     /* Add a new item to the store */
                     addRecentSearch(entry)

                     navigate(`dashboard${getLinkToItem(entry) !== '/' ? getLinkToItem(entry) : ''}`)
                 }}>
                <div className='clr-sc-1'>
                    {
                        /* Create the mui svg component */
                        searchIcon
                    }
                </div>

                <span className='fs-pr-body-1 fw-regular clr-sc-1'>{t(entry)}</span>

                <div className='clr-sc-1'>
                    <ArrowForwardIosRoundedIcon id='arrow-forward-icon'/>
                </div>
            </div>
        </>
    )
}

export default memo(SearchResultItem)
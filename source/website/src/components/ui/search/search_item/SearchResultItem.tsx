import React, {useEffect, useState} from 'react'
import TagIcon from '@mui/icons-material/Tag'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import {useTranslation} from 'react-i18next'
import './SearchItem.css'

import {getLinkToItem} from "../../../../utils/SearchBarHelper"
import useRecentSearchStore from "../../../../store/recentSearchStore";

interface SearchItemProps {
    entry: string
    isSearchResult: boolean
}

const SearchResultItem = ({entry, isSearchResult}: SearchItemProps) => {

    const {t} = useTranslation()

    const [searchIcon, setSearchIcon] = useState<JSX.Element>(<TagIcon/>)

    /* Update the recent searches in the store */
    const addRecentSearch = useRecentSearchStore((state: { addRecentSearch: (entry: string) => void }) => state.addRecentSearch)

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

                     window.location.replace(getLinkToItem(entry))
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

export default SearchResultItem
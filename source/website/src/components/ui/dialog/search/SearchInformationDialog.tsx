import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import useHover from '../../../../hooks/useHover'
import {addLastSearch, getLastSearches} from '../../../../helper/SearchBarHelper'

import TooltipManager from '../../tooltip/TooltipManager'
import SearchBar from '../../../form/searchbar/SearchBar'
import SearchResultItemManager from '../../search/search_item/SearchResultItemManager'

import './SearchInformationDialog.css'

const SearchInformationDialog = () => {

    const {t} = useTranslation();

    const [searchData, setSearchData] = useState<string[]>([])
    const [lastSearch, setLastSearch] = useState<string[]>([])
    const [hoverRef, isHovered] = useHover()

    useEffect(() => {
        const deleteIcon = document.querySelector('#delete-icon')

        if (deleteIcon !== null) {
            if (lastSearch.length !== 0) {
                deleteIcon.setAttribute('style', 'visibility: visible')
            } else {
                deleteIcon.setAttribute('style', 'visibility: hidden')
            }
        }
    }, [lastSearch])

    const searchDataFunc = (data: string[]) => {
        setSearchData(data)
        getLastSearches(setLastSearch)
    }

    const addSearch = (cr: string) => {
        addLastSearch(cr, lastSearch)
    }

    return (
        <>
            <SearchBar searchData={searchDataFunc}/>

            <div id='search-information-container'>

                {/* Recent searches */}
                <div className='search-information--result-container'>
                    <SearchResultItemManager
                        heading={
                            <div id='search-information--recent-search-wrapper' className='stick-to-head'>
                                <h1 className='fs-qi-1 fw--semi-bold'>{t('Recent Searches')}</h1>
                                <DeleteRoundedIcon ref={hoverRef} id='delete-icon'
                                                   onClick={() => {
                                                       localStorage.removeItem('lastSearches')
                                                       getLastSearches(setLastSearch)
                                                   }}/>
                            </div>
                        }
                        data={lastSearch}/>
                </div>

                {/* Current search result */}
                <div className='search-information--result-container'>
                    <SearchResultItemManager
                        heading={<h1
                            className='fs-qi-1 fw--semi-bold stick-to-head'>{t('Highest Conformity')}</h1>}
                        data={searchData} addLastSearch={addSearch}/>
                </div>
            </div>

            {
                (isHovered) ? <TooltipManager content={
                    <span>{t('Delete recent searches')}</span>
                }/> : null
            }
        </>
    )
}

export default SearchInformationDialog
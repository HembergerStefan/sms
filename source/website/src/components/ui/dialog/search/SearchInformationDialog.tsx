import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import useHover from '../../../../hooks/useHover'

import TooltipManager from '../../tooltip/TooltipManager'
import SearchBar from '../../../form/searchbar/SearchBar'
import SearchResultItemManager from '../../search/search_item/SearchResultItemManager'

import './SearchInformationDialog.css'
import useSearchStore from "../../../../store/searchResultStore";
import useRecentSearchStore from "../../../../store/recentSearchStore";

const SearchInformationDialog = () => {

    const {t} = useTranslation()

    const [hoverRef, isHovered] = useHover()

    /* Get the search result out of the store & the possibility to update the store */
    const {searchResult, resetSearchResult} = useSearchStore()
    /* Get the recent searches out of the store & the possibility to update the store */
    const {recentSearches, resetRecentSearch} = useRecentSearchStore()

    /* Clear the search result store at the beginning */
    useEffect(() => {
        resetSearchResult()
    }, [])

    useEffect(() => {
        const deleteIcon = document.querySelector('#delete-icon')

        if (deleteIcon !== null) {
            if (recentSearches.length !== 0) {
                deleteIcon.setAttribute('style', 'visibility: visible')
            } else {
                deleteIcon.setAttribute('style', 'visibility: hidden')
            }
        }
    }, [recentSearches])

    return (
        <>
            <SearchBar/>

            <div id='search-information-container'>

                {/* Recent searches */}
                <div className='search-information--result-container'>
                    <SearchResultItemManager
                        heading={
                            <div id='search-information--recent-search-wrapper' className='stick-to-head'>
                                <h1 className='fs-qi-1 fw--semi-bold'>{t('Recent Searches')}</h1>
                                <DeleteRoundedIcon ref={hoverRef} id='delete-icon'
                                                   onClick={() => resetRecentSearch()}/>
                            </div>
                        }
                        data={recentSearches} isSearchResult={false}/>
                </div>

                {/* Current search result */}
                <div className='search-information--result-container'>
                    <SearchResultItemManager
                        heading={<h1
                            className='fs-qi-1 fw--semi-bold stick-to-head'>{t('Highest Conformity')}</h1>}
                        data={searchResult} isSearchResult={true}/>
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
import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import useSearchStore from '../../../stores/searchResultStore'
import useRecentSearchStore from '../../../stores/recentSearchStore'
import {DataTypes} from '../../../data/data_types'

import Dialog from '../../../components/ui/dialog/Dialog'
import SearchInformationDialog from '../../../components/ui/dialog/search/SearchInformationDialog'

import './SearchToggle.css'

const SearchToggle = () => {

    const {t} = useTranslation();

    /* Get the search result out of the store */
    const {searchResult} = useSearchStore()
    const {recentSearches} = useRecentSearchStore()

    const [renderComponent, setRenderComponent] = useState(false)

    useEffect(() => {
        setRenderComponent(() => false)
    }, [recentSearches])

    return (
        <div id='search-toggle--container'>
            <button id='search-toggle-btn' type='button' onClick={() => setRenderComponent(true)}>
                <SearchRoundedIcon style={{color: 'var(--nl-clr-3)'}}/>
            </button>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Dialog title={t('Dashboard Search')}
                            unmountComponent={setRenderComponent}
                            body={<SearchInformationDialog/>}
                            footer={<span className='fs-tr-body-1'>{t('Results')}: {searchResult.length}</span>}
                            dialogTyp={DataTypes.SEARCH}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </div>
    )
}

export default SearchToggle
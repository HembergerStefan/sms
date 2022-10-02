import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {addLastSearch, getLastSearches} from '../../../../helper/SearchBarHelper';
import {useTranslation} from 'react-i18next';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchBar from '../../../form/searchbar/SearchBar';
import SearchResultItemManager from '../../search/search_item/SearchResultItemManager';
import Tooltip from '../../tooltip/Tooltip';
import './SearchInformationDialog.css'

const SearchInformationDialog = () => {

    const {t} = useTranslation();

    const [searchData, setSearchData] = useState<string[]>([])
    const [lastSearch, setLastSearch] = useState<string[]>([])
    const [renderComponent, setRenderComponent] = useState(false)

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
                                <span className='fs-qi-1 fw--semi-bold'>{t('Recent Searches')}</span>
                                <DeleteRoundedIcon id='delete-icon'
                                                   onClick={() => {
                                                       localStorage.removeItem('lastSearches')
                                                       getLastSearches(setLastSearch)
                                                   }}
                                                   onMouseOver={() => setRenderComponent(true)}
                                                   onMouseLeave={() => setRenderComponent(false)}/>
                            </div>
                        }
                        data={lastSearch}/>
                </div>

                {/* Current search result */}
                <div className='search-information--result-container'>
                    <SearchResultItemManager
                        heading={<span
                            className='fs-qi-1 fw--semi-bold stick-to-head'>{t('Highest Conformity')}</span>}
                        data={searchData} addLastSearch={addSearch}/>
                </div>
            </div>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Tooltip content={
                        <>
                            <span className='fs-qi-1 fw--semi-bold'>🗑️ {t('Quick Delete')}</span>
                            <span className='fs-pr-body-1 fw-regular clr-sc-1 mg-t-small'>{t('Click here to delete all the recent searches')}.</span>
                        </>
                    }/>,
                    document.querySelector('#layout-container')!) : null
            }
        </>
    );
};

export default SearchInformationDialog;
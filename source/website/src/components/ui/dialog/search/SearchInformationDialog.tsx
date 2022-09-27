import React, {useState} from 'react';
import {addLastSearch, getLastSearches} from '../../../../helper/SearchBarHealper';
import SearchBar from '../../../form/searchbar/SearchBar';
import SearchItemManager from '../../search/search_item/SearchItemManager';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import './SearchInformationDialog.css'

const SearchInformationDialog = () => {

    const [searchData, setSearchData] = useState<string[]>([])
    const [lastSearch, setLastSearch] = useState<string[]>([])

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

            <div id='search-information-container' className='overflowing-container'>

                {/* Recent searches */}
                <div className='search-information--result-container'>
                    <SearchItemManager
                        heading={
                            <div id='search-information--recent-search-wrapper' className='stick-to-head'>
                                <span className='fs-pr-body-1 fw--semi-bold'>Recent Searches</span>
                                <DeleteRoundedIcon
                                    style={{color: 'var(--ac-clr-2)', cursor: 'pointer', fontSize: '28px'}}
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
                    <SearchItemManager
                        heading={<span className='fs-pr-body-1 fw--semi-bold stick-to-head'>Highest Conformity</span>}
                        data={searchData} addLastSearch={addSearch}/>
                </div>
            </div>
        </>
    );
};

export default SearchInformationDialog;
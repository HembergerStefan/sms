import React, {useState} from 'react';
import {getLastSearches} from '../../../../helper/SearchBarHealper';
import SearchBar from '../../../form/searchbar/SearchBar';
import SearchRecentSearchedItem from '../../../form/searchbar/SearchRecentSearchedItem';
import SearchResultItem from '../../../form/searchbar/SearchResultItem';
import '../../../form/searchbar/SearchBar.css'

const SearchInformationDialog = () => {

    const [searchData, setSearchData] = useState<string[]>([])
    const [lastSearch, setLastSearch] = useState<string[]>([])

    const searchDataFunc = (data: string[]) => {
        setSearchData(data)
        getLastSearches(setLastSearch)
    }

    return (
        <>
            <SearchBar searchData={searchDataFunc}/>

            <div className='overflowing-container'>
                <SearchRecentSearchedItem lastSearch={lastSearch} setLastSearch={setLastSearch}/>

                <SearchResultItem searchData={searchData} lastSearch={lastSearch}/>
            </div>
        </>
    );
};

export default SearchInformationDialog;
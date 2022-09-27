import React from 'react';
import {getLastSearches, getLinkToItem} from "../../../helper/SearchBarHealper";
import TagIcon from "@mui/icons-material/Tag";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import './SearchRecentSearchedItem.css'

const SearchRecentSearchedItem = ({lastSearch, setLastSearch}: { lastSearch: string[], setLastSearch: Function }) => {
    return (
        <div id='search-result-container'>
            <div id='recent-search-container' className='stick-to-head'>
                <span className='fs-pr-body-1 fw--semi-bold'>Recent Searches</span>
                <DeleteRoundedIcon
                    style={{color: 'var(--ac-clr-2)', cursor: 'pointer', fontSize: '28px'}}
                    onClick={() => {
                        localStorage.removeItem('pastSearches')
                        getLastSearches(setLastSearch)
                    }}/>
            </div>

            {
                (lastSearch.length === 0) ?
                    <span
                        className='fs-sc-body-1 fw-regular'>Nothing searched yet ... start searching now!</span>
                    :
                    lastSearch.map((cr) => (
                        <div className='search-item-container'
                             onClick={() => {
                                 window.location.replace(getLinkToItem(cr))
                             }}>
                            <div>
                                <TagIcon style={{color: 'hsl(215, 11%, 47%)'}}/>
                            </div>

                            <span className='fs-sc-body-1 fw-regular'>{cr}</span>

                            <div>
                                <ArrowForwardIosRoundedIcon
                                    style={{color: 'hsl(216, 16%, 40%)', fontSize: '15px'}}/>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};

export default SearchRecentSearchedItem;
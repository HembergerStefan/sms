import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {addLastSearch, getLinkToItem} from '../../../helper/SearchBarHealper';
import './SearchResultItem.css'

const SearchResultItem = ({searchData, lastSearch}: { searchData: string[], lastSearch: string[] }) => {

    return (
        <div id='search-result-container'>
            {
                (searchData.length > 0) ?
                    <>
                        <span className='fs-pr-body-1 fw--semi-bold stick-to-head'>Highest Conformity</span>

                        {
                            searchData.map((cr) => (
                                <div className='search-item-container'
                                     onClick={() => {
                                         window.location.replace(getLinkToItem(cr))

                                         addLastSearch(cr, lastSearch)
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
                    </>
                    : null
            }
        </div>
    );
};

export default SearchResultItem;
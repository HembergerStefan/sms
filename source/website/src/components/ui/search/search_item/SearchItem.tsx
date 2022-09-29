import React, {useEffect, useState} from 'react';
import {getLinkToItem} from '../../../../helper/SearchBarHealper';
import TagIcon from '@mui/icons-material/Tag';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {useTranslation} from 'react-i18next';
import './SearchItem.css'

interface SearchItemProps {
    entry: string
    addLastSearch?: Function
}

const SearchItem = ({entry, addLastSearch}: SearchItemProps) => {

    const {t} = useTranslation();

    const [translateEntry, setTranslateEntry] = useState('')

    useEffect(() => {
        setTranslateEntry(t(entry))
    }, [])

    return (
        <>
            <div className='search-item-container'
                 onClick={() => {
                     window.location.replace(getLinkToItem(translateEntry))

                     if (addLastSearch != null) {
                         addLastSearch(entry)
                     }
                 }}>
                <div>
                    <TagIcon style={{color: 'hsl(215, 11%, 47%)'}}/>
                </div>

                <span className='fs-sc-body-1 fw-regular'>{translateEntry}</span>

                <div>
                    <ArrowForwardIosRoundedIcon
                        style={{color: 'hsl(216, 16%, 40%)', fontSize: '15px'}}/>
                </div>
            </div>
        </>
    );
};

export default SearchItem;
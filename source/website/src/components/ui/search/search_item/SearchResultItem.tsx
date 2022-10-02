import React, {useEffect, useState} from 'react';
import {getLinkToItem} from '../../../../helper/SearchBarHelper';
import TagIcon from '@mui/icons-material/Tag';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {useTranslation} from 'react-i18next';
import './SearchItem.css'


interface SearchItemProps {
    entry: string
    addLastSearch?: Function
}

const SearchResultItem = ({entry, addLastSearch}: SearchItemProps) => {

    const {t} = useTranslation();

    const [translateEntry, setTranslateEntry] = useState('')
    const [searchIcon, setSearchIcon] = useState('tagIcon')

    const Components: { [key: string]: any } = {
        tagIcon: TagIcon,
        accessTimeRoundedIcon: AccessTimeRoundedIcon
    };

    useEffect(() => {
        setTranslateEntry(t(entry))

        if (addLastSearch != null) {
            setSearchIcon('tagIcon')
        } else {
            setSearchIcon('accessTimeRoundedIcon')
        }
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
                <div className='clr-sc-1'>
                    {
                        /* Create the mui svg component */
                        React.createElement(Components[searchIcon])
                    }
                </div>

                <span className='fs-pr-body-1 fw-regular clr-sc-1'>{translateEntry}</span>

                <div className='clr-sc-1'>
                    <ArrowForwardIosRoundedIcon id='arrow-forward-icon'/>
                </div>
            </div>
        </>
    );
};

export default SearchResultItem;
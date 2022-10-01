import React from 'react';
import SearchResultItem from './SearchResultItem';
import {useTranslation} from 'react-i18next';
import './SearchItem.css'

interface SearchItemProps {
    heading: React.ReactNode
    data: string[]
    addLastSearch?: Function
}

const SearchResultItemManager = ({heading, data, addLastSearch}: SearchItemProps) => {

    const {t} = useTranslation();

    return (
        <>
            {
                (data.length > 0) ?
                    <>
                        {heading}

                        {
                            data.map((value, index) => (
                                <SearchResultItem key={index} entry={value} addLastSearch={addLastSearch}/>
                            ))
                        }
                    </>
                    :
                    (addLastSearch == null) ?
                        <>
                            {heading}
                            <span
                                className='fs-pr-body-1 fw-regular'>{t('Not looking for anything yet? Start your search now!')}</span>
                        </>
                        : null
            }
        </>
    );
};

export default SearchResultItemManager;
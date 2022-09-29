import React from 'react';
import SearchItem from './SearchItem';
import {useTranslation} from 'react-i18next';
import './SearchItem.css'

interface SearchItemProps {
    heading: React.ReactNode
    data: string[]
    addLastSearch?: Function
}

const SearchItemManager = ({heading, data, addLastSearch}: SearchItemProps) => {

    const {t} = useTranslation();

    return (
        <>
            {
                (data.length > 0) ?
                    <>
                        {heading}

                        {
                            data.map((cr) => (
                                <SearchItem entry={cr} addLastSearch={addLastSearch}/>
                            ))
                        }
                    </>
                    :
                    (addLastSearch == null) ?
                        <>
                            {heading}
                            <span
                                className='fs-sc-body-1 fw-regular'>{t('Not looking for anything yet? Start your search now!')}</span>
                        </>
                        : null
            }
        </>
    );
};

export default SearchItemManager;
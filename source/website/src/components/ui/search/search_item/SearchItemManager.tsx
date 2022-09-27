import React from 'react';
import SearchItem from './SearchItem';
import './SearchItem.css'

interface SearchItemProps {
    heading: React.ReactNode
    data: string[]
    addLastSearch?: Function
}

const SearchItemManager = ({heading, data, addLastSearch}: SearchItemProps) => {

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
                                className='fs-sc-body-1 fw-regular'>Nothing searched yet ... start searching now!</span>
                        </>
                        : null
            }
        </>
    );
};

export default SearchItemManager;
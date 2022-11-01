import React from 'react'

import {useTranslation} from 'react-i18next'

import SearchResultItem from './SearchResultItem'

import './SearchItem.css'

interface SearchItemProps {
    heading: React.ReactNode
    data: string[]
    isSearchResult: boolean
}

const SearchResultItemManager = ({heading, data, isSearchResult}: SearchItemProps) => {

    const {t} = useTranslation()

    return (
        <>
            {
                (data.length > 0) ?
                    <>
                        {heading}

                        {
                            data.map((value, index) => (
                                <SearchResultItem key={index} entry={value} isSearchResult={isSearchResult}/>
                            ))
                        }
                    </>
                    :
                    (data.length === 0 && !isSearchResult) ?
                        <>
                            {heading}

                            <span
                                className='fs-pr-body-1 fw-regular'>{t('Not looking for anything yet? Start your search now!')}</span>
                        </>
                        : null
            }
        </>
    )
}

export default SearchResultItemManager
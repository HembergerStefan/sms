import React, {useEffect, useRef, useState} from 'react';
import DiceCoefficient from '../../../data/algorithm/DiceCoefficient'
import TagIcon from '@mui/icons-material/Tag';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {KeyWords} from '../../../data/searchbar/SearchKeyWords';
import './SearchBar.css'

const SearchBar = () => {

    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState<string[]>([])
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        checkForContent()
    }, [searchText])

    const checkForContent = () => {
        if (formRef.current != null) {
            if (searchText !== '') {
                formRef.current.classList.add('search-bar--container-open')
            } else {
                formRef.current.classList.remove('search-bar--container-open')
            }
        }
    }

    const handleSubmit = () => {
        let foundWords: string[] = []

        if (searchText !== '') {
            KeyWords.forEach(keyWord => {
                const s = DiceCoefficient.distance(searchText, keyWord.name)

                // Filter if the item should be added or not
                if (s >= 0.2) {
                    foundWords.push(keyWord.name)
                }
            })
        }

        setData(foundWords)
    }

    const getLinkToItem = (item: string): string => {
        let link = '/'

        KeyWords.forEach(keyWord => {
            if (keyWord.name.toLowerCase().includes(item.toLowerCase())) {
                link = keyWord.link
            }
        })

        return link
    }

    const lastSearches = (): Array<any> => {
        let pastSearches: any[] = [];

        if (localStorage['pastSearches']) {
            pastSearches = JSON.parse(localStorage['pastSearches']);
        }

        return pastSearches
    }

    const addLastSearches = (search: string) => {
        let pastSearches: any[] = lastSearches();

        if (search !== null) {
            if (pastSearches.indexOf(search) === -1) {
                pastSearches.unshift(search);
                if (pastSearches.length > 5) {
                    pastSearches.pop();
                }

                localStorage["pastSearches"] = JSON.stringify(pastSearches);
            }
        }
    }

    return (
        <>
            <div id='search-bar--container'>
                <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
                    <input id='search-bar--text-input' className='fs-tr-body-1 fw-regular' type='text'
                           placeholder='Search by anything'
                           onChange={event => setSearchText(event.target.value)}
                           onKeyUp={handleSubmit}
                           autoComplete='off'/>

                    <button id='search-btn' type='button'>
                        <SearchRoundedIcon style={{color: 'var(--nl-clr-3)'}}/>
                    </button>
                </form>
            </div>

            {
                (data.length > 0) ?
                    <div id='blocking-container'>
                        <div id='search-content-container'>
                            <span className='fs-tr-1 fw--semi-bold'>Search Result</span>
                            <span className='fs-tr-1 fw--extra-bold' style={{color: 'hsl(342, 98%, 45%)'}}>Insider Feature - Currently Under Development!</span>

                            <div>
                                <div>
                                    <span className='fs-pr-body-1 fw--semi-bold stick-to-head'>Recent Searches</span>
                                    
                                    {
                                        (lastSearches().length === 0) ?
                                            <span className='fs-sc-body-1 fw-regular'>Nothing searched yet ... start searching now!</span> : null
                                    }

                                    {
                                        lastSearches().map((cr) => (
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

                                <div>
                                <span
                                    className='fs-pr-body-1 fw--semi-bold stick-to-head'>Highest Conformity</span>
                                    {
                                        data.map((cr) => (
                                            <div className='search-item-container'
                                                 onClick={() => {
                                                     window.location.replace(getLinkToItem(cr))

                                                     addLastSearches(cr)
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
                            </div>
                        </div>
                    </div>
                    : null
            }

        </>
    );
};

export default SearchBar;
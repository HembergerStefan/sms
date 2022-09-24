import React, {useEffect, useRef, useState} from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {KeyWords} from '../../../data/searchbar/SearchKeyWords';
import './SearchBar.css'

const SearchBar = () => {

    const [searchText, setSearchText] = useState('')
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
        if (searchText !== "") {
            KeyWords.map(keyWord => {
                if (keyWord.name.toLowerCase().includes(searchText.toLowerCase())) {
                    window.location.replace(keyWord.link);
                }
            })
        }
    }

    return (
        <div id='search-bar--container'>
            <form ref={formRef} onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}>
                <input id='search-bar--text-input' className='fw-regular' type='text'
                       placeholder='Search by anything'
                       onChange={nwCt => setSearchText(nwCt.target.value)}
                       autoComplete='off'/>

                <button id='search-btn' type='submit'>
                    <SearchRoundedIcon style={{color: 'var(--nl-clr-3)'}}/>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
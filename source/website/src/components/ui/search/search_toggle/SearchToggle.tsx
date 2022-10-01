import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../../dialog/Dialog';
import SearchInformationDialog from '../../dialog/search/SearchInformationDialog';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './SearchToggle.css'
import {useTranslation} from 'react-i18next';

const SearchToggle = () => {

    const {t} = useTranslation();

    const [renderComponent, setRenderComponent] = useState(false)

    const unmountComponent = () => {
        setRenderComponent(false)
    }

    return (
        <div id='search-toggle--container'>
            <button id='search-toggle-btn' type='button' onClick={() => setRenderComponent(true)}>
                <SearchRoundedIcon style={{color: 'var(--nl-clr-3)'}}/>
            </button>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Dialog title={t('Dashboard Search')}
                            unmountComponent={unmountComponent}
                            body={<SearchInformationDialog/>}
                            footer={<span className='fs-tr-body-1'>Version 0.8.7</span>}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </div>
    );
};

export default SearchToggle;
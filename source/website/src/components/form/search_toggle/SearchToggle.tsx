import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {useTranslation} from 'react-i18next'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import Dialog from '../../../components/ui/dialog/Dialog'
import SearchInformationDialog from '../../../components/ui/dialog/search/SearchInformationDialog'
import './SearchToggle.css'

const SearchToggle = () => {

    const {t} = useTranslation();

    const [renderComponent, setRenderComponent] = useState(false)

    return (
        <div id='search-toggle--container'>
            <button id='search-toggle-btn' type='button' onClick={() => setRenderComponent(true)}>
                <SearchRoundedIcon style={{color: 'var(--nl-clr-3)'}}/>
            </button>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Dialog title={t('Dashboard Search')}
                            unmountComponent={setRenderComponent}
                            body={<SearchInformationDialog/>}
                            footer={<span className='fs-tr-body-1'>Version 0.8.7</span>}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </div>
    )
}

export default SearchToggle
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../../dialog/Dialog';
import SearchInformationDialog from '../../dialog/search/SearchInformationDialog';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './SearchToggle.css'

const SearchToggle = () => {

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
                    <Dialog title='Dashboard Search'
                            unmountComponent={unmountComponent}
                            body={<SearchInformationDialog/>}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </div>
    );
};

export default SearchToggle;
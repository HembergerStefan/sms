import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../dialog/Dialog';
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
                    <Dialog title='Search Result' unmountComponent={unmountComponent} body={<span>Test</span>}
                            footer={<button>Close</button>}/>, document.querySelector('#layout-container')!) : null
            }
        </div>
    );
};

export default SearchToggle;
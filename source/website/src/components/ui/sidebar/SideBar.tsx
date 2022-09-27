import React from 'react';
import SearchToggle from '../search/search_toggle/SearchToggle';
import NavBarItemsManager from '../navbar/NavBarItemsManager';
import './SideBar.css'

const SideBar = () => {

    const collapseSideBar = () => {
        const layoutElement = document.querySelector('#layout-container')
        const sideBarButton = document.querySelector('#side-collapse-button-label')
        const sideBarNavContent = document.querySelectorAll('.side-image--text-wrapper > a > span')

        if (layoutElement != null) {
            layoutElement.classList.toggle('active-sidebar-layout')
        }

        if (sideBarButton != null) {
            sideBarButton.classList.toggle('active-sidebar-button-label')
        }

        if (sideBarNavContent != null) {
            sideBarNavContent.forEach(cr => cr.classList.toggle('active-sidebar--collapse-text'))
        }
    }

    return (
        <aside id='side-container'>
            <button id='side-collapse-button' onClick={collapseSideBar}>
                <span id='side-collapse-button-label'/>
            </button>

            <div id='side-content-container'>
                <nav className='side-content-nav'>
                    <NavBarItemsManager startIndex={0} endIndex={6}/>
                </nav>

                <nav className='side-content-nav'>
                    <SearchToggle/>

                    <NavBarItemsManager startIndex={6} endIndex={8}/>
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;
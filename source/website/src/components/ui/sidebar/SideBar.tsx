import React, {useRef} from 'react'

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'

import SearchToggle from '../../form/search_toggle/SearchToggle'
import SideBarItemsManager from './SideBarItemsManager'

import './SideBar.css'

const SideBar = () => {

    const sideContainerRef = useRef<HTMLElement>(null)

    const collapseSideBar = (): void => {
        const sideBarButton = document.querySelector<HTMLElement>('#side-collapse-icon')
        const sideBarNavContent = document.querySelectorAll<HTMLElement>('.side-image--text-wrapper a span')
        const sideBarNavLinkTag = document.querySelectorAll<HTMLElement>('.side-image--text-wrapper a')

        if (sideContainerRef.current != null) {
            /* Set the width to 100px */
            sideContainerRef.current.classList.toggle('active-sidebar-layout')
        }

        if (sideBarButton != null) {
            /* Rotate the icon */
            sideBarButton.classList.toggle('active-sidebar--button-icon')
        }

        /* Collapsing of the text content */
        if (sideBarNavContent != null) {
            sideBarNavContent.forEach(cr => {
                /* The content is collapse - show it again */
                if (cr.classList.contains('active-sidebar--collapse-text')) {
                    setTimeout(() => {
                        cr.classList.remove('active-sidebar--collapse-text')
                    }, 80)

                    /* The content isn't collapsed - collapse it */
                } else {
                    setTimeout(() => {
                        cr.classList.add('active-sidebar--collapse-text')
                    }, 40)
                }
            })
        }

        /* Collapsing of the Link */
        if (sideBarNavLinkTag != null) {
            sideBarNavLinkTag.forEach(cr => {
                /* The content is collapse - show it again */
                if (sideBarNavContent[0].classList.contains('active-sidebar--collapse-text')) {
                    setTimeout(() => {
                        cr.classList.remove('active-sidebar--link')
                    }, 150)

                    /* The content isn't collapsed - collapse it */
                } else {
                    setTimeout(() => {
                        cr.classList.add('active-sidebar--link')
                    }, 40)
                }
            })
        }
    }

    return (
        <aside ref={sideContainerRef} id='side-container'>
            <button id='side-collapse-button' onClick={collapseSideBar}>
                <KeyboardArrowLeftRoundedIcon id='side-collapse-icon'/>
            </button>

            <div id='side-content-container'>
                <nav className='side-content-nav'>
                    <SideBarItemsManager startIndex={0} endIndex={6}/>
                </nav>

                <nav className='side-content-nav'>
                    <SearchToggle/>

                    <SideBarItemsManager startIndex={6} endIndex={7}/>
                </nav>
            </div>
        </aside>
    )
}

export default SideBar
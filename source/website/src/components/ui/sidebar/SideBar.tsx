import React, {useRef} from 'react'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import SearchToggle from '../../form/search_toggle/SearchToggle'
import SideBarItemsManager from './SideBarItemsManager'
import './SideBar.css'

const SideBar = () => {

    const sideContainerRef = useRef<HTMLElement>(null)

    const collapseSideBar = (): void => {
        const sideBarButton = document.querySelector<Element>('#side-collapse-icon')
        const sideBarNavContent = document.querySelectorAll<Element>('.side-image--text-wrapper > a > span')

        if (sideContainerRef.current != null) {
            sideContainerRef.current.classList.toggle('active-sidebar-layout')
        }

        if (sideBarButton != null) {
            sideBarButton.classList.toggle('active-sidebar--button-icon')
        }

        if (sideBarNavContent != null) {
            sideBarNavContent.forEach(cr => {
                /* The content is collapse - show it again */
                if (cr.classList.contains('active-sidebar--collapse-text')) {
                    setTimeout(() => {
                        cr.classList.remove('active-sidebar--collapse-text')
                    }, 150)

                    /* The content isn't collapsed - collapse it */
                } else {
                    setTimeout(() => {
                        cr.classList.add('active-sidebar--collapse-text')
                    }, 40)
                }
            })
        }

        //toggleExpandGroupListing()
    }

    const toggleExpandGroupListing = (): void => {
        const sideGroupListingExpand = document.querySelector<Element>('#expand-more-icon-container')
        const sideGroupListing = document.querySelector<Element>('#side-group-listing--container')

        /* TODO: optimize */
        if (sideContainerRef.current !== null) {
            if (sideContainerRef.current.classList.contains('active-sidebar-layout')) {
                if (sideGroupListingExpand != null) {
                    sideGroupListingExpand.classList.toggle('active-side--group-listing')

                    setTimeout(() => {
                        sideGroupListingExpand.setAttribute('style', 'display: none');
                    }, 150)
                }

                if (sideGroupListing != null) {
                    sideGroupListing.classList.toggle('active-sidebar--collapse-text')

                    setTimeout(() => {
                        sideGroupListing.setAttribute('style', 'display: none');
                    }, 150)
                }
            } else {
                if (sideGroupListingExpand != null) {
                    sideGroupListingExpand.classList.toggle('active-side--group-listing')

                    setTimeout(() => {
                        sideGroupListingExpand.setAttribute('style', 'display: flex');
                    }, 150)
                }

                if (sideGroupListing != null) {
                    sideGroupListing.classList.toggle('active-sidebar--collapse-text')

                    setTimeout(() => {
                        sideGroupListing.setAttribute('style', 'display: flex');
                    }, 150)

                }
            }
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

                    <SideBarItemsManager startIndex={6} endIndex={8}/>
                </nav>
            </div>
        </aside>
    )
}

export default SideBar
import React, {useEffect, useRef, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import GroupsIcon from '@mui/icons-material/Groups'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import useHover from '../../../hooks/useHover'

import TooltipManager from '../tooltip/TooltipManager'
import SideBarGroupListing from './sidebar_group_listing/SideBarGroupListing'

interface SideBarListGroupItemProps {
    value: { image: string, title: string, url: string }
}

const SideBarListGroupItem = ({value}: SideBarListGroupItemProps) => {

    const {t} = useTranslation()

    const [hoverRef, isHovered] = useHover()
    const iconToggleRef = useRef<HTMLDivElement>(null)
    const [renderGroupItem, setRenderGroupItem] = useState<boolean>(false)

    // Assigning location variable
    const location = useLocation()
    // Destructuring pathname from location
    const {pathname} = location
    // Javascript split method to get the name of the path in array
    const splitLocation = pathname.split('/')

    useEffect((): void => {
        const sideGroupListing = document.querySelector<Element>('#side-group-listing')

        if (iconToggleRef.current !== null) {
            /* Transform the icon */
            iconToggleRef.current.classList.toggle('active-expand-more-icon')
        }

        if (sideGroupListing !== null) {
            if (renderGroupItem) {
                sideGroupListing.setAttribute('style', `max-height: ${sideGroupListing.scrollHeight + 100}px`)
            } else {
                sideGroupListing.setAttribute('style', `max-height: ${0}px`)
            }
        }
    }, [renderGroupItem])

    return (
        <>
            <li className={`nv-clr--default side-image--text-wrapper`}>
                <div className={`${(splitLocation[1] === value.url) ? 'side-active-nav-item' : ''}`}>
                    <Link ref={hoverRef} to={`/${value.url}`}>
                        <GroupsIcon style={{fontSize: '25px'}}/>
                        <span className='fs-pr-body-1 fw--semi-bold nv-clr--default'>{t(value.title)}</span>

                        <div ref={iconToggleRef} id='expand-more-icon-container'
                             onClick={() => setRenderGroupItem((prev) => !prev)}>
                            <ExpandMoreRoundedIcon/>
                        </div>
                    </Link>
                </div>

                <SideBarGroupListing/>
            </li>

            {
                (isHovered && document.querySelector<Element>('.active-sidebar-layout') !== null) ?
                    <TooltipManager content={<span>{t(value.title)}</span>}/>
                    : null
            }
        </>
    )
}

export default SideBarListGroupItem
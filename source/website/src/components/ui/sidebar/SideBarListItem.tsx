import React, {createElement, useEffect, useRef, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import useHover from '../../../hooks/useHover'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import GroupsIcon from '@mui/icons-material/Groups'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import TooltipManager from '../tooltip/TooltipManager'
import SideBarGroupListing from './sidebar_group_listing/SideBarGroupListing'

interface SideBarListItemProps {
    value: any
}

const SideBarListItem = ({value}: SideBarListItemProps) => {

    const {t} = useTranslation()

    const iconToggleRef = useRef<HTMLDivElement>(null)

    const [hoverRef, isHovered] = useHover()
    const [isGroupItem, setGroupItem] = useState<boolean>(false)
    const [renderGroupItem, setRenderGroupItem] = useState<boolean>(false)

    // Assigning location variable
    const location = useLocation()
    // Destructuring pathname from location
    const {pathname} = location
    // Javascript split method to get the name of the path in array
    const splitLocation = pathname.split('/')

    /* List of all the svg mui icon components -> the name is mapped to the original component by reference
    * by using this the typescript array can use the name of the components and it can be mapped to the real component
    * by reference */
    const Components: { [key: string]: any } = {
        'homeRoundedIcon': HomeRoundedIcon,
        'devicesRoundedIcon': DevicesRoundedIcon,
        'groupsIcon': GroupsIcon,
        'terminalRoundedIcon': TerminalRoundedIcon,
        'appsRoundedIcon': AppsRoundedIcon,
        'personIcon': PersonIcon,
        'settingsIcon': SettingsIcon
    }

    useEffect((): void => {
        if (value.title.toLowerCase() === 'groups') {
            setGroupItem(true)
        } else {
            setGroupItem(false)
        }
    }, [value])

    useEffect((): void => {
        const sideGroupListing = document.querySelector<Element>('#side-group-listing--container')

        if (iconToggleRef.current !== null) {
            iconToggleRef.current.classList.toggle('active-expand-more-icon')
        }

        if (sideGroupListing !== null) {
            if (renderGroupItem) {
                sideGroupListing.classList.add('active-side--group-listing')
            } else {
                sideGroupListing.classList.remove('active-side--group-listing')
            }
        }
    }, [renderGroupItem])

    return (
        <>
            {
                (isGroupItem) ?
                    <div ref={iconToggleRef} id='expand-more-icon-container'
                         onClick={() => setRenderGroupItem(!renderGroupItem)}>
                        <ExpandMoreRoundedIcon/>
                    </div>
                    : null
            }

            <li className={`nv-clr--default side-image--text-wrapper ${(splitLocation[1] === value.url)
                ? 'side-active-nav-item' : ''}`}>
                <Link ref={hoverRef} to={`/${value.url}`}>
                    {
                        /* Create the mui svg component */
                        createElement<any>(Components[value.image], {style: {fontSize: '25px'}})
                    }
                    <span className='fs-pr-body-1 fw--semi-bold nv-clr--default'>{t(value.title)}</span>

                </Link>
            </li>

            {
                (isGroupItem) ? <SideBarGroupListing/> : null
            }

            {
                (isHovered && document.querySelector<Element>('.active-sidebar-layout') !== null) ?
                    <TooltipManager content={<span className='fs-pr-body-1 fw--semi-bold'>{t(value.title)}</span>}/>
                    : null
            }
        </>
    )
}

export default SideBarListItem
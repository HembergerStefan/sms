import React, {createElement} from 'react'
import {Link, useLocation} from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'

import useHover from '../../../hooks/useHover'

import TooltipManager from '../tooltip/TooltipManager'

interface SideBarListItemProps {
    value: { image: string, title: string, url: string }
}

const SideBarListItem = ({value}: SideBarListItemProps) => {

    const [hoverRef, isHovered] = useHover()

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
        'terminalRoundedIcon': TerminalRoundedIcon,
        'appsRoundedIcon': AppsRoundedIcon,
        'personIcon': PersonIcon,
        'settingsIcon': SettingsIcon
    }

    return (
        <>
            <li className={`nv-clr--default side-image--text-wrapper`}>
                <div className={`${(splitLocation[1] === value.url) ? 'side-active-nav-item' : ''}`}>
                    <Link ref={hoverRef} to={`/${value.url}`}>
                        {
                            /* Create the mui svg component */
                            createElement<any>(Components[value.image], {style: {fontSize: '25px'}})
                        }
                        <span className='fs-pr-body-1 fw--semi-bold nv-clr--default'>{value.title}</span>
                    </Link>
                </div>
            </li>

            {
                (isHovered && document.querySelector<Element>('.active-sidebar-layout') !== null) ?
                    <TooltipManager content={<span>{value.title}</span>}/>
                    : null
            }
        </>
    )
}

export default SideBarListItem
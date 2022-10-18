import React from 'react'
import {useTranslation} from 'react-i18next'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import GroupsIcon from '@mui/icons-material/Groups'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'

import {SideBarItems} from '../../../data/sidebar/SideBarItems'

import SideBarListItem from './SideBarListItem'

interface SideBarItemsManagerProps {
    startIndex: number
    endIndex: number
}

const SideBarItemsManager = ({startIndex, endIndex}: SideBarItemsManagerProps) => {

    const {t} = useTranslation()

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

    return (
        <ul>
            {
                SideBarItems.slice(startIndex, endIndex).map((value, index) => {
                    const translatedValue = {image: Components[value.image], title: t(value.title), url: value.url}

                    return <SideBarListItem key={index} value={translatedValue}/>
                })
            }
        </ul>
    )
}

export default SideBarItemsManager
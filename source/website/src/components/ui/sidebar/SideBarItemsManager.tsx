import React from 'react'
import {SideBarItems} from '../../../data/sidebar/SideBarItems'
import SideBarListItem from './SideBarListItem'

interface SideBarItemsManagerProps {
    startIndex: number
    endIndex: number
}

const SideBarItemsManager = ({startIndex, endIndex}: SideBarItemsManagerProps) => {

    return (
        <ul>
            {
                SideBarItems.slice(startIndex, endIndex).map((value, index) => (
                    <SideBarListItem key={index} value={value}/>
                ))
            }
        </ul>
    )
}

export default SideBarItemsManager
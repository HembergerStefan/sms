import React from 'react'
import {NavBarItems} from '../../../data/navbar/NavBarItems'
import SideBarListItem from './SideBarListItem'

interface SideBarItemsManagerProps {
    startIndex: number
    endIndex: number
}

const SideBarItemsManager = ({startIndex, endIndex}: SideBarItemsManagerProps) => {

    return (
        <ul>
            {
                NavBarItems.slice(startIndex, endIndex).map((value, index) => (
                    <SideBarListItem key={index} value={value}/>
                ))
            }
        </ul>
    );
};

export default SideBarItemsManager
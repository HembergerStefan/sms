import React from 'react'
import {useTranslation} from 'react-i18next'

import {SideBarItems} from '../../../data/sidebar/SideBarItems'

import SideBarListItem from './SideBarListItem'
import SideBarListGroupItem from './SideBarListGroupItem'

interface SideBarItemsManagerProps {
    startIndex: number
    endIndex: number
}

const SideBarItemsManager = ({startIndex, endIndex}: SideBarItemsManagerProps) => {

    const {t} = useTranslation()

    return (
        <ul>
            {
                SideBarItems.slice(startIndex, endIndex).map((value, index) => {
                    const translatedValue = {image: value.image, title: t(value.title), url: value.url}

                    return value.title.toLowerCase() === 'groups' ?
                        <SideBarListGroupItem key={index} value={translatedValue}/> :
                        <SideBarListItem key={index} value={translatedValue}/>
                })
            }
        </ul>
    )
}

export default SideBarItemsManager
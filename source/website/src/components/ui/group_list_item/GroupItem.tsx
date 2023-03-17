import React from 'react'

import {Group} from '../../../data/data_types'

import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'

import useHover from '../../../hooks/useHover'

import Iconing from '../numbering/iconing/Iconing'
import IPInput from '../ip_input/IPInput'
import AdaptButton from '../../form/common_button/adapt_button/AdaptButton'
import TooltipManager from '../tooltip/TooltipManager'

import './GroupItem.css'

interface GroupItemProps {
    group: Group
    mutationText: string
    mutationFunction: Function
}

const GroupItem = ({group, mutationText, mutationFunction}: GroupItemProps) => {

    const [hoverRef, isHovered] = useHover()

    const mutationWrapper = () => {
        mutationFunction(group)

    }

    return (
        <div className='group-item'>
            <Iconing value={1} fixedColor={true} icon={GroupsRoundedIcon}/>
            <div>
                <h2 ref={hoverRef} className='fs-qi-1 fw--semi-bold clr-pr-1'>{group.name}</h2>
                <IPInput value={group.name}/>
            </div>
            <AdaptButton placeholder={mutationText} onOnClick={mutationWrapper}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{group.name}</span>}/> : null
            }
        </div>
    )
}

export default GroupItem
import React from 'react'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

import useRoleStore from '../../../stores/role/roleInformationStore'
import {User} from '../../../data/data_types'

import useHover from '../../../hooks/useHover'
import {useAddUserToGroupMutation} from '../../../utils/api/ApiService'

import Iconing from '../numbering/iconing/Iconing'
import IPInput from '../ip_input/IPInput'
import AdaptButton from '../../form/common_button/adapt_button/AdaptButton'
import TooltipManager from '../tooltip/TooltipManager'

import './UserItem.css'

interface UserItemProps {
    user: User
    groupId: string
}

const UserItem = ({user, groupId}: UserItemProps) => {

    const [hoverRef, isHovered] = useHover()

    const {getRoleById} = useRoleStore()

    const addUserToGroupMutation = useAddUserToGroupMutation(user.id, groupId)

    const addUserToGroup = () => {
        addUserToGroupMutation.mutate()
    }

    return (
        <div className='user-group--item'>
            <Iconing value={0} fixedColor={true} icon={PersonRoundedIcon}/>
            <div>
                <h2 ref={hoverRef} className='fs-qi-1 fw--semi-bold clr-pr-1'>{user.username}</h2>
                <IPInput value={getRoleById(user.role).name}/>
            </div>
            <AdaptButton placeholder='Add' onOnClick={addUserToGroup}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{user.username}</span>}/> : null
            }
        </div>
    )
}

export default UserItem
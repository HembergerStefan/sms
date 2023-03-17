import React, {memo} from 'react'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

import {User} from '../../../../data/data_types'
import useRoleStore from '../../../../stores/role/roleInformationStore'

import useHover from '../../../../hooks/useHover'
import {useRemoveUserFromGroupMutation} from '../../../../utils/api/ApiService'

import Iconing from '../../numbering/iconing/Iconing'
import IPInput from '../../ip_input/IPInput'
import AdaptButton from '../../../form/common_button/adapt_button/AdaptButton'
import TooltipManager from '../../tooltip/TooltipManager'

interface UserGroupItemProps {
    itemIndex: number
    user: User
    groupId: string
}

const UserGroupItem = ({itemIndex, user, groupId}: UserGroupItemProps) => {

    const [hoverRef, isHovered] = useHover()

    const {getRoleById} = useRoleStore()

    const removeUserFromGroupMutation = useRemoveUserFromGroupMutation(user.id, groupId)

    const removeUserFromGroup = () => {
        removeUserFromGroupMutation.mutate()
    }

    return (
        <div className='user-group--item'>
            <Iconing value={itemIndex} fixedColor={true} icon={PersonRoundedIcon}/>
            <div>
                <h2 ref={hoverRef} className='fs-qi-1 fw--semi-bold clr-pr-1'>{user.username}</h2>
                <IPInput value={getRoleById(user.role).name}/>
            </div>
            <AdaptButton placeholder='Remove' onOnClick={removeUserFromGroup}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{user.username}</span>}/> : null
            }
        </div>
    )
}

export default memo(UserGroupItem)
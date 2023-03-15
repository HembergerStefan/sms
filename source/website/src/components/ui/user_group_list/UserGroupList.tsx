import React, {Fragment, useState} from 'react'
import ReactDOM from 'react-dom'

import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'

import {useTranslation} from 'react-i18next'

import useGroupStore, {initialGroupState} from '../../../stores/groupInformationStore'
import useUserInfoStore, {initialUserState} from '../../../stores/user/userInformationStore'
import {Group} from '../../../data/data_types'

import BoxHeading from '../box_heading_container/BoxHeading'
import UserGroupItem from './user_group_item/UserGroupItem'
import GroupUserAddingDialog from '../dialog/group/adding_user/GroupUserAddingDialog'

import './UserGroupList.css'

const UserGroupList = () => {

    const {t} = useTranslation()

    const {groups, getGroupById} = useGroupStore()
    const {getUserById} = useUserInfoStore()

    const [forGroup, setForGroup] = useState<Group>(initialGroupState)
    const [mountDropdown, setMountDropdown] = useState<boolean>(false)
    const [renderAddingUserDialogComponent, setRenderAddingUserDialogComponent] = useState<boolean>(false)

    return (
        <>
            <section id='user-group--section' className='box'>
                <BoxHeading content={
                    <h2 className='fs-qr-1 fw--semi-bold'>{t('Users in Groups')}</h2>}
                            dropdownContent={undefined}
                            mountDropdown={mountDropdown}
                            setMountDropdown={setMountDropdown}/>

                <div id='group-users--container'>
                    {
                        groups.length !== 0 ?
                            groups.map((group, index) => (
                                <Fragment key={`userGroup${index}`}>
                                    <div className='group-users--heading'>
                                        <h1 className='fs-pr-body-1 fw--semi-bold'>{group.name}</h1>
                                        <div className='md-menu' onClick={() => {
                                            setForGroup(getGroupById(group.id))
                                            setRenderAddingUserDialogComponent(() => true)
                                        }}>
                                            <PersonAddRoundedIcon/>
                                        </div>
                                    </div>
                                    {
                                        group.users.length !== 0 ?
                                            group.users.map((user, index) => (
                                                <UserGroupItem key={`userGroup${index}`} itemIndex={index}
                                                               user={getUserById(user) ?? initialUserState}
                                                               groupId={group.id}/>
                                            )) :
                                            <span>{t('No users in group')}!</span>
                                    }
                                </Fragment>
                            ))
                            :
                            <div id='no-groups'>
                                <span className='fs-sc-body-1'>{t('No groups available')}</span>
                            </div>
                    }
                </div>
            </section>

            {
                (renderAddingUserDialogComponent) ? ReactDOM.createPortal(
                    <GroupUserAddingDialog unmountComponent={setRenderAddingUserDialogComponent} forGroup={forGroup}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </>
    )
}

export default UserGroupList
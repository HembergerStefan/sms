import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'

import {Role, User} from '../../../../data/data_types'
import useRoleStore, {initialRoleState} from '../../../../stores/role/roleInformationStore'
import useUserInfoStore, {initialUserState} from '../../../../stores/user/userInformationStore'
import {useUpdateUserRoleMutation, useUserPermittedQuery} from '../../../../utils/api/ApiService'

import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'
import Dropdown from '../../../form/dropdown/Dropdown'

import './UserInformationDialog.css'

interface UserInformationDialogProps {
    id?: string
    editMode?: boolean
}

const UserInformationDialog = ({id, editMode = false}: UserInformationDialogProps) => {

    const {t} = useTranslation()

    const {roles, getRoleByName, getRoleById} = useRoleStore()

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {addingUser, getUserById} = useUserInfoStore()

    const userRoleUpdateMutation = useUpdateUserRoleMutation(addingUser)

    const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<User>(initialUserState)
    const [roleNameItems, setRoleNameItems] = useState<string[]>(roles.map(role => role.name))
    const [defaultRole, setDefaultRole] = useState<Role>(roles.at(0) ?? initialRoleState)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    useEffect(() => {
        setRoleNameItems(() => roles.map(role => role.name))
    }, [roles])

    useEffect(() => {
        if (id != null && editMode) {
            setSelectedUser(() => getUserById(id) !== undefined ? getUserById(id)! : initialUserState)
        }
    }, [id])

    useEffect(() => {
        setDefaultRole(() => getRoleById(selectedUser.role))
    }, [selectedUser.role])

    useEffect(() => {
        addingUser.id = selectedUser.id
        addingUser.username = selectedUser.username
        addingUser.password = selectedUser.password
        addingUser.role = editMode ? selectedUser.role : getRoleByName('User').id
    }, [selectedUser])

    const setUsername = (content: string) => {
        addingUser.username = content
    }

    const setPassword = (content: string) => {
        addingUser.password = content
    }

    const setRole = (content: string) => {
        addingUser.role = getRoleByName(content).id

        /* The case when the user is creating a new user */
        if (selectedUser.role !== '') {
            userRoleUpdateMutation.mutate()
        }
    }

    return (
        <article id='user-information-dialog--container'>
            <TitleInputWrapper title='Info'
                               content={
                                   !userPermitted ?
                                       <span>{t('If you want to change your credentials, ask your admin')}.</span> :
                                       id !== undefined ?
                                           <span>{t('In this dialog you can change the username and password, as well as the role of the specific user')}. <span>
                                           {t('The role will be automatically saved after changing')}. <span>{t('If you don`t want to change the password, just leave it blank')}.</span>
                                       </span></span> : <span>{t('In this dialog you can add a user and specify the specific role')}.</span>
                               }/>

            <section id='user-info--wrapper'>
                <TitleInputWrapper title='Username'
                                   content={<div id='username-container--section' className='md-input'>
                                       <input type='text' name='username' placeholder={t('Username')}
                                              required={true}
                                              defaultValue={editMode ? selectedUser.username : undefined}
                                              autoComplete='off'
                                              className='input-container username-input-icon'
                                              tabIndex={1}
                                              onChange={(e) => setUsername(e.target.value)}/>
                                       <div>
                                           <PersonRoundedIcon fontSize='small'/>
                                       </div>
                                   </div>}/>

                <TitleInputWrapper title='Password'
                                   content={<div id='password-container--section' className='md-input'>
                                       <input type={isRevealPwd ? 'text' : 'password'} name='password'
                                              required={true}
                                              placeholder={t('Password')} autoComplete='off'
                                              defaultValue={editMode ? selectedUser.password : undefined}
                                              className='input-container password-input-icon'
                                              tabIndex={2}
                                              onChange={(e) => setPassword(e.target.value)}/>
                                       <div onClick={() => setIsRevealPwd(prevState => !prevState)}>
                                           {
                                               isRevealPwd ? <LockOpenRoundedIcon fontSize='small'/> :
                                                   <LockRoundedIcon fontSize='small'/>
                                           }
                                       </div>
                                   </div>}/>
            </section>

            {
                userPermitted ? <TitleInputWrapper title='Role' content={
                    <Dropdown defaultValue={defaultRole.name}
                              items={roleNameItems}
                              handleChange={setRole}/>
                }/> : null
            }
        </article>
    )
}

export default UserInformationDialog
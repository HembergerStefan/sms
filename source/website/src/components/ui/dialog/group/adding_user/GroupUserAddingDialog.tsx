import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import useGroupStore from '../../../../../stores/groupInformationStore'
import useUserInfoStore from '../../../../../stores/user/userInformationStore'
import {Group} from '../../../../../data/data_types'

import CloseButton from '../../../../form/menu/close/CloseButton'
import TitleInputWrapper from '../../../title_input_wrapper/TitleInputWrapper'
import UserItem from '../../../user_list_item/UserItem'

import '../../Dialog.css'
import './GroupUserAddingDialog.css'

interface GroupClientAddingDialogProps {
    forGroup: Group
    unmountComponent: Function
}

const GroupClientAddingDialog = ({forGroup, unmountComponent}: GroupClientAddingDialogProps) => {

    const {t} = useTranslation()

    const {users} = useUserInfoStore()
    const {getGroupById} = useGroupStore()

    const [shake, setShake] = useState<boolean>(false)

    const selectedGroup = getGroupById(forGroup.id).users

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        unmountComponent()
    }

    return (
        <section className='blocking-container' onMouseDown={() => {
            setShake(() => true)

            setTimeout(() => {
                if (!shake) {
                    setShake(() => false)
                }
            }, 720)
        }}>
            <form id='dialog-container' className={shake ? 'shake' : ''} onMouseDown={event => event.stopPropagation()}
                  onSubmit={handleSubmit}>
                <div>
                    <h1 className='fs-tr-1 fw--semi-bold'>{t('Add Users to Group')}</h1>
                    <div id='dialog-menu-container'>
                        <CloseButton size='28px' closeCallback={unmountComponent}/>
                    </div>
                </div>

                <article id='package-information-dialog--container'>
                    <TitleInputWrapper title='Info'
                                       content={

                                           selectedGroup.length === 0 ?
                                               <span><span className='clr-pr-1 fw--semi-bold'>{t('No users')}</span> {t('currently in the group')} <span
                                                   className='fw--semi-bold'>{forGroup.name}</span>. {t('You can add users by clicking the Button below')}.</span>
                                               :
                                               <span><span
                                                   className='clr-pr-1 fw--semi-bold'>{selectedGroup.length} {selectedGroup.length === 1 ? t('user') : t('users')}</span> {t('currently in the group')} <span
                                                   className='clr-pr-1 fw--semi-bold'>{forGroup.name}</span>. {t('Total amount of users')}: <span
                                                   className='clr-pr-1 fw--semi-bold'>{users.length}</span></span>
                                       }/>

                    <TitleInputWrapper title='Available Users'
                                       content={
                                           <div id='user-item--container'>
                                               {
                                                   users.map((user, index) => {
                                                       if (!selectedGroup.includes(user.id)) {
                                                           return <UserItem key={user.id + index}
                                                                            user={user} groupId={forGroup.id}/>
                                                       }
                                                   })
                                               }
                                           </div>
                                       }/>
                </article>

            </form>
        </section>
    )
}

export default GroupClientAddingDialog
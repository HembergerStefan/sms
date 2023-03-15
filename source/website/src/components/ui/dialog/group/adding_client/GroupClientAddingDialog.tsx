import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import useGroupStore from '../../../../../stores/groupInformationStore'
import useClientStore from '../../../../../stores/clientInformationStore'
import useFilterDataListStore from '../../../../../stores/filterDataListStore'

import CloseButton from '../../../../form/menu/close/CloseButton'
import TitleInputWrapper from '../../../title_input_wrapper/TitleInputWrapper'
import ClientItem from '../../../client_list_item/ClientItem'

import '../../Dialog.css'
import './GroupClientAddingDialog.css'

interface GroupClientAddingDialogProps {
    unmountComponent: Function
}

const GroupClientAddingDialog = ({unmountComponent}: GroupClientAddingDialogProps) => {

    const {t} = useTranslation()

    const {clients, getClientByMacAddress} = useClientStore()
    const {getGroupById} = useGroupStore()
    const {forGroup} = useFilterDataListStore()

    const [shake, setShake] = useState<boolean>(false)

    const selectedGroup = getGroupById(forGroup.id).clients

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
                    <h1 className='fs-tr-1 fw--semi-bold'>{t('Add Clients to Group')}</h1>
                    <div id='dialog-menu-container'>
                        <CloseButton size='28px' closeCallback={unmountComponent}/>
                    </div>
                </div>

                <article id='package-information-dialog--container'>
                    <TitleInputWrapper title='Info'
                                       content={
                                           selectedGroup.length === 0 ?
                                               <span>
                                                   <span>{t('Your first selected Client will set the operation system type of the group')}. {t('From then on you can only add clients with that operation system')}. </span>
                                                   <span className='clr-pr-1 fw--semi-bold'>{t('No clients')}</span> {t('currently in the group')} <span
                                                       className='clr-pr-1 fw--semi-bold'>{forGroup.name}</span>. {t('You can add clients by clicking the Button below')}.
                                               </span>
                                               :
                                               <span>
                                                   <span>{getClientByMacAddress(forGroup.clients[0])?.os === 'darwin' ? t('Only Mac-Clients can be added to group') : t('Only Windows-Clients can be added to group')}.</span> <span
                                                   className='clr-pr-1 fw--semi-bold'>{selectedGroup.length} {selectedGroup.length === 1 ? t('client') : t('clients')}</span> {t('currently in the group')} <span
                                                       className='clr-pr-1 fw--semi-bold'>{forGroup.name}</span>.
                                               </span>
                                       }/>

                    <TitleInputWrapper title='Available Clients'
                                       content={
                                           <div id='client-item--container'>
                                               {
                                                   clients.map((client, index) => {
                                                       if (!selectedGroup.includes(client.macAddress)) {
                                                           if (forGroup.clients.length !== 0) {
                                                               if (getClientByMacAddress(forGroup.clients[0])?.os === 'darwin' && client.os === 'darwin') {
                                                                   return <ClientItem key={client.macAddress + index}
                                                                                      client={client}
                                                                                      mutationText='Add'/>
                                                               } else if (getClientByMacAddress(forGroup.clients[0])?.os !== 'darwin' && client.os !== 'darwin') {
                                                                   return <ClientItem key={client.macAddress + index}
                                                                                      client={client}
                                                                                      mutationText='Add'/>
                                                               } else {
                                                                   return null
                                                               }
                                                           } else {
                                                               return <ClientItem key={client.macAddress + index}
                                                                                  client={client} mutationText='Add'/>
                                                           }
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
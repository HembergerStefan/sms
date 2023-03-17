import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import useClientStore from '../../../../../stores/clientInformationStore'
import useGroupStore from '../../../../../stores/groupInformationStore'
import {DataTypes, Package, Script} from '../../../../../data/data_types'

import CloseButton from '../../../../form/menu/close/CloseButton'
import TitleInputWrapper from '../../../title_input_wrapper/TitleInputWrapper'
import ClientItem from '../../../client_list_item/ClientItem'
import GroupItem from '../../../group_list_item/GroupItem'

import '../../Dialog.css'
import './TargetSelectionDialog.css'

interface TargetSelectionDialogProps {
    taskType: Script | Package
    unmountComponent: Function
    setSelectedTarget: Function
}

const TargetSelectionDialog = ({taskType, unmountComponent, setSelectedTarget}: TargetSelectionDialogProps) => {

    const {t} = useTranslation()

    const {clients, getClientByMacAddress} = useClientStore()
    const {groups} = useGroupStore()

    const [shake, setShake] = useState<boolean>(false)
    const [targetType, setTargetType] = useState<number>(DataTypes.CLIENT)

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        unmountComponent()
    }

    const clientTargetType = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setTargetType(() => DataTypes.CLIENT)
    }

    const groupTargetType = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setTargetType(() => DataTypes.GROUP)
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
                    <h1 className='fs-tr-1 fw--semi-bold'>{t('Select Target')}</h1>
                    <div id='dialog-menu-container'>
                        <CloseButton size='28px' closeCallback={unmountComponent}/>
                    </div>
                </div>

                <article id='target-information-dialog--container'>
                    <TitleInputWrapper title='Info'
                                       content={
                                           <span>
                                               <span>{t('First, you have to decide on which device the task is to be performed or which devices of the group this task concerns.')}</span>
                                           </span>
                                       }/>

                    <TitleInputWrapper title='Target Options'
                                       content={
                                           <div id='target-options--container'>
                                               <div id='target-type--menu-items'>
                                                   <button
                                                       className={targetType === 2 ? 'active--target-type--button' : undefined}
                                                       onClick={clientTargetType}>
                                                   <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>
                                                       {t('Clients')}
                                                   </span>
                                                   </button>

                                                   <button
                                                       className={targetType === 3 ? 'active--target-type--button' : undefined}
                                                       onClick={groupTargetType}>
                                                   <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>
                                                       {t('Groups')}
                                                   </span>
                                                   </button>
                                               </div>

                                               <div id='target-item--container'>
                                                   {
                                                       targetType === 2 ?
                                                           clients.map((client, index) => (
                                                                   (taskType as Package).silentSwitch ?
                                                                       (taskType as Package).silentSwitch && client.os !== 'darwin' ?
                                                                           <ClientItem key={client.macAddress + index}
                                                                                       client={client}
                                                                                       mutationText='Select'
                                                                                       mutationFunction={setSelectedTarget}/>
                                                                           : null
                                                                       : <ClientItem key={client.macAddress + index}
                                                                                     client={client}
                                                                                     mutationText='Select'
                                                                                     mutationFunction={setSelectedTarget}/>
                                                               )
                                                           )
                                                           :
                                                           groups.map((group, index) => (
                                                               group.clients.length !== 0 ?
                                                                   !(taskType as Package).silentSwitch ?
                                                                       <GroupItem key={group.id + index}
                                                                                  group={group} mutationText='Select'
                                                                                  mutationFunction={setSelectedTarget}/>
                                                                       : getClientByMacAddress(group.clients[0])?.os !== 'darwin' ?
                                                                           <GroupItem key={group.id + index}
                                                                                      group={group} mutationText='Select'
                                                                                      mutationFunction={setSelectedTarget}/>
                                                                           : null
                                                                   : null
                                                           ))
                                                   }
                                               </div>
                                           </div>
                                       }/>
                </article>

            </form>
        </section>
    )
}

export default TargetSelectionDialog
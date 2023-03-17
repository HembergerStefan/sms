import React, {useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import AppsRoundedIcon from '@mui/icons-material/AppsRounded'

import useHover from '../../../../hooks/useHover'

import {initialClientState} from '../../../../stores/clientInformationStore'
import {initialScriptState} from '../../../../stores/script/scriptInformationStore'
import {Client, Group, Package, Script} from '../../../../data/data_types'
import {usePackageTaskMutation, useScriptTaskMutation} from '../../../../utils/api/ApiService'

import CloseButton from '../../../form/menu/close/CloseButton'
import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'
import TargetSelectionDialog from './target/TargetSelectionDialog'
import TaskTypeSelectionDialog from './task_type/TaskTypeSelectionDialog'
import TooltipManager from '../../tooltip/TooltipManager'
import Iconing from '../../numbering/iconing/Iconing'
import IPInput from '../../ip_input/IPInput'
import SolidDialogButton from '../../../form/dialog_button/solid/SolidDialogButton'

import '../Dialog.css'
import './TaskInformationDialog.css'
import RemoveButton from "../../../form/menu/remove/RemoveButton";

interface TaskInformationDialogProps {
    unmountComponent: Function
    defaultTarget?: Client | Group
    defaultTaskType?: Script | Package
}

const TaskInformationDialog = ({unmountComponent, defaultTarget, defaultTaskType}: TaskInformationDialogProps) => {

    const {t} = useTranslation()

    const [hoverRef, isHovered] = useHover()

    const [shake, setShake] = useState<boolean>(false)
    const [renderTargetDialog, setRenderTargetDialog] = useState<boolean>(false)
    const [renderTaskTypeDialog, setRenderTaskTypeDialog] = useState<boolean>(false)

    const [selectedTarget, setSelectedTarget] = useState<Client | Group>(defaultTarget ?? initialClientState)
    const [selectedTaskType, setSelectedTaskType] = useState<Script | Package>(defaultTaskType ?? initialScriptState)

    const scriptTaskMutation = useScriptTaskMutation()
    const packageTaskMutation = usePackageTaskMutation()

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if ((selectedTarget as Client).ip) {
            if ((selectedTaskType as Script).code) {
                scriptTaskMutation.mutate({
                    clientId: (selectedTarget as Client).macAddress,
                    scriptId: selectedTaskType.id
                })
            } else {
                packageTaskMutation.mutate({
                    clientId: (selectedTarget as Client).macAddress,
                    packageId: selectedTaskType.id
                })
            }
        } else {
            (selectedTarget as Group).clients.forEach(client => {
                if ((selectedTaskType as Script).code) {
                    scriptTaskMutation.mutate({
                        clientId: client,
                        scriptId: selectedTaskType.id
                    })
                } else {
                    packageTaskMutation.mutate({
                        clientId: client,
                        packageId: selectedTaskType.id
                    })
                }
            })
        }

        unmountComponent()
    }

    const handleRemoveTargetType = () => {
        setSelectedTarget(() => defaultTarget ?? initialClientState)
        setSelectedTaskType(() => defaultTaskType ?? initialScriptState)
    }

    const handleRemoveTaskType = () => {
        setSelectedTaskType(() => defaultTaskType ?? initialScriptState)
    }

    return (
        <>
            <section className='blocking-container' onMouseDown={() => {
                setShake(() => true)

                setTimeout(() => {
                    if (!shake) {
                        setShake(() => false)
                    }
                }, 720)
            }}>
                <form id='dialog-container' className={shake ? 'shake' : ''}
                      onMouseDown={event => event.stopPropagation()}
                      onSubmit={handleSubmit}>
                    <div>
                        <h1 className='fs-tr-1 fw--semi-bold'>{t('Create Task')}</h1>
                        <div id='dialog-menu-container'>
                            <CloseButton size='28px' closeCallback={unmountComponent}/>
                        </div>
                    </div>

                    <article id='task-information-dialog--container'>
                        <TitleInputWrapper title='Info'
                                           content={
                                               <span>
                                               <span>{t('Within this dialog you can create tasks')}.</span> <span>
                                               {t('A Task can either cover a single client or an entire group of clients')}.</span> <span>
                                               {t('You can choose between running scripts or installing packages')}. <span>
                                                   {t('Depending on the selected group or client (according to the operating system), the system will automatically manage what you can select here')}.</span>
                                           </span>
                                           </span>
                                           }/>

                        <TitleInputWrapper title='Target Options'
                                           content={
                                               selectedTarget.name === '' ?
                                                   <div className='placeholder--option-item'
                                                        onClick={() => setRenderTargetDialog(() => true)}>
                                                       <span>{t('Select Client or Group')}</span>
                                                   </div>
                                                   :
                                                   <div className='target--options-item'>
                                                       <div>
                                                           <RemoveButton handleRemove={handleRemoveTargetType}/>
                                                       </div>
                                                       <Iconing value={1} fixedColor={true}
                                                                icon={(selectedTarget as Client).ip !== undefined
                                                                    ? DevicesRoundedIcon : GroupsRoundedIcon}/>
                                                       <div>
                                                           <h2 ref={hoverRef}
                                                               className='fs-qi-1 fw--semi-bold clr-pr-1'>{selectedTarget.name}</h2>
                                                           <IPInput
                                                               value={(selectedTarget as Client).ip !== undefined
                                                                   ? (selectedTarget as Client).ip : selectedTarget.name}/>
                                                       </div>

                                                       {
                                                           (isHovered) ? <TooltipManager
                                                               content={
                                                                   <span className='fs-sc-body-1 fw--semi-bold'>
                                                                       {selectedTarget.name}
                                                                   </span>
                                                               }/> : null
                                                       }
                                                   </div>
                                           }/>

                        <TitleInputWrapper title='Task-Type Options'
                                           content={
                                               selectedTaskType.name === '' ?
                                                   <div
                                                       className={`placeholder--option-item ${selectedTarget.name === '' ? 'disabled-placeholder--option-item' : null}`}
                                                       onClick={() => {
                                                           if (selectedTarget.name !== '') {
                                                               setRenderTaskTypeDialog(() => true)
                                                           }
                                                       }}>
                                                       <span>{selectedTarget.name === '' ? t('First select target') : t('Select Script or Package')}</span>
                                                   </div>
                                                   :
                                                   <div className='task-type--options-item'>
                                                       <div>
                                                           <RemoveButton handleRemove={handleRemoveTaskType}/>
                                                       </div>
                                                       <Iconing value={1} fixedColor={true}
                                                                icon={(selectedTaskType as Script).code !== undefined
                                                                    ? TerminalRoundedIcon : AppsRoundedIcon}/>
                                                       <div>
                                                           <h2 ref={hoverRef}
                                                               className='fs-qi-1 fw--semi-bold clr-pr-1'>{selectedTaskType.name}</h2>
                                                           <IPInput
                                                               value={(selectedTaskType as Script).code !== undefined
                                                                   ? (selectedTaskType as Script).description : (selectedTaskType as Package).url}/>
                                                       </div>

                                                       {
                                                           (isHovered) ? <TooltipManager
                                                               content={
                                                                   <span className='fs-sc-body-1 fw--semi-bold'>
                                                                       {selectedTaskType.name}
                                                                   </span>
                                                               }/> : null
                                                       }
                                                   </div>
                                           }/>
                    </article>

                    <div style={{marginLeft: 'auto'}}>
                        <SolidDialogButton placeholder='Create Task'
                                           disabled={selectedTarget.name === '' || selectedTaskType.name === ''}/>
                    </div>
                </form>
            </section>

            {
                (renderTargetDialog) ? ReactDOM.createPortal(
                    <TargetSelectionDialog unmountComponent={setRenderTargetDialog}
                                           setSelectedTarget={setSelectedTarget} taskType={selectedTaskType}/>,
                    document.querySelector('#layout-container')!) : null
            }

            {
                (renderTaskTypeDialog) ? ReactDOM.createPortal(
                    <TaskTypeSelectionDialog unmountComponent={setRenderTaskTypeDialog}
                                             setSelectedTaskType={setSelectedTaskType} targetType={selectedTarget}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </>
    )
}

export default TaskInformationDialog
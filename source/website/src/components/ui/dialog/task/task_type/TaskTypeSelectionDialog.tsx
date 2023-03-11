import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import useScriptStore from '../../../../../stores/script/scriptInformationStore'
import usePackageStore from '../../../../../stores/package/packageInformationStore'
import useClientStore from '../../../../../stores/clientInformationStore'
import {Client, DataTypes, Group} from '../../../../../data/data_types'

import CloseButton from '../../../../form/menu/close/CloseButton'
import TitleInputWrapper from '../../../title_input_wrapper/TitleInputWrapper'
import ScriptItem from '../../../script_list_item/ScriptItem'
import PackageItem from '../../../package_list_item/PackageItem'

import '../../Dialog.css'
import './TaskTypeSelectionDialog.css'

interface TaskTypeSelectionDialogProps {
    targetType: Client | Group
    unmountComponent: Function
    setSelectedTaskType: Function
}

const TaskTypeSelectionDialog = ({targetType, unmountComponent, setSelectedTaskType}: TaskTypeSelectionDialogProps) => {

    const {t} = useTranslation()

    const {scripts} = useScriptStore()
    const {_packages} = usePackageStore()
    const {getClientByMacAddress} = useClientStore()

    const [shake, setShake] = useState<boolean>(false)
    const [taskType, setTaskType] = useState<number>(DataTypes.SCRIPT)

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        unmountComponent()
    }

    const scriptTaskType = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setTaskType(() => DataTypes.SCRIPT)
    }

    const packageTaskType = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setTaskType(() => DataTypes.PACKAGE)
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
                    <h1 className='fs-tr-1 fw--semi-bold'>{t('Select Task-Type')}</h1>
                    <div id='dialog-menu-container'>
                        <CloseButton size='28px' closeCallback={unmountComponent}/>
                    </div>
                </div>

                <article id='task-type--information-dialog--container'>
                    <TitleInputWrapper title='Info'
                                       content={
                                           <span>
                                               <span>{t('At last, you have to decide what the task is all about')}. <span>{t('Choose between Script and Package')}.</span>
                                               </span>
                                           </span>
                                       }/>

                    <TitleInputWrapper title='Task-Type Options'
                                       content={
                                           <div id='task-type-options--container'>
                                               <div id='task-type--menu-items'>
                                                   <button
                                                       className={taskType === 0 ? 'active--task-type--button' : undefined}
                                                       onClick={scriptTaskType}>
                                                   <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>
                                                       {t('Scripts')}
                                                   </span>
                                                   </button>

                                                   {
                                                       (targetType as Client).os ?
                                                           (targetType as Client).os !== 'darwin' ?
                                                               <button
                                                                   className={taskType === 1 ? 'active--task-type--button' : undefined}
                                                                   onClick={packageTaskType}>
                                                   <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>
                                                       {t('Packages')}
                                                   </span>
                                                               </button>
                                                               : null
                                                           : (targetType as Group).clients.length !== 0 && getClientByMacAddress((targetType as Group).clients[0])?.os !== 'darwin' ?
                                                               <button
                                                                   className={taskType === 1 ? 'active--task-type--button' : undefined}
                                                                   onClick={packageTaskType}>
                                                   <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>
                                                       {t('Packages')}
                                                   </span>
                                                               </button> : null
                                                   }
                                               </div>

                                               <div id='task-type-item--container'>
                                                   {
                                                       taskType === 0 ?
                                                           scripts.map((script, index) => (
                                                               (targetType as Client).os ?
                                                                   (targetType as Client).os === 'darwin' && script.language.toLowerCase() !== 'cmd' ?
                                                                       <ScriptItem key={script.id + index}
                                                                                   script={script} mutationText='Select'
                                                                                   mutationFunction={setSelectedTaskType}/> :
                                                                       (targetType as Client).os !== 'darwin' && script.language.toLowerCase() !== 'bash' ?
                                                                           <ScriptItem key={script.id + index}
                                                                                       script={script}
                                                                                       mutationText='Select'
                                                                                       mutationFunction={setSelectedTaskType}/>
                                                                           : null
                                                                   :
                                                                   ((targetType as Group).clients.length !== 0 && getClientByMacAddress((targetType as Group).clients[0])?.os === 'darwin') ?
                                                                       script.language.toLowerCase() !== 'cmd' ?
                                                                           <ScriptItem key={script.id + index}
                                                                                       script={script}
                                                                                       mutationText='Select'
                                                                                       mutationFunction={setSelectedTaskType}/> : null
                                                                       : script.language.toLowerCase() !== 'bash' ?
                                                                           <ScriptItem key={script.id + index}
                                                                                       script={script}
                                                                                       mutationText='Select'
                                                                                       mutationFunction={setSelectedTaskType}/>
                                                                           : null
                                                           )) :
                                                           (targetType as Client).os !== 'darwin' ?
                                                               _packages.map((_package, index) => {
                                                                   return <PackageItem key={_package.id + index}
                                                                                       _package={_package}
                                                                                       mutationText='Select'
                                                                                       mutationFunction={setSelectedTaskType}/>
                                                               })
                                                               : null
                                                   }
                                               </div>
                                           </div>
                                       }/>
                </article>
            </form>
        </section>
    )
}

export default TaskTypeSelectionDialog
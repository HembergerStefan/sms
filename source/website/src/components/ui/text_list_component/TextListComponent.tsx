import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'
import {formatDistance} from 'date-fns'
import {deAT, enUS} from 'date-fns/locale'

import useTaskStore from '../../../stores/task/taskInformationStore'
import useScriptStore, {initialScriptState} from '../../../stores/script/scriptInformationStore'
import useClientStore, {initialClientState} from '../../../stores/clientInformationStore'
import useLngStore from '../../../stores/lngStore'
import {DataTypes} from '../../../data/data_types'

import BoxHeading from '../box_heading_container/BoxHeading'
import TextListItem from './text_list_item/TextListItem'

import './TextListComponent.css'

interface TextListComponentProps {
    headingContent: React.ReactNode
    textListType: DataTypes
}

const TextListComponent = ({headingContent, textListType}: TextListComponentProps) => {

    const {t} = useTranslation()

    const {tasks} = useTaskStore()
    const {getScriptById} = useScriptStore()
    const {clients, getClientByMacAddress, getClientOnlineStatus, getScriptsOfClients} = useClientStore()
    const {selectedLng} = useLngStore()

    return (
        <article id='text-list--container' className='box'>
            <BoxHeading content={headingContent} dropdownContent={undefined} mountDropdown={false}
                        setMountDropdown={() => {
                        }}/>

            <div id='list-item-container'>
                {
                    textListType === 6 ?
                        tasks.length !== 0 ?
                            tasks.map((task, index) => (
                                <TextListItem key={`textListItem${index}`}
                                              client={getClientByMacAddress(task.clientId)?.name ?? initialClientState.name}
                                              action={task.task.name}
                                              actionDesc={t('has a running task')}
                                              timeAgo={`${t('Client last online')} ${getClientOnlineStatus(task.clientId, selectedLng).lastOnline}`}/>
                            ))
                            :
                            <div id='no-tasks'>
                                <span className='fs-sc-body-1'>{t('No new tasks')}</span>
                            </div>
                        :
                        textListType === 0 ?
                            clients.length !== 0 && getScriptsOfClients().length !== 0 ?
                                clients.map((client, index) => (
                                    client.scripts.map((scriptId) => {
                                        const currentScript = getScriptById(scriptId) ?? initialScriptState

                                        return <TextListItem key={`textListItem${index}`}
                                                             client={client.name} action={currentScript.name}
                                                             actionDesc={t('executed the script')}
                                                             date={currentScript.executionDate.toLocaleDateString()}
                                                             timeAgo={formatDistance(new Date(currentScript.executionDate), new Date(), {
                                                                 addSuffix: true,
                                                                 locale: selectedLng === 'en' ? enUS : deAT
                                                             })}/>
                                    })
                                ))
                                :
                                <div id='no--client-script--executions'>
                                    <span className='fs-sc-body-1'>{t('No client-script executions')}</span>
                                </div>
                            : null
                }
            </div>
        </article>
    )
}

export default memo(TextListComponent)
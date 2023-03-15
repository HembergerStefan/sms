import React, {useEffect, useState} from 'react'

import useClientStore, {initialClientState} from '../../../../stores/clientInformationStore'
import {Client} from '../../../../data/data_types'

import TextInput from '../../../form/text_input/TextInput'
import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'

import './ClientInformationDialog.css'

interface ClientInformationDialogProps {
    id?: string
    displayId: number
    editMode?: boolean
}

const ClientInformationDialog = ({id, displayId, editMode = false}: ClientInformationDialogProps) => {

    /* Get the selected packages out of the store & the possibility to update the store */
    const {clients, addingClient, getClientByMacAddress} = useClientStore()

    const [selectedClient, setSelectedClient] = useState<Client>(initialClientState)

    useEffect(() => {
        if (id != null && editMode) {
            setSelectedClient(() => getClientByMacAddress(id) ?? initialClientState)
        }
    }, [id])

    useEffect(() => {
        addingClient.macAddress = selectedClient.macAddress
        addingClient.name = selectedClient.name
        addingClient.ip = selectedClient.ip
        addingClient.cpuUsage = selectedClient.cpuUsage
        addingClient.usedDiskspace = selectedClient.usedDiskspace
        addingClient.lastOnline = selectedClient.lastOnline
    }, [selectedClient])

    const setName = (content: string) => {
        addingClient.name = content
    }

    const setIp = (content: string) => {
        addingClient.ip = content
    }

    return (
        <article id='client-information-dialog--container'>
            <section id='title-version--wrapper'>
                <TitleInputWrapper title='Title'
                                   content={<TextInput
                                       headingId={selectedClient.macAddress !== '' ? displayId : clients.length + 1}
                                       isHeading={true}
                                       defaultValue={editMode ? selectedClient.name : undefined}
                                       placeholder='Client Clarification'
                                       setStoreValue={setName}/>}/>
                <TitleInputWrapper title='Ip-Address' content={
                    <TextInput
                        defaultValue={editMode ? selectedClient.ip : undefined}
                        placeholder='Client Ip-Address'
                        setStoreValue={setIp}
                        renderFullSizeToggle={false}/>}/>
            </section>
        </article>
    )
}

export default ClientInformationDialog
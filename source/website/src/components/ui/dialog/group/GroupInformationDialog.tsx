import React, {useEffect, useState} from 'react'

import useGroupStore, {initialGroupState} from '../../../../stores/groupInformationStore'
import {Group} from '../../../../data/data_types'

import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'
import TextInput from '../../../form/text_input/TextInput'

import './GroupInformationStore.css'

interface GroupInformationDialogProps {
    id?: string
    displayId: number
    editMode?: boolean
}

const GroupInformationDialog = ({id, displayId, editMode = false}: GroupInformationDialogProps) => {

    /* Get the selected groups out of the store & the possibility to update the store */
    const {groups, addingGroup, getGroupById} = useGroupStore()

    const [selectedGroup, setSelectedGroup] = useState<Group>(initialGroupState)

    useEffect(() => {
        if (id != null && editMode) {
            setSelectedGroup(() => getGroupById(id))
        }
    }, [id])

    useEffect(() => {
        addingGroup.id = selectedGroup.id
        addingGroup.name = selectedGroup.name
    }, [selectedGroup])
    const setName = (content: string) => {
        addingGroup.name = content
    }

    return (
        <article id='group-information-dialog--container'>
            <TitleInputWrapper title='Name'
                               content={<TextInput
                                   headingId={selectedGroup.id !== '' ? displayId : groups.length + 1}
                                   isHeading={true}
                                   defaultValue={editMode ? selectedGroup.name : undefined}
                                   placeholder='Group Clarification'
                                   setStoreValue={setName}/>}/>
        </article>
    )
}

export default GroupInformationDialog
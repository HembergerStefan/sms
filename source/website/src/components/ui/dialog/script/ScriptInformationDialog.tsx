import React, {useEffect} from 'react'

import useScriptStore, {initialScriptState} from '../../../../store/scriptInformationStore'
import {Script} from '../../../../data/data_types'

import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'
import TextInput from '../../../form/text_input/TextInput'
import CodeBlock from '../../../form/code_editor/CodeBlockEditor'
import DateTimePicker from '../../../form/date_time_picker/DateTimePicker'

import './ScriptInformationDialog.css'

interface ScriptInformationDialogProps {
    id?: number
    editMode?: boolean
}

const ScriptInformationDialog = ({id, editMode = false}: ScriptInformationDialogProps) => {

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {scripts, addingScript, getScriptById} = useScriptStore()

    let selectedScript: Script = initialScriptState

    if (id != null && editMode) {
        selectedScript = getScriptById(id)
    }

    useEffect(() => {
        addingScript.id = scripts.length + 1
    }, [])

    const setTitle = (content: string) => {
        addingScript.name = content
    }

    const setDesc = (content: string) => {
        addingScript.description = content
    }

    const setExecDate = (content: Date) => {
        addingScript.executionDate = content
    }

    const setCode = (content: string) => {
        addingScript.code = content
    }

    return (
        <article id='script-information-dialog--container'>
            <section id='title-execution--wrapper'>
                <TitleInputWrapper title='Title'
                                   content={<TextInput
                                       headingId={selectedScript.id !== -1 ? selectedScript.id : scripts.length + 1}
                                       isHeading={true}
                                       defaultValue={editMode ? selectedScript.name : undefined}
                                       placeholder='Script Clarification'
                                       setStoreValue={setTitle}/>}/>
                <TitleInputWrapper title='Execution Date' content={
                    <DateTimePicker defaultValue={editMode ? selectedScript.executionDate : undefined}
                                    setStoreValue={setExecDate}/>}/>
            </section>

            <TitleInputWrapper title='Description' content={
                <TextInput
                    defaultValue={editMode ? selectedScript.description : undefined}
                    placeholder='What makes my script so special ...'
                    customSize={{
                        height: 120,
                        hUnit: 'px',
                        width: 100,
                        wUnit: '%'
                    }}
                    setStoreValue={setDesc}/>}/>
            <TitleInputWrapper title='Code'
                               content={<CodeBlock defaultValues={editMode ? {
                                   code: selectedScript.code,
                                   language: selectedScript.language
                               } : undefined} setStoreValue={setCode}/>}/>
        </article>
    )
}

export default ScriptInformationDialog
import React, {useEffect, useState} from 'react'

import useScriptStore, {initialScriptState} from '../../../../stores/script/scriptInformationStore'
import {Script} from '../../../../data/data_types'

import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'
import TextInput from '../../../form/text_input/TextInput'
import CodeBlock from '../../../form/code_editor/CodeBlockEditor'

import './ScriptInformationDialog.css'

interface ScriptInformationDialogProps {
    id?: string
    displayId: number
    editMode?: boolean
}

const ScriptInformationDialog = ({id, displayId, editMode = false}: ScriptInformationDialogProps) => {

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {scripts, addingScript, getScriptById} = useScriptStore()

    const [selectedScript, setSelectedScript] = useState<Script>(initialScriptState)
    const [codeBlockValues, setCodeBlockValues] = useState<{ code: string, language: string }>({
        code: '',
        language: 'Python'
    })

    useEffect(() => {
        if (id != null && editMode) {
            setSelectedScript(() => getScriptById(id) !== undefined ? getScriptById(id)! : initialScriptState)
        }
    }, [id])

    useEffect(() => {
        addingScript.id = selectedScript.id
        addingScript.name = selectedScript.name
        addingScript.code = selectedScript.code
        addingScript.description = selectedScript.description
        addingScript.executionDate = selectedScript.executionDate
        addingScript.fileExtension = selectedScript.fileExtension
        addingScript.language = selectedScript.language
    }, [selectedScript])

    useEffect(() => {
        setCodeBlockValues({code: selectedScript.code, language: selectedScript.language})
    }, [selectedScript.code, selectedScript.language])

    const setTitle = (content: string) => {
        addingScript.name = content
    }

    const setDesc = (content: string) => {
        addingScript.description = content
    }

    const setCode = (content: string) => {
        addingScript.code = content
    }

    return (
        <article id='script-information-dialog--container'>
            <section id='title-execution--wrapper'>
                <TitleInputWrapper title='Title'
                                   content={<TextInput
                                       headingId={selectedScript.id !== '' ? displayId : scripts.length + 1}
                                       isHeading={true}
                                       defaultValue={editMode ? selectedScript.name : undefined}
                                       placeholder='Script Clarification'
                                       setStoreValue={setTitle}/>}/>
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
                               content={<CodeBlock defaultValues={editMode ? codeBlockValues : undefined}
                                                   setStoreValue={setCode}/>}/>
        </article>
    )
}

export default ScriptInformationDialog
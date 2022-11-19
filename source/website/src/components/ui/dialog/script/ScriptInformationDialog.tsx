import React from 'react'

import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'
import TextInput from '../../../form/text_input/TextInput'
import CodeBlock from '../../../form/code_editor/CodeBlockEditor'

import './ScriptInformationDialog.css'

const ScriptInformationDialog = () => {

    return (
        <article id='script-information-dialog--container'>
            <TitleInputWrapper title='Title'
                               content={<TextInput isHeading={true} placeholder='Script Clarification'/>}/>
            <TitleInputWrapper title='Description' content={<TextInput placeholder='What makes my script so special ...'
                                                                       customSize={{
                                                                           height: 120,
                                                                           hUnit: 'px',
                                                                           width: 100,
                                                                           wUnit: '%'
                                                                       }}/>}/>
            <TitleInputWrapper title='Code' content={
                <CodeBlock/>
            }/>
        </article>
    )
}

export default ScriptInformationDialog
import React, {memo, useEffect, useRef, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useScriptStore from '../../../store/scriptInformationStore'

import CodeEditor from '@uiw/react-textarea-code-editor'

import FullSizeButton from '../menu/full_size/FullSizeButton'
import CodingLanguageSelector from '../coding_language_selector/CodingLanguageSelector'

import './CodeBlockEditor.css'

interface CodeBlockEditorProps {
    defaultValues?: { code: string, language: string }
    setStoreValue: Function
}

const CodeBlockEditor = ({defaultValues, setStoreValue}: CodeBlockEditorProps) => {

    const {t} = useTranslation()
    const {addingScript} = useScriptStore()

    const [code, setCode] = useState<string>(defaultValues?.code !== undefined ? defaultValues?.code : '')
    const [language, setLanguage] = useState<string>(defaultValues?.language !== undefined ? defaultValues?.language : 'Python')
    const codeSectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        addingScript.language = language
    }, [language])

    return (
        <section ref={codeSectionRef} id='code-section' className='md-input'>
            <CodeEditor
                id='code-editor'
                value={code}
                language={language}
                placeholder={t('Code of the Script')}
                wrap='soft'
                onChange={(ev) => {
                    setCode(ev.target.value)
                    setStoreValue(ev.target.value)
                }}
                style={{
                    color: 'var(--sc-clr)',
                    fontSize: 16,
                    backgroundColor: 'var(--ipt--bg-clr)',
                    borderRadius: 'var(--br-r-small)',
                    height: '100%',
                    width: '90%',
                    minHeight: '220px',
                    maxHeight: '450px',
                    maxWidth: '610px',
                    overflow: 'auto',
                    whiteSpace: 'pre-line'
                }}
                required={true}
            />
            <div id='code-editor--pref-settings'>
                <CodingLanguageSelector language={language} setLanguage={setLanguage}/>
                <FullSizeButton containerRef={codeSectionRef} size='var(--icon-size-small)'/>
            </div>
        </section>
    )
}

export default memo(CodeBlockEditor)
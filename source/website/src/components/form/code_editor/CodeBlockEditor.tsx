import React, {memo, useRef, useState} from 'react'

import {getDataTheme} from "../../../utils/DetectDataTheme"

import './CodeBlockEditor.css'

import CodeEditor from '@uiw/react-textarea-code-editor'
import FullSizeButton from "../menu/full_size/FullSizeButton"
import {useTranslation} from "react-i18next"
import CodingLanguageSelector from "../coding_language_selector/CodingLanguageSelector";

const CodeBlockEditor = () => {

    const {darkMode} = getDataTheme()

    const [code, setCode] = useState<string>('')
    const [language, setLanguage] = useState<string>('Bash')
    const codeSectionRef = useRef<HTMLElement>(null)

    const {t} = useTranslation()

    const tempCode = '#!/bin/sh\n' +
        'echo "Hello world"'

    return (
        <section ref={codeSectionRef} id='code-section'>
            <CodeEditor
                id='code-editor'
                value={code}
                language={language}
                wrap='soft'
                placeholder={t('Code of the Script')}
                onChange={(evn) => setCode(evn.target.value)}
                style={{
                    color: 'var(--sc-clr)',
                    fontSize: 16,
                    backgroundColor: 'var(--ipt--bg-clr)',
                    borderRadius: 'var(--br-r-small)',
                    height: '100%',
                    width: '90%',
                    minHeight: '120px',
                    maxHeight: '500px',
                    overflow: 'auto'
                }}
            />
            <section id='code-editor--pref-settings'>
                <CodingLanguageSelector language={language} setLanguage={setLanguage}/>
                <FullSizeButton containerRef={codeSectionRef} size='var(--icon-size-small)'/>
            </section>
        </section>
    )
}

export default memo(CodeBlockEditor)
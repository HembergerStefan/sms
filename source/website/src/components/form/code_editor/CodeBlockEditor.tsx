import React, {memo, useRef, useState} from 'react'

import {useTranslation} from 'react-i18next'

import CodeEditor from '@uiw/react-textarea-code-editor'

import FullSizeButton from '../menu/full_size/FullSizeButton'
import CodingLanguageSelector from '../coding_language_selector/CodingLanguageSelector'

import './CodeBlockEditor.css'

const CodeBlockEditor = () => {

    const {t} = useTranslation()
    const initialValue = t('Code of the Script')

    const [code, setCode] = useState<string>(initialValue)
    const [language, setLanguage] = useState<string>('Bash')
    const codeSectionRef = useRef<HTMLElement>(null)

    return (
        <section ref={codeSectionRef} id='code-section'>
            <CodeEditor
                id='code-editor'
                value={code}
                language={language}
                wrap='soft'
                onChange={(evn) => setCode(evn.target.value)}
                style={{
                    color: 'var(--sc-clr)',
                    fontSize: 16,
                    backgroundColor: 'var(--ipt--bg-clr)',
                    borderRadius: 'var(--br-r-small)',
                    height: '100%',
                    width: '90%',
                    minHeight: '120px',
                    maxHeight: '450px',
                    maxWidth: '610px',
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
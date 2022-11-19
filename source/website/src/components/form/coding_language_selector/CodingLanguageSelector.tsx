import React, {memo, useEffect, useState} from 'react'

import DropdownContent from "../dropdown/DropdownContent"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import ReactDOM from "react-dom"

import './CodingLanguageSelector.css'

interface CodingLanguageSelectorProps {
    language: string
    setLanguage: Function
}

const CodingLanguageSelector = ({language, setLanguage}: CodingLanguageSelectorProps) => {

    const [mount, setMount] = useState<boolean>(false)
    const [domReady, setDomReady] = useState<boolean>(false)

    const LANGUAGE_ITEMS: string[] = ['Bash', 'Python', 'PowerShell', 'CMD'].sort()

    /* Always hide the component when clicking outside the component */
    const [dropdownRef] = useOnClickOutside(() => mount ? setMount(false) : null)

    useEffect(() => {
        setDomReady(() => true)
    }, [])

    return (
        <section id='code-language--section'>
            <div ref={dropdownRef} id='code-language--container' onClick={() => setMount(() => !mount)}>
                <span className='fs-qi-1 fw--semi-bold'>{language}</span>
            </div>

            <DropdownContent mount={mount} setMount={setMount} items={LANGUAGE_ITEMS} setCrItem={setLanguage}/>
        </section>
    )
}

export default memo(CodingLanguageSelector)
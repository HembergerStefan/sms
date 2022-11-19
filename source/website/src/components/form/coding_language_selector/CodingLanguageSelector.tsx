import React, {memo, useState} from 'react'

import './CodingLanguageSelector.css'
import DropdownContent from "../dropdown/DropdownContent";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

interface CodingLanguageSelectorProps {
    language: string
    setLanguage: Function
}

const CodingLanguageSelector = ({language, setLanguage}: CodingLanguageSelectorProps) => {

    const [mount, setMount] = useState<boolean>(false)

    const ITEMS: string[] = ['Bash', 'JavaScript', 'Python']

    /* Always hide the component when clicking outside the component */
    const [dropdownRef] = useOnClickOutside(() => mount ? setMount(false) : null)

    return (
        <section id='code-language--section'>
            <div ref={dropdownRef} id='code-language--container' onClick={() => setMount(() => !mount)}>
                <span className='fs-qi-1 fw--semi-bold'>{language}</span>

            </div>
            <DropdownContent mount={mount} setMount={setMount} items={ITEMS} setCrItem={setLanguage}/>
        </section>
    )
}

export default memo(CodingLanguageSelector)
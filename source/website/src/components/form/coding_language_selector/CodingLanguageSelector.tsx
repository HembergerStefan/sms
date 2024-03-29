import React, {memo, useState} from 'react'

import useOnClickOutside from '../../../hooks/useOnClickOutside'

import DropdownContent from '../dropdown/DropdownContent'
import ListDropdownContent from '../dropdown/list_dropdown/ListDropdownContent'

import './CodingLanguageSelector.css'

interface CodingLanguageSelectorProps {
    language: string
    setLanguage: Function
}

const CodingLanguageSelector = ({language, setLanguage}: CodingLanguageSelectorProps) => {

    const [mount, setMount] = useState<boolean>(false)

    const LANGUAGE_ITEMS: string[] = ['Bash', 'Python', 'CMD'].sort()

    /* Always hide the component when clicking outside the component */
    const [dropdownRef] = useOnClickOutside(() => mount ? setMount(false) : null)

    return (
        <section id='code-language--section'>
            <div ref={dropdownRef} id='code-language--container' onClick={() => setMount(() => !mount)}>
                <span className='fs-qi-1 fw--semi-bold'>{language}</span>
            </div>

            <DropdownContent mount={mount}
                             dropdownContent={<ListDropdownContent setMount={setMount} items={LANGUAGE_ITEMS}
                                                                   crItem={language} setCrItem={setLanguage}/>}/>
        </section>
    )
}

export default memo(CodingLanguageSelector)
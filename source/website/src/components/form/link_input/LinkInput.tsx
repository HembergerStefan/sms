import React, {memo, useEffect, useRef, useState} from 'react'

import {useTranslation} from 'react-i18next'

import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'

import './LinkInput.css'

interface LinkInputProps {
    defaultValue?: string | undefined
    placeholder: string
    setStoreValue: Function
}

const LinkInput = ({defaultValue, placeholder, setStoreValue}: LinkInputProps) => {

    const {t} = useTranslation()

    const iconToggleRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState<string>('')

    /* Set the default value in the useState when it's given */
    useEffect(() => {
        if (defaultValue && defaultValue !== '') {
            setValue(() => defaultValue)
        }
    }, [defaultValue])

    /* Toggle if the remove button should be shown or not */
    useEffect(() => {
        if (iconToggleRef.current !== null) {
            if (value !== '') {
                iconToggleRef.current.classList.add('active--remove-button')
            } else {
                iconToggleRef.current.classList.remove('active--remove-button')
            }
        }
    }, [value])

    /* Remove user input */
    const reset = (ev: React.MouseEvent<HTMLDivElement>): void => {
        ev.stopPropagation()
        setValue(() => '')
    }

    return (
        <label id='link-input--wrapper' className='md-input'>
            <LinkRoundedIcon style={{color: 'var(--sc-clr'}}/>
            <input id='link-input' type='url'
                   value={value}
                   placeholder={t(placeholder)}
                   onChange={(event) => {
                       setStoreValue(event.target.value)
                       setValue(event.target.value)
                   }}
                   required={true}
                   autoComplete='off'/>

            <div ref={iconToggleRef} onClick={reset}>
                <ClearRoundedIcon/>
            </div>
        </label>
    )
}

export default memo(LinkInput)
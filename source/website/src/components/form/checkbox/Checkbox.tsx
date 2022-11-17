import React, {useRef, memo, useEffect, ChangeEventHandler} from 'react'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'

import {STATES} from './CheckboxStates'

import './Checkbox.css'

interface CheckboxProps {
    value: string
    handleChange: ChangeEventHandler<HTMLInputElement>
}

const Checkbox = ({value, handleChange}: CheckboxProps) => {

    const checkboxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (checkboxRef.current !== null) {
            if (value === STATES.CHECKED) {
                checkboxRef.current.checked = true
                checkboxRef.current.indeterminate = false
            } else if (value === STATES.EMPTY) {
                checkboxRef.current.checked = false
                checkboxRef.current.indeterminate = false
            } else if (value === STATES.INDETERMINATE) {
                checkboxRef.current.checked = false
                checkboxRef.current.indeterminate = true
            }
        }
    }, [value])

    return (
        <label id='checkbox-wrapper'>
            <input ref={checkboxRef} type='checkbox'
                   checked={value === STATES.CHECKED}
                   onChange={handleChange}/>
            {
                value === STATES.CHECKED ? <CheckRoundedIcon id='checkbox-checked--icon'/> : null
            }

            {
                value === STATES.INDETERMINATE ?
                    <HorizontalRuleRoundedIcon id='checkbox-indeterminate--icon'/> : null
            }
        </label>
    )
}

export default memo(Checkbox)
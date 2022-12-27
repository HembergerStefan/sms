import React, {useRef, memo, useEffect, HTMLProps} from 'react'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'

import './Checkbox.css'

interface CheckboxProps {
    indeterminate?: boolean
}

const Checkbox = ({indeterminate, ...rest}: CheckboxProps & HTMLProps<HTMLInputElement>) => {

    const checkboxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (checkboxRef.current !== null) {
            if (typeof indeterminate === 'boolean') {
                checkboxRef.current.indeterminate = !rest.checked && indeterminate
            }
        }
    }, [checkboxRef, indeterminate])

    return (
        <label id='checkbox-wrapper'>
            <input ref={checkboxRef} type='checkbox' {...rest}/>
            {
                (rest.checked) ? <CheckRoundedIcon id='checkbox-checked--icon'/> : null
            }

            {
                (!rest.checked && indeterminate) ? <HorizontalRuleRoundedIcon id='checkbox-indeterminate--icon'/> : null
            }
        </label>
    )
}

export default memo(Checkbox)
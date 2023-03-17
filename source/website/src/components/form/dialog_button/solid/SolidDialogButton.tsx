import React, {ButtonHTMLAttributes, DetailedHTMLProps, memo} from 'react'

import {useTranslation} from 'react-i18next'

import './SolidDialogButton.css'

interface DialogButtonProps {
    placeholder: string
    onOnClick?: Function
}

const SolidDialogButton = ({placeholder, onOnClick, ...rest}: DialogButtonProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {

    const {t} = useTranslation()

    return (
        <button id='dialog-button' type='submit' onClick={() => onOnClick ? onOnClick() : undefined} {...rest}>
            <span className='fs-qi-1 fw--semi-bold clr-nl-3'>{t(placeholder)}</span>
        </button>
    )
}

export default memo(SolidDialogButton)
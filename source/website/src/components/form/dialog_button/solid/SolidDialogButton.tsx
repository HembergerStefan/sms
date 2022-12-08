import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import './SolidDialogButton.css'

interface DialogButtonProps {
    placeholder: string
}

const SolidDialogButton = ({placeholder}: DialogButtonProps) => {

    const {t} = useTranslation()

    return (
        <button id='dialog-button' type='submit'>
            <span className='fs-qi-1 fw--semi-bold clr-nl-3'>{t(placeholder)}</span>
        </button>
    )
}

export default memo(SolidDialogButton)
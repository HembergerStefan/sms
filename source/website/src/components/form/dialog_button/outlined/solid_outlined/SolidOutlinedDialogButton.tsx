import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import './SolidOutlinedDialogButton.css'

interface DialogButtonProps {
    placeholder: string
}

const SolidOutlinedDialogButton = ({placeholder}: DialogButtonProps) => {

    const {t} = useTranslation()


    return (
        <button id='solid-outlined'>
            <span className='fs-qi-1 fw--semi-bold clr-nl-3'>{t(placeholder)}</span>
        </button>
    )
}

export default memo(SolidOutlinedDialogButton)
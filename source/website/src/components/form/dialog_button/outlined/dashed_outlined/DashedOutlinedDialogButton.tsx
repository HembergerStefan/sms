import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import useScriptStore from '../../../../../store/scriptInformationStore'

import './DashedOutlinedDialogButton.css'

interface DialogButtonProps {
    placeholder: string
}

const DashedOutlinedDialogButton = ({placeholder}: DialogButtonProps) => {

    const {t} = useTranslation()

    const {removeScript} = useScriptStore()

    return (
        <button id='dashed-outlined' type='button' onClick={() => removeScript(10)}>
            <span className='fs-qi-1 fw--semi-bold clr-nl-3'>{t(placeholder)}</span>
        </button>
    )
}

export default memo(DashedOutlinedDialogButton)
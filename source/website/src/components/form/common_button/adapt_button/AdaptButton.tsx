import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import './AdaptButton.css'

interface AdaptButtonProps {
    placeholder: string
    onOnClick?: Function
}

const AdaptButton = ({placeholder, onOnClick}: AdaptButtonProps) => {

    const {t} = useTranslation()

    return (
        <button id='adapt-button' type='submit' onClick={() => onOnClick ? onOnClick() : undefined}>
            <span className='fs-tr-body-1 fw--semi-bold clr-nl-3'>{t(placeholder)}</span>
        </button>
    )
}

export default memo(AdaptButton)
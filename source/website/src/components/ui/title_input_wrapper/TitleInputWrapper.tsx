import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import './TitleInputWrapper.css'

interface TitleInputWrapperProps {
    title: string
    content: React.ReactNode
}

const TitleInputWrapper = ({title, content}: TitleInputWrapperProps) => {

    const {t} = useTranslation()

    return (
        <section id='title-content--wrapper'>
            <h2 className='fs-qi-1 fw--semi-bold clr-pr-1'>{t(title)}</h2>
            {content}
        </section>
    )
}

export default memo(TitleInputWrapper)
import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import KebabMenu from '../../form/menu/kebab_menu/KebabMenuButton'

import './BoxHeading.css'

interface BoxHeadingProps {
    heading: string
}

const BoxHeading = ({heading}: BoxHeadingProps) => {

    const {t} = useTranslation()

    return (
        <header id='header-menu--wrapper'>
            <span className='fs-qi-1 fw--semi-bold'>{t(heading)}</span>
            <KebabMenu size='var(--icon-size-medium)'/>
        </header>
    )
}

export default memo(BoxHeading)
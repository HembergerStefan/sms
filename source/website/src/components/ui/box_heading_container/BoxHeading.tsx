import React, {memo} from 'react'

import KebabMenu from '../../form/menu/kebab_menu/KebabMenuButton'

import './BoxHeading.css'

interface BoxHeadingProps {
    content: React.ReactNode
}

const BoxHeading = ({content}: BoxHeadingProps) => {

    return (
        <header id='header-menu--wrapper'>
            {content}
            <KebabMenu size='var(--icon-size-medium)'/>
        </header>
    )
}

export default memo(BoxHeading)
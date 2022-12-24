import React, {memo} from 'react'

import KebabMenu from '../../form/menu/kebab_menu/KebabMenuButton'

import './BoxHeading.css'

interface BoxHeadingProps {
    content: React.ReactNode
    dropdownContent: React.ReactNode
    mountDropdown: boolean
    setMountDropdown: Function
}

const BoxHeading = ({content, dropdownContent, mountDropdown, setMountDropdown}: BoxHeadingProps) => {

    return (
        <header id='header-menu--wrapper'>
            {content}
            <KebabMenu size='var(--icon-size-medium)' dropdownContent={dropdownContent} mountDropdown={mountDropdown}
                       setMountDropdown={setMountDropdown}/>
        </header>
    )
}

export default memo(BoxHeading)
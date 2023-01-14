import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import DropdownContent from '../../dropdown/DropdownContent'

import useHover from '../../../../hooks/useHover'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'

import TooltipManager from '../../../ui/tooltip/TooltipManager'

import './KebabMenuButton.css'

interface KebabMenuProps {
    size: string
    dropdownContent: React.ReactNode
    mountDropdown: boolean
    setMountDropdown: Function
}

const KebabMenuButton = ({size, dropdownContent, mountDropdown, setMountDropdown}: KebabMenuProps) => {

    const {t} = useTranslation()

    const [hoverRef, isHovered] = useHover()

    /* Always hide the component when clicking outside the component */
    const [outClickRef] = useOnClickOutside(() => mountDropdown ? setMountDropdown(false) : null)

    return (
        <section id='kebab-container' ref={outClickRef}>
            <div ref={hoverRef} id='kebab-menu--container' className='clr-pr-1 md-menu'
                 onClick={() => setMountDropdown(() => !mountDropdown)}>
                <MoreVertRoundedIcon style={{fontSize: size}}/>
            </div>

            <DropdownContent mount={mountDropdown} dropdownContent={dropdownContent} style={{maxHeight: 'unset'}}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{t('Settings')}</span>}/> : null
            }
        </section>
    )
}

export default memo(KebabMenuButton)
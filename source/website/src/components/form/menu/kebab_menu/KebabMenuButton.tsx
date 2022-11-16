import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'

import useHover from '../../../../hooks/useHover'

import TooltipManager from '../../../ui/tooltip/TooltipManager'

import './KebabMenuButton.css'

interface KebabMenuProps {
    size: string
}

const KebabMenuButton = ({size}: KebabMenuProps) => {

    const {t} = useTranslation()

    const [hoverRef, isHovered] = useHover()

    return (
        <>
            <div ref={hoverRef} id='kebab-menu--container' className='clr-pr-1 md-menu' onClick={() => alert('menu opened')}>
                <MoreVertRoundedIcon style={{fontSize: size}}/>
            </div>

            {
                (isHovered) ? <TooltipManager
                    content={<span>{t('Settings')}</span>}/> : null
            }
        </>
    )
}

export default memo(KebabMenuButton)
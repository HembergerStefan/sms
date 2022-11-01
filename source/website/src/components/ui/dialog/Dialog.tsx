import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import useHover from '../../../hooks/useHover'

import TooltipManager from '../tooltip/TooltipManager'
import KebabMenu from '../../form/menu/kebab_menu/KebabMenuButton'

import './Dialog.css'
import CloseButton from "../../form/menu/close/CloseButton";

interface DialogProps {
    title: string
    unmountComponent: Function
    body: React.ReactNode
    footer?: React.ReactNode
}

const Dialog = ({title, unmountComponent, body, footer}: DialogProps) => {

    const {t} = useTranslation();

    const [shake, setShake] = useState('')
    const [hoverRef, isHovered] = useHover()

    return (
        <>
            <div className='blocking-container' onMouseDown={() => {
                setShake(() => 'shake')

                setTimeout(() => {
                    if (shake === '') {
                        setShake(() => '')
                    }
                }, 720)
            }}>
                <div id='dialog-container' className={shake} onMouseDown={event => event.stopPropagation()}>
                    <h1 className='fs-tr-1 fw--semi-bold'>{title}</h1>
                    <div id='dialog-menu-container'>
                        <div ref={hoverRef} id='more-vert-icon-container'>
                            <KebabMenu size='var(--icon-size-medium)'/>
                        </div>

                        <CloseButton size='28px' closeCallback={unmountComponent}/>
                    </div>

                    {body}

                    <div id='dialog-footer-container'>
                        {footer}
                    </div>
                </div>
            </div>

            {
                (isHovered) ? <TooltipManager
                    content={<span>{t('Settings')}</span>}/> : null
            }
        </>
    )
}

export default Dialog
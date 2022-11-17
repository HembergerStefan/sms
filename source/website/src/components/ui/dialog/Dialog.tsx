import React, {useState} from 'react'

import KebabMenu from '../../form/menu/kebab_menu/KebabMenuButton'
import CloseButton from '../../form/menu/close/CloseButton'

import './Dialog.css'

interface DialogProps {
    title: string
    unmountComponent: Function
    body: React.ReactNode
    footer?: React.ReactNode
}

const Dialog = ({title, unmountComponent, body, footer}: DialogProps) => {

    const [shake, setShake] = useState<boolean>(false)

    return (
        <div className='blocking-container' onMouseDown={() => {
            setShake(() => true)

            setTimeout(() => {
                if (!shake) {
                    setShake(() => false)
                }
            }, 720)
        }}>
            <div id='dialog-container' className={shake ? 'shake' : ''} onMouseDown={event => event.stopPropagation()}>
                <h1 className='fs-tr-1 fw--semi-bold'>{title}</h1>
                <div id='dialog-menu-container'>
                    <KebabMenu size='var(--icon-size-medium)'/>
                    <CloseButton size='28px' closeCallback={unmountComponent}/>
                </div>

                {body}

                <div id='dialog-footer-container'>
                    {footer}
                </div>
            </div>
        </div>
    )
}

export default Dialog
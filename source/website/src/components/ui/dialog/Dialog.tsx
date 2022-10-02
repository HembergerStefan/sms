import React, {useEffect, useState} from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import './Dialog.css'

interface DialogProps {
    title: string
    unmountComponent: Function
    body: React.ReactNode;
    footer?: React.ReactNode;
}

const Dialog = ({title, unmountComponent, body, footer}: DialogProps) => {

    const [shake, setShake] = useState('')

    useEffect(() => {
        const updateComponentMounting = (ev: { key: string; }) => {
            if (ev.key === 'Escape') {
                unmountComponent()
            }
        };

        document.addEventListener('keydown', updateComponentMounting)

        return () => {
            window.removeEventListener('keydown', updateComponentMounting);
        }
    }, [])

    return (
        <div className='blocking-container' onClick={() => {
            setShake('shake')

            setTimeout(() => {
                if (shake === '') {
                    setShake('')
                }
            }, 720)
        }}>
            <div id='dialog-container' className={shake} onClick={event => event.stopPropagation()}>
                <span className='fs-tr-1 fw--semi-bold'>{title}</span>
                <div id='dialog-menu-container'>
                    <div id='more-vert-icon-container'>
                        <MoreVertRoundedIcon id='more-vert-icon'/>
                    </div>

                    <div id='close-icon-container' onClick={() => unmountComponent()}>
                        <CloseRoundedIcon id='close-icon'/>
                    </div>
                </div>

                {body}

                <div id='dialog-footer-container'>
                    {footer}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
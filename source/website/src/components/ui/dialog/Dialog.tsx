import React, {useEffect, useState} from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import './Dialog.css'

interface DialogProps {
    title: string
    unmountComponent: Function
    body: React.ReactNode;
    footer: React.ReactNode;
}

const Dialog = ({title, unmountComponent, body, footer}: DialogProps) => {

    const [closeButtonColor, setCloseButtonColor] = useState('')

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                unmountComponent()
            }
        });
    }, [])

    return (
        <div className='blocking-container'>
            <div id='dialog-container'>
                <span className='fs-tr-1 fw--semi-bold'>{title}</span>
                <div id='dialog-menu-container'>
                    <div>
                        <MoreVertRoundedIcon/>
                    </div>

                    <div onClick={() => unmountComponent()}
                         onMouseOver={() => setCloseButtonColor('var(--ac-clr-2)')}
                         onMouseLeave={() => setCloseButtonColor('var(--nl-clr-4)')}>
                        <CloseRoundedIcon style={{fontSize: '28px', color: closeButtonColor}}/>
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
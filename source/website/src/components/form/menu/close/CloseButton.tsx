import React, {useEffect, memo} from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import './CloseButton.css'

interface CloseButtonProps {
    size: string
    closeCallback: Function
}

const CloseButton = ({size, closeCallback}: CloseButtonProps) => {

    useEffect(() => {
        const updateComponentMounting = (ev: { key: string; }) => {
            if (ev.key === 'Escape') {
                closeCallback()
            }
        }

        document.addEventListener('keydown', updateComponentMounting)

        return () => {
            window.removeEventListener('keydown', updateComponentMounting)
        }
    }, [])

    return (
        <div id='close-button--container' className='clr-pr-1 md-menu' onClick={() => closeCallback()}>
            <CloseRoundedIcon style={{fontSize: size}}/>
        </div>
    )
}

export default memo(CloseButton)
import React, {memo} from 'react'

import './SolidDialogButton.css'

interface DialogButtonProps {
    placeholder: string
}

const SolidDialogButton = ({placeholder}: DialogButtonProps) => {

    return (
        <button id='dialog-button' onClick={() => alert('saving feature currently not implemented')}>
            <span className='fs-qi-1 fw--semi-bold clr-nl-3'>{placeholder}</span></button>
    )
}

export default memo(SolidDialogButton)
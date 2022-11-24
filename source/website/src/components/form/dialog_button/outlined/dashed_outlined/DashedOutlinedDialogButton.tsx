import React, {memo} from 'react'

import './DashedOutlinedDialogButton.css'

interface DialogButtonProps {
    placeholder: string
}

const DashedOutlinedDialogButton = ({placeholder}: DialogButtonProps) => {

    return (
        <button id='dashed-outlined' onClick={() => alert('saving feature currently not implemented')}>
            <span className='fs-qi-1 fw--semi-bold clr-nl-3'>{placeholder}</span>
        </button>
    )
}

export default memo(DashedOutlinedDialogButton)
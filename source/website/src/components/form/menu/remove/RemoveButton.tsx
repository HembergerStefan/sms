import React, {memo} from 'react'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import './RemoveButton.css'

interface RemoveButtonProps {
    handleRemove: Function
}

const RemoveButton = ({handleRemove}: RemoveButtonProps) => {

    return (
        <div id='remove--container' className='clr-ac-1 md-menu' onClick={() => handleRemove()}>
            <DeleteRoundedIcon/>
        </div>
    )
}

export default memo(RemoveButton)
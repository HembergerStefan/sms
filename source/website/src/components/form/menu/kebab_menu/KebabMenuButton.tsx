import React from 'react'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'

import './KebabMenuButton.css'

interface KebabMenuProps {
    size: string
}

const KebabMenuButton = ({size}: KebabMenuProps) => {

    return (
        <div id='kebab-menu--container' className='clr-pr-1 md-menu' onClick={() => alert('menu opened')}>
            <MoreVertRoundedIcon style={{fontSize: size}}/>
        </div>
    )
}

export default KebabMenuButton
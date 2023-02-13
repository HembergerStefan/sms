import React, {memo} from 'react'

import './Chip.css'

interface ChipProps {
    value: string
}

const Chip = ({value}: ChipProps) => {

    return (
        <span id='chip' className='fs-tr-body-1 fw--semi-bold'># {value}</span>
    )
}

export default memo(Chip)
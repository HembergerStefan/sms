import React, {HTMLProps, memo, useEffect, useState} from 'react'

import './Numbering.css'

interface NumberingProps {
    value: number
    fixedColor?: boolean
}

const Numbering = ({value, fixedColor, ...props}: NumberingProps & HTMLProps<HTMLSpanElement>) => {

    const [colorPack, setColorPack] = useState<number>(1)

    useEffect(() => {
        if (fixedColor !== null && !fixedColor) {
            // green
            if (value % 3 === 0) {
                setColorPack(() => 3)
            } else if (value % 2 === 0) {
                // by default
                setColorPack(() => 1)
            } else {
                // red
                setColorPack(() => 2)
            }
        }
    }, [])

    return (
        <span id='numbering-container' className={`clr-pk-${colorPack}`} {...props}>{value}</span>
    )
}

export default memo(Numbering)
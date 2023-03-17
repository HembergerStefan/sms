import React, {createElement, HTMLProps, memo, useEffect, useState} from 'react'

import '../Numbering.css'

interface IconingProps {
    value: number
    icon: any
    fixedColor?: boolean
}

const Iconing = ({value, icon, fixedColor, ...props}: IconingProps & HTMLProps<HTMLSpanElement>) => {

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
        <span id='numbering-container' className={`clr-pk-${colorPack}`} {...props}>
            {
                /* Create the mui svg component */
                createElement<any>(icon)
            }
        </span>
    )
}

export default memo(Iconing)
import React, {useEffect, useRef} from 'react'

import useMousePosition from '../../../hooks/useMousePosition'
import './Tooltip.css'

interface TooltipProps {
    content: React.ReactNode
}

const Tooltip = ({content}: TooltipProps) => {

    const mousePosition = useMousePosition()

    const tooltipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (tooltipRef.current !== null) {
            let offsetX = tooltipRef.current.offsetWidth / 2
            let offsetY = tooltipRef.current.offsetHeight + 20

            tooltipRef.current.classList.remove('tooltip-left')
            tooltipRef.current.classList.remove('tooltip-bottom')
            tooltipRef.current.classList.add('tooltip-top')

            /* Side Positioning */
            if (mousePosition.x! < 65) {
                offsetX = -35
                offsetY = tooltipRef.current.offsetHeight / 2

                tooltipRef.current.classList.remove('tooltip-top')
                tooltipRef.current.classList.remove('tooltip-bottom')
                tooltipRef.current.classList.add('tooltip-left')
            }

            /* Nav Positioning */
            if (mousePosition.y! < 60) {
                offsetX = tooltipRef.current.offsetWidth / 2
                offsetY = -35

                tooltipRef.current.classList.remove('tooltip-top')
                tooltipRef.current.classList.remove('tooltip-left')
                tooltipRef.current.classList.add('tooltip-bottom')
            }

            tooltipRef.current.setAttribute('style', `top: ${mousePosition.y! - offsetY}px; left: ${mousePosition.x! - offsetX}px`);
        }
    }, [mousePosition])

    return (
        <div ref={tooltipRef} id='tooltip-container'>
            {content}
        </div>
    )
}

export default Tooltip
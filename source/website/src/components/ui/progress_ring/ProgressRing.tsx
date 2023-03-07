import React, {memo, useEffect, useRef} from 'react'

import './ProgressRing.css'

interface ProgressRingProps {
    value: number
}

const ProgressRing = ({value}: ProgressRingProps) => {

    const progressCircleRef = useRef<SVGCircleElement>(null)
    const progressTextRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (progressCircleRef.current !== null) {
            progressCircleRef.current.style.strokeDashoffset = String(440 - (440 * value / 100))

            if (value <= 50) {
                progressCircleRef.current.style.stroke = 'var(--ac-clr-3)'

                if (progressTextRef.current !== null) {
                    progressTextRef.current.style.color = 'var(--ac-clr-3)'
                }
            }
        }
    }, [value])

    return (
        <div className='progress'>
            {/* Progress Circle */}
            <svg width='100%' height='100%' viewBox='0 0 155 155'>
                <circle cx='80' cy='80' r='70'></circle>
                <circle ref={progressCircleRef} cx='80' cy='80' r='70'></circle>
            </svg>
            <div className='number'>
                <h2 className='fs-tr-1'>{value}<span ref={progressTextRef} className='fs-pr-body-1 clr-pr-1'>%</span></h2>
            </div>
        </div>
    )
}

export default memo(ProgressRing)
import React, {useEffect, useRef, useState, memo} from 'react'

import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded'
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded'

import './FullSizeButton.css'

interface FullSizeProps {
    containerRef: any
    size: string
}

const FullSizeButton = ({containerRef, size}: FullSizeProps) => {

    const fullSizeContainerRef = useRef<HTMLDivElement>(null)
    const [fullSize, setFullSize] = useState<boolean>(false)

    useEffect(() => {
        toggleFullSize()
    }, [fullSize])

    const toggleFullSize = (): void => {
        if (fullSizeContainerRef.current !== null) {
            fullSizeContainerRef.current.classList.toggle('active--full-size')
        }

        if (containerRef !== null) {
            containerRef.current.classList.toggle('active--full-size--ref-container')
        }
    }

    return (
        <div ref={fullSizeContainerRef} id='full-size--container' className='clr-pr-1 md-menu'
             onClick={() => setFullSize(prev => !prev)}>
            {
                fullSize ? <CloseFullscreenRoundedIcon style={{fontSize: size}}/> :
                    <OpenInFullRoundedIcon style={{fontSize: size}}/>
            }
        </div>
    )
}

export default memo(FullSizeButton)
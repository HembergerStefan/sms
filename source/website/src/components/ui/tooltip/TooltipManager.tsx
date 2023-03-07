import React from 'react'
import ReactDOM from 'react-dom'

import Tooltip from './Tooltip'

interface TooltipManagerProps {
    content: React.ReactNode
}

const TooltipManager = ({content}: TooltipManagerProps) => {

    return (
        <>
            {
                ReactDOM.createPortal(
                    <Tooltip content={content}/>,
                    document.querySelector('#layout-container')!)
            }
        </>
    )
}

export default TooltipManager
import React, {memo} from 'react'

import './StatusDisplaying.css'

interface StatusDisplayingProps {
    status: string
    success: boolean
}

const StatusDisplaying = ({status, success}: StatusDisplayingProps) => {

    return (
        <span id='table--status-displaying' className={success ? 'status-success' : 'status-fail'}>{status}</span>
    )
}

export default memo(StatusDisplaying)
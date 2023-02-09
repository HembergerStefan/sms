import React from 'react'

import './TaskButton.css'

interface TaskButtonProps {
    task: Function
    taskName: string
}

const TaskButton = ({task, taskName}: TaskButtonProps) => {

    const handleTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        task()
    }

    return (
        <button id='task-button' className='md-menu' onClick={handleTask}>
            <span className='clr-nl-3 fs-sc-body-1 fw--semi-bold'>{taskName}</span>
        </button>
    )
}

export default TaskButton
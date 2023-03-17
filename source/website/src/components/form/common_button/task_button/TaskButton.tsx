import React from 'react'

import {useTranslation} from 'react-i18next'

import './TaskButton.css'

interface TaskButtonProps {
    task: Function
    taskName: string
    icon?: React.ReactNode
}

const TaskButton = ({task, taskName, icon}: TaskButtonProps) => {

    const {t} = useTranslation()

    const handleTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        task()
    }

    return (
        <button id='task-button' className='md-menu' onClick={handleTask}>
            {icon ?? null}
            <span className='clr-nl-3 fs-sc-body-1 fw--semi-bold'>{t(taskName)}</span>
        </button>
    )
}

export default TaskButton
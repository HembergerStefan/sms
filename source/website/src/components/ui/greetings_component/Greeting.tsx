import React, {memo, useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useUserStore from '../../../stores/user_session/userStore'

const Greeting = () => {

    const {t} = useTranslation()

    const {username} = useUserStore()

    const [welcomeMessage, setWelcomeMessage] = useState({
        title: 'Good Morning',
        subTitle: 'Have you had a good start to the day?'
    })

    const hours: number = new Date().getHours()

    useEffect((): void => {
        getMessageToTime(hours)
    }, [hours])

    const getMessageToTime = (hours: number) => {
        if (hours >= 11 && hours <= 12) {
            setWelcomeMessage({title: 'Good Noon', subTitle: 'Get some brake.'})
        } else if (hours > 12 && hours <= 18) {
            setWelcomeMessage({title: 'Good Afternoon', subTitle: 'Did you finish of some tasks?'})
        } else if (hours > 18) {
            setWelcomeMessage({title: 'Good Evening', subTitle: 'Have a restful night.'})
        }
    }

    return (
        <div>
            <h1 className='fs-pr-1 fw--semi-bold'>{t(welcomeMessage.title)}, {username}!</h1>
            <span className='fs-pr-body-1 fw-regula'>{t(welcomeMessage.subTitle)}</span>
        </div>
    )
}

export default memo(Greeting)
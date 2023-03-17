import React, {memo, useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'
import {useMutation} from 'react-query'
import axios from 'axios'

import {ApiConfig} from '../../../../data/api_data/ApiConfig'
import useUserStore from '../../../../stores/user_session/userStore'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'

import Separator from '../separator/Separator'

const LoginInteraction = () => {

    const {t} = useTranslation()

    const {setUserId, setUsername, setUserToken} = useUserStore()

    const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false)
    const [loginData, setLoginData] = useState<{ username: string, password: string }>({username: '', password: ''})

    const {data, mutate, isSuccess, isLoading} = useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpage/login`, {
            'name': loginData.username,
            'password': loginData.password
        })
    })

    useEffect(() => {
        if (isSuccess) {
            setUsername(loginData.username)
            setUserToken(data.data.token)
            setUserId(data.data.user_ID)
        }
    }, [data])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate()
    }

    return (
        <div id='interactive-container'>
            <span className='clr-pr-1 fw--semi-bold fs-qi-1'>Get back to the Adventure</span>

            <form id='login-form' onSubmit={handleSubmit}>
                <div id='username-container' className='md-input'>
                    <input type='text' name='username' placeholder={t('Username')}
                           autoFocus={true} autoComplete='off' className='input-container username-input-icon'
                           tabIndex={1}
                           onChange={(e) => {
                               setLoginData((prevState) => (
                                   ({...prevState, username: e.target.value})
                               ))
                           }}
                    />
                    <div>
                        <PersonRoundedIcon fontSize='small'/>
                    </div>
                </div>

                <div id='password-container' className='md-input'>
                    <input type={isRevealPwd ? 'text' : 'password'} name='password'
                           placeholder={t('Password')} autoComplete='off'
                           className='input-container password-input-icon'
                           tabIndex={2}
                           onChange={(e) => {
                               setLoginData((prevState) => (
                                   ({...prevState, password: e.target.value})
                               ))
                           }}
                    />
                    <div onClick={() => setIsRevealPwd(prevState => !prevState)}>
                        {
                            isRevealPwd ? <LockOpenRoundedIcon fontSize='small'/> :
                                <LockRoundedIcon fontSize='small'/>
                        }
                    </div>
                </div>

                <button id='submit-button' className='md-menu' type='submit' tabIndex={3} disabled={isLoading}>
                    <span className='clr-nl-3 fw--semi-bold'>{t('Login')}</span>
                </button>
            </form>

            <Separator/>

            <span className='clr-pr-1 fw--semi-bold fs-tr-body-1'>{t('Don’t have an account')}? <span
                className='fw-regular fs-tr-body-1'>{t('Ask your Admin to create one for you')}.</span></span>
        </div>
    )
}

export default memo(LoginInteraction)
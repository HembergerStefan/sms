import React, {memo, useRef, useState} from 'react'

import {useTranslation} from 'react-i18next'

import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded"
import LockRoundedIcon from "@mui/icons-material/LockRounded"

import Separator from '../separator/Separator'

interface LoginInteractionProps {
    setLoginPage: Function
}

const LoginInteraction = ({setLoginPage}: LoginInteractionProps) => {

    const {t} = useTranslation()

    const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (usernameRef.current !== null && passwordRef.current !== null) {
            if (usernameRef.current.value === 'admin' && passwordRef.current.value === 'admin') {
                window.location.href = '/dashboard'
            }
        }
    }

    return (
        <div id='interactive-container'>
            <span className='clr-pr-1 fw--semi-bold fs-qi-1'>Get back to the Adventure</span>

            <form id='login-form' onSubmit={handleSubmit}>
                <div id='username-container' className='md-input'>
                    <input ref={usernameRef} type='text' name='username' placeholder={t('Username')}
                           autoFocus={true} autoComplete='off' className='input-container username-input-icon'
                           onChange={e => {
                               /* TODO: IMPLEMENT */
                           }} tabIndex={1}/>

                    <div>
                        <PersonRoundedIcon fontSize='small'/>
                    </div>
                </div>

                <div id='password-container' className='md-input'>
                    <input ref={passwordRef} type={isRevealPwd ? 'text' : 'password'} name='password'
                           placeholder={t('Password')} autoComplete='off'
                           className='input-container password-input-icon'
                           onChange={e => {
                               /* TODO: IMPLEMENT */
                           }}
                           tabIndex={2}/>

                    <div onClick={() => setIsRevealPwd(prevState => !prevState)}>
                        {
                            isRevealPwd ? <LockOpenRoundedIcon fontSize='small'/> :
                                <LockRoundedIcon fontSize='small'/>
                        }
                    </div>
                </div>

                <button id='submit-button' className='md-menu' type='submit' tabIndex={3}>
                    <span className='clr-nl-3 fw--semi-bold'>{t('Login')}</span>
                </button>
            </form>

            <Separator/>

            <span className='clr-pr-1 fw-regular fs-tr-body-1'>Don’t have an account? <a
                className='fw--semi-bold fs-tr-body-1 anchor-d-clr'
                onClick={() => setLoginPage(false)}
                style={{cursor: 'pointer'}}>Click here</a></span>
        </div>
    )
}

export default memo(LoginInteraction)
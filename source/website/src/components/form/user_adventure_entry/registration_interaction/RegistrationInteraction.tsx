import React, {memo, useState} from 'react'

import {useTranslation} from "react-i18next"

import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded"
import LockRoundedIcon from "@mui/icons-material/LockRounded"

const RegistrationInteraction = () => {

    const {t} = useTranslation()

    const [isRevealPwd, setIsRevealPwd] = useState<boolean>(false)

    return (
        <div id='interactive-container'>
            <span className='clr-pr-1 fw--semi-bold fs-qi-1'>Start the Adventure</span>

            <form id='login-form'>
                <div id='username-container' className='md-input'>
                    <input type='text' name='username' placeholder={t('Username')}
                           autoFocus={true} autoComplete='off' className='input-container username-input-icon'
                           onChange={e => {
                               /* TODO: IMPLEMENT */
                           }} tabIndex={1}/>

                    <div>
                        <PersonRoundedIcon fontSize='small'/>
                    </div>
                </div>

                <div id='password-container' className='md-input'>
                    <input type={isRevealPwd ? 'text' : 'password'} name='password'
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
                    <span className='clr-nl-3 fw--semi-bold'>{t('Create Account')}</span>
                </button>
            </form>
        </div>
    )
}

export default memo(RegistrationInteraction)
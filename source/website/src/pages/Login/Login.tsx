import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import Image from '../../data/images/login.jpg'

import LoginInteraction from '../../components/form/user_adventure_entry/login_interaction/LoginInteraction'
import RegistrationInteraction from '../../components/form/user_adventure_entry/registration_interaction/RegistrationInteraction'

import './Login.css'

const Login = () => {

    const {t} = useTranslation()

    const [loginPage, setLoginPage] = useState<boolean>(true)

    return (
        <section id='login--content-container'>
            <div id='media-container'>
                <div>
                    <h1 className='fw--extra-bold fs-sc-1'>Welcome to Systems Management Server!</h1>
                    <span className='clr-pr-1 fs-qr-1'>... the place where you <br/> can manage all of your <br/> devices</span>
                    <span className='clr-pr-1 fw-regular fs-qi-body-1'>Login or Create an Account to continue!</span>
                </div>

                <img id='login-image' src={Image} alt='login' loading='lazy'/>
            </div>

            {
                loginPage ? <LoginInteraction setLoginPage={setLoginPage}/> : <RegistrationInteraction/>
            }
        </section>
    )
}

export default Login
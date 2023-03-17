import React from 'react'

import Image from '../../data/images/login.jpg'

import LoginInteraction from '../../components/form/user_adventure_entry/login_interaction/LoginInteraction'

import './Login.css'

const Login = () => {

    return (
        <section id='login--content-container'>
            <div id='media-container'>
                <div>
                    <h1 className='fw--extra-bold fs-sc-1'>Welcome to Systems Management Server!</h1>
                    <span className='clr-pr-1 fs-qr-1'>... the place where you <br/> can manage all of your <br/> devices</span>
                    <span className='clr-pr-1 fw-regular fs-qi-body-1'>Login or Create an Account to continue</span>
                </div>

                <img id='login-image' src={Image} alt='login' loading='eager'/>
            </div>

            <LoginInteraction/>
        </section>
    )
}

export default Login
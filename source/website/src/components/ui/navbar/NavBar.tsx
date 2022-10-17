import React, {useEffect, useState} from 'react'

import logo from '../../../data/images/project_logo.png'

import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'

import useResize from '../../../hooks/useResize'

import LngDropdown from '../../form/language_dropdown/LngDropdown'

import './NavBar.css'

const NavBar = () => {

    const [productName, setProductName] = useState('Systems Management Server')
    const [userName, setUserName] = useState('Håkon Wium Lie')
    const windowSize = useResize()

    useEffect(() => {
        if (windowSize.width <= 842) {
            setProductName('SMS')
        } else {
            setProductName('Systems Management Server')
        }
    }, [windowSize])

    return (
        <nav id='nav-container'>
            <div id='nav-logo-container'>
                <img id='nav-logo' src={logo} alt='logo'/>
                <h1 className='fs-qr-1 fw--semi-bold'>{productName}</h1>
            </div>

            <div>
                <div id='nav-interaction-container'>
                    <div id='nav-notification-bell' className='clr-pr-1'>
                        <NotificationsNoneRoundedIcon style={{fontSize: 'min(33px, 2vw)'}}/>
                        <span/>
                    </div>

                    <LngDropdown/>
                </div>

                <div id='nav-profile-container'>
                    <h1 className='fw--semi-bold'>{userName}</h1>
                    <span/>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
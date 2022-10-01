import React, {useEffect, useState} from 'react';
import logo from '../../../data/images/project_logo.png'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LngDropdown from '../../form/language_dropdown/LngDropdown';
import './NavBar.css'

const NavBar = () => {

    const [productName, setProductName] = useState('Systems Management Server')
    const [userName, setUserName] = useState('Håkon Wium Lie')

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 842) {
                setProductName('SMS')
            } else {
                setProductName('Systems Management Server')
            }
        })
    }, [])

    return (
        <nav id='nav-container'>
            <div id='nav-logo-container'>
                <img id='nav-logo' src={logo} alt='logo'/>
                <span className='fs-qr-1 fw--semi-bold'>{productName}</span>
            </div>

            <div>
                <div id='nav-interaction-container'>
                    <div id='nav-notification-bell' className='clr-pr-1'>
                        <NotificationsNoneRoundedIcon style={{fontSize: '28px'}}/>
                        <span/>
                    </div>

                    <LngDropdown/>
                </div>

                <div id='nav-profile-container'>
                    <span className='fw--semi-bold'>{userName}</span>
                    <span/>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
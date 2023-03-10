import React, {useEffect, useState, memo} from 'react'

import logo from '../../../data/images/project_logo.png'
import logoWhite from '../../../data/images/project_logo_white.png'

import useUserStore from '../../../stores/user_session/userStore'
import useWebsiteStore from '../../../stores/website/websiteStore'

import {useGetUserRoleQuery} from '../../../utils/api/ApiService'

import useResize from '../../../hooks/useResize'

import LngDropdown from '../../form/language_dropdown/LngDropdown'

import './NavBar.css'

const NavBar = () => {

    const {interfaceStyle} = useWebsiteStore()
    const {username, roleName, setUserRole, setUserRoleName} = useUserStore()

    const [productName, setProductName] = useState<string>('Systems Management Server')

    const windowSize = useResize()

    const userRoleGetQuery = useGetUserRoleQuery()

    useEffect(() => {
        if (windowSize.width <= 842) {
            setProductName('SMS')
        } else {
            setProductName('Systems Management Server')
        }
    }, [windowSize])

    useEffect(() => {
        if (userRoleGetQuery.isSuccess) {
            setUserRole(userRoleGetQuery.data.id)
            setUserRoleName(userRoleGetQuery.data.name)
        }
    }, [userRoleGetQuery.data])

    return (
        <nav id='nav-container'>
            <div id='nav-logo-container'>
                {
                    interfaceStyle === 'moderna-light' ? <img id='nav-logo' src={logo} alt='logo'/> : <img id='nav-logo' src={logoWhite} alt='logo'/>
                }
                <h1 className='fs-qr-1 fw--semi-bold'>{productName}</h1>
            </div>

            <div>
                <div id='nav-interaction-container'>
                    <LngDropdown/>
                </div>

                <div id='nav-profile-container'>
                    <span/>
                    <div>
                        <h1 className='fw--extra-bold'>{username}</h1>
                        <h1 className='fw--semi-bold'>{roleName}</h1>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default memo(NavBar)
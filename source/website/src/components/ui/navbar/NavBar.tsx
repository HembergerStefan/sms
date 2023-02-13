import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'

import logo from '../../../data/images/project_logo.png'

import {ApiConfig} from '../../../data/api_data/ApiConfig'
import useUserStore from '../../../stores/user_session/userStore'
import useRoleStore from '../../../stores/role/roleInformationStore'

import useResize from '../../../hooks/useResize'

import LngDropdown from '../../form/language_dropdown/LngDropdown'

import './NavBar.css'

const NavBar = () => {

    const {id, username, token, roleId, setUserRole} = useUserStore()
    const {getRoleById} = useRoleStore()

    const [productName, setProductName] = useState('Systems Management Server')
    const windowSize = useResize()

    const {data, isSuccess} = useQuery(['users'], () =>
        axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/users/${token}`)
            .then((res) => res.data)
    )

    useEffect(() => {
        if (windowSize.width <= 842) {
            setProductName('SMS')
        } else {
            setProductName('Systems Management Server')
        }
    }, [windowSize])

    useEffect(() => {
        if (isSuccess) {
            data.forEach((entry: { id: string; role: { name: string } }) => {
                if (entry.id === id) {
                    setUserRole(entry.role.name)
                }
            })
        }
    }, [data])

    return (
        <nav id='nav-container'>
            <div id='nav-logo-container'>
                <img id='nav-logo' src={logo} alt='logo'/>
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
                        <h1 className='fw--semi-bold'>{getRoleById(roleId).name}</h1>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
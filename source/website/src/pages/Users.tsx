import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

import useUserInfoStore from '../stores/user/userInformationStore'
import {DataTypes} from '../data/data_types'

import {useUserPermittedQuery} from '../utils/api/ApiService'

import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import BasicTable from '../components/ui/table/basic_table/BasicTable'
import TaskButton from '../components/form/common_button/task_button/TaskButton'
import DialogManager from '../components/ui/dialog/DialogManager'

import './Layout.css'

const Users = () => {

    const {t} = useTranslation()

    const {users} = useUserInfoStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    return (
        <section id='dashboard-layout--container'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h1 className='fs-tr-1 fw--semi-bold'>{t('Users')}</h1>
                {
                    userPermitted ? <TaskButton task={() => {
                        setRenderDialogComponent(() => true)
                    }} taskName='Add User' icon={<AddRoundedIcon/>}/> : null
                }
            </div>

            <div id='kpi-wrapper'>
                <KPIComponent title='Amount of Users' value={users.length} icon={<PersonRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
            </div>

            <BasicTable tableType={DataTypes.USER}/>

            <DialogManager dialogTyp={DataTypes.USER}
                           title='Add User' editMode={false}
                           displayId={users.length + 1}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </section>
    )
}

export default Users
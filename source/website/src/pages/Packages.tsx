import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AppsRoundedIcon from '@mui/icons-material/AppsRounded'

import usePackageStore from '../stores/package/packageInformationStore'
import {DataTypes} from '../data/data_types'

import {useUserPermittedQuery} from '../utils/api/ApiService'

import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import BasicTable from '../components/ui/table/basic_table/BasicTable'
import TaskButton from '../components/form/common_button/task_button/TaskButton'
import DialogManager from '../components/ui/dialog/DialogManager'

import './Layout.css'

const Clients = () => {

    const {t} = useTranslation()

    const {_packages} = usePackageStore()

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
                <h1 className='fs-tr-1 fw--semi-bold'>{t('Packages')}</h1>
                {
                    userPermitted ? <TaskButton task={() => {
                        setRenderDialogComponent(() => true)
                    }} taskName='Add Package' icon={<AddRoundedIcon/>}/> : null
                }
            </div>

            <div id='kpi-wrapper'>
                <KPIComponent title='Amount of Packages' value={_packages.length} icon={<AppsRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
            </div>

            <BasicTable tableType={DataTypes.PACKAGE}/>

            <DialogManager dialogTyp={DataTypes.PACKAGE}
                           title='Add Package' editMode={false}
                           displayId={_packages.length + 1}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </section>
    )
}

export default Clients
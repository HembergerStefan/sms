import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded'

import useGroupStore from '../stores/groupInformationStore'
import {DataTypes} from '../data/data_types'

import {useUserPermittedQuery} from '../utils/api/ApiService'

import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import FilterTable from '../components/ui/table/filter_table/FilterTable'
import DialogManager from '../components/ui/dialog/DialogManager'
import TaskButton from '../components/form/common_button/task_button/TaskButton'
import UserGroupList from '../components/ui/user_group_list/UserGroupList'

import './Layout.css'

const Clients = () => {

    const {t} = useTranslation()

    const {groups, getClientsOfGroups, getAverageClientsPerGroup} = useGroupStore()

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
                <h1 className='fs-tr-1 fw--semi-bold'>{t('Groups')}</h1>
                {
                    userPermitted ? <TaskButton task={() => {
                        setRenderDialogComponent(() => true)
                    }} taskName='Add Group' icon={<AddRoundedIcon/>}/> : null
                }
            </div>

            <div id='kpi-wrapper'>
                <KPIComponent title='Amount of Groups' value={groups.length} icon={<PeopleAltRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Total Clients in Groups' value={getClientsOfGroups().length}
                              icon={<DevicesRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                <KPIComponent title='Average Clients per Group' value={getAverageClientsPerGroup()}
                              icon={<FunctionsRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
            </div>

            {
                userPermitted ? <UserGroupList/> : null
            }

            <FilterTable tableType={DataTypes.GROUP}/>

            <DialogManager dialogTyp={DataTypes.GROUP}
                           title='Add Group' editMode={false}
                           displayId={groups.length + 1}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </section>
    )
}

export default Clients
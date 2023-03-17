import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'
import {useLocation} from 'react-router-dom'

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded'

import useUserStore from '../stores/user_session/userStore'
import useGroupStore from '../stores/groupInformationStore'
import useClientStore from '../stores/clientInformationStore'
import useScriptStore from '../stores/script/scriptInformationStore'
import useTaskStore from '../stores/task/taskInformationStore'
import useUserInfoStore from '../stores/user/userInformationStore'
import {RoleSystemConfig, WebsocketConfig} from '../data/api_data/ApiConfig'
import {DataTypes} from '../data/data_types'
import WebsocketService from '../utils/websocket/WebsocketService'

import {useUserPermittedQuery} from '../utils/api/ApiService'

import Greeting from '../components/ui/greetings_component/Greeting'
import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import TextListComponent from '../components/ui/text_list_component/TextListComponent'
import AvailableClientsList from '../components/ui/available_clients_list/AvailableClientsList'
import FilterTable from '../components/ui/table/filter_table/FilterTable'
import TaskButton from '../components/form/common_button/task_button/TaskButton'
import TaskInformationDialog from '../components/ui/dialog/task/TaskInformationDialog'

import './Layout.css'

const Overview = () => {

    const {t} = useTranslation()

    const {token, id, roleName} = useUserStore()
    const {groups, setGroups} = useGroupStore()
    const {clients, setClients} = useClientStore()
    const {setUsers} = useUserInfoStore()
    const {getExecutedScripts} = useScriptStore()
    const {tasks} = useTaskStore()

    const location = useLocation()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === RoleSystemConfig.adminRoleName) {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    useEffect(() => {
        if (token !== undefined && id !== '' && roleName === RoleSystemConfig.userRoleName && location.pathname.includes('dashboard')) {
            const socketService = new WebsocketService(new WebSocket(`ws://${WebsocketConfig.baseUrl}:${WebsocketConfig.port}/webpage/${id}/${token}`))
            socketService.initWebsocket(setUsers, setGroups, setClients)   // start socket.onmessage function
        }
    }, [])

    return (
        <section id='dashboard-layout--container'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <Greeting/>
                <TaskButton task={() => {
                    setRenderDialogComponent(() => true)
                }} taskName='Create Task' icon={<AddRoundedIcon/>}/>
            </div>

            <div id='kpi-wrapper'>
                <KPIComponent title='Amount of Groups' value={groups.length} icon={<PeopleAltRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Amount of Clients' value={clients.length} icon={<DevicesRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                <KPIComponent title='Scripts executed' value={getExecutedScripts().length} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
                <KPIComponent title='Open Tasks' value={tasks.length} icon={<PlaylistAddCheckRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
            </div>

            {
                userPermitted ?
                    <div style={{display: 'flex', gap: '30px'}}>
                        <AvailableClientsList/>

                        <TextListComponent headingContent={
                            <h2 className='fs-qi-1 fw--semi-bold'>{t('Open Tasks')}</h2>
                        } textListType={DataTypes.TASK}/>
                    </div> : null
            }

            <FilterTable tableType={DataTypes.CLIENT}/>

            {
                (renderDialogComponent) ? ReactDOM.createPortal(
                    <TaskInformationDialog unmountComponent={setRenderDialogComponent}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </section>
    )
}

export default Overview
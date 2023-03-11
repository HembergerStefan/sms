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
import {WebsocketConfig} from '../data/api_data/ApiConfig'
import {Client, DataTypes, Group} from '../data/data_types'

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
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    useEffect(() => {
        if (token !== undefined && id !== '' && roleName === 'User' && location.pathname.includes('dashboard')) {
            const socket = new WebSocket(`ws://${WebsocketConfig.baseUrl}:${WebsocketConfig.port}/webpage/${id}/${token}`)

            socket.onmessage = (event) => {
                const json = JSON.parse(event.data)

                try {
                    if ((json.event = 'data')) {
                        /* Set user data */
                        setWebsocketUserData(json)
                        /* Set group data */
                        setWebsocketGroupData(json.groups)
                    }
                } catch (err) {
                    console.log(`websocket exception: ${err}`)
                }
            }
        }
    }, [])

    const setWebsocketUserData = (json: any) => {
        setUsers([{
            id: json.id,
            username: json.username,
            password: '',
            role: json.role.id
        }])
    }

    const setWebsocketGroupData = (json: any) => {
        const groupsTemp: Group[] = []
        let clientsTempList: Client[] = []

        json.forEach((entry: any) => {
            const clientsTemp: string[] = []

            entry.clients.forEach((client: { macAddress: { macAddress: string } }) => {
                clientsTemp.push(client.macAddress.macAddress)

                /* Set client data */
                setWebsocketClientData(client, clientsTempList)
            })

            groupsTemp.push({
                id: entry.id,
                name: entry.name,
                clients: clientsTemp,
                users: []
            })
        })

        clientsTempList = clientsTempList.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.macAddress === value.macAddress
                ))
        )

        setGroups(groupsTemp)
        setClients(clientsTempList)
    }

    const setWebsocketClientData = (entry: any, clientsTemp: Client[]) => {
        const scriptsTemp: string[] = []
        const packagesTemp: string[] = []

        if (entry.scripts.length !== 0) {
            entry.scripts.forEach((scriptEntry: { id: string }) => {
                scriptsTemp.push(scriptEntry.id)
            })
        }

        if (entry.packages.length !== 0) {
            entry.packages.forEach((_package: { id: string }) => {
                packagesTemp.push(_package.id)
            })
        }

        clientsTemp.push({
            macAddress: entry.macAddress.macAddress,
            name: entry.name,
            ip: entry.ip,
            os: entry.os,
            lastOnline: new Date(entry.lastOnline),
            usedDiskspace: Number(entry.usedDiskspace),
            cpuUsage: Number(entry.cpuUsage),
            ramUsage: Number(entry.ramUsage),
            packages: packagesTemp,
            scripts: scriptsTemp
        })
    }

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
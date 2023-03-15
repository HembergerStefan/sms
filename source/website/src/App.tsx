import React, {lazy, Suspense, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'

import useWebsiteStore from './stores/website/websiteStore'
import useUserStore from './stores/user_session/userStore'
import useRoleStore from './stores/role/roleInformationStore'
import usePackageStore from './stores/package/packageInformationStore'
import useScriptStore, {initialScriptState} from './stores/script/scriptInformationStore'
import useUserInfoStore from './stores/user/userInformationStore'
import useGroupStore from './stores/groupInformationStore'
import useClientStore from './stores/clientInformationStore'
import useAvailableClientStore from './stores/availableClientStore'
import useTaskStore from './stores/task/taskInformationStore'
import {AvailableClient, Client, Group, Package, Role, Script, Task, User} from './data/data_types'
import {
    useGetAvailableClientsQuery, useGetClientScriptsQuery, useGetClientsQuery, useGetGroupsQuery,
    useGetPackagesQuery, useGetRolesQuery, useGetScriptsQuery, useGetTaskQuery, useGetUsersQuery
} from './utils/api/ApiService'

import NavBar from './components/ui/navbar/NavBar'
import SideBar from './components/ui/sidebar/SideBar'
import SkeletonLoading from './components/ui/skeleton_loading/SkeletonLoading'
import LandingPage from './pages/landing_page/LandingPage'
import PrivateRoute, {PrivateRouteProps} from './react_router_routes/private_route/PrivateRoute'
import ProtectedRoute, {ProtectedRouteProps} from './react_router_routes/private_route/ProtectedRoute'

function App() {

    const Overview = lazy(() => import('./pages/Overview'))
    const Clients = lazy(() => import('./pages/Clients'))
    const Groups = lazy(() => import('./pages/Groups'))
    const Scripts = lazy(() => import('./pages/Scripts'))
    const Packages = lazy(() => import('./pages/Packages'))
    const Users = lazy(() => import('./pages/Users'))
    const Settings = lazy(() => import('./pages/Settings'))

    const {interfaceStyle} = useWebsiteStore()
    const {token} = useUserStore()
    const {setPackages} = usePackageStore()
    const {setScripts} = useScriptStore()
    const {setRoles} = useRoleStore()
    const {setUsers} = useUserInfoStore()
    const {setGroups} = useGroupStore()
    const {setClients} = useClientStore()
    const {setAvailableClients} = useAvailableClientStore()
    const {setTasks} = useTaskStore()

    const rolesQuery = useGetRolesQuery()
    const availableClientsQuery = useGetAvailableClientsQuery()
    const groupsQuery = useGetGroupsQuery()
    const clientsQuery = useGetClientsQuery()
    const usersQuery = useGetUsersQuery()
    const packagesQuery = useGetPackagesQuery()
    const scriptsQuery = useGetScriptsQuery()
    const tasksQuery = useGetTaskQuery()

    const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuthenticated: token !== undefined && token !== '',
        authenticationPath: '/',
    }

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: token !== undefined && token !== '',
        redirectPath: 'dashboard',
    }

    useEffect(() => {
        const rolesTemp: Role[] = []

        if (rolesQuery.isSuccess) {
            rolesQuery.data.forEach((entry: { id: any; name: any }) => {

                rolesTemp.push({
                    id: entry.id,
                    name: entry.name
                })
            })
        }

        setRoles(rolesTemp)

    }, [rolesQuery.data])

    useEffect(() => {
        const availableClientsTemp: AvailableClient[] = []

        if (availableClientsQuery.isSuccess) {
            availableClientsQuery.data.forEach((entry: { macAddress: { macAddress: string }; name: string; ip: string }) => {
                availableClientsTemp.push({
                    macAddress: entry.macAddress.macAddress,
                    name: entry.name,
                    ip: entry.ip
                })
            })
        }

        setAvailableClients(availableClientsTemp)

    }, [availableClientsQuery.data])

    useEffect(() => {
        const groupsTemp: Group[] = []

        if (groupsQuery.isSuccess) {
            groupsQuery.data.forEach((entry: { clients: { macAddress: { macAddress: string } }[]; users: { id: string }[]; id: string; name: string }) => {
                const clientsTemp: string[] = []
                const usersTemp: string[] = []

                entry.clients.forEach((client: { macAddress: { macAddress: string } }) => {
                    clientsTemp.push(client.macAddress.macAddress)
                })

                entry.users.forEach((user: { id: string }) => {
                    usersTemp.push(user.id)
                })

                groupsTemp.push({
                    id: entry.id,
                    name: entry.name,
                    clients: clientsTemp,
                    users: usersTemp
                })
            })
        }

        setGroups(groupsTemp)

    }, [groupsQuery.data])

    useEffect(() => {
        const clientsTemp: Client[] = []

        if (clientsQuery.isSuccess) {
            clientsQuery.data.forEach((entry: { script: { id: string }[]; packages: { id: string }[]; macAddress: { macAddress: string }; name: string; ip: string; os: string; lastOnline: string; usedDiskspace: string; cpuUsage: string; ramUsage: string; }) => {
                const scriptsTemp: string[] = []

                entry.script.forEach((scriptEntry: { id: string }) => {
                    scriptsTemp.push(scriptEntry.id)
                })

                const packagesTemp: string[] = []

                entry.packages.forEach((_package: { id: string }) => {
                    packagesTemp.push(_package.id)
                })

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
            })
        }

        setClients(clientsTemp)

    }, [clientsQuery.data])

    useEffect(() => {
        const usersTemp: User[] = []

        if (usersQuery.isSuccess) {
            usersQuery.data.forEach((entry: { id: string; username: string; role: { id: string } }) => {
                usersTemp.push({
                    id: entry.id,
                    username: entry.username,
                    role: entry.role.id
                })
            })
        }

        setUsers(usersTemp)

    }, [usersQuery.data])

    useEffect(() => {
        const packagesTemp: Package[] = []

        if (packagesQuery.isSuccess) {
            packagesQuery.data.forEach((entry: { id: string; name: string; version: string; date: string; downloadLink: string; silentSwitch: string }) => {
                packagesTemp.push({
                    id: entry.id,
                    name: entry.name,
                    version: entry.version,
                    addingDate: new Date(entry.date),
                    url: entry.downloadLink,
                    silentSwitch: entry.silentSwitch
                })
            })
        }

        setPackages(packagesTemp)

    }, [packagesQuery.data])

    useEffect(() => {
        const scriptsTemp: Script[] = []

        if (scriptsQuery.isSuccess) {
            scriptsQuery.data.forEach((entry: { id: string; name: string; description: string; scriptValue: string; interpreter: string; fileExtension: string; }) => {
                scriptsTemp.push({
                    id: entry.id,
                    name: entry.name,
                    description: entry.description,
                    code: entry.scriptValue,
                    language: entry.interpreter,
                    fileExtension: entry.fileExtension,
                    executionDate: new Date()
                })
            })
        }

        setScripts(scriptsTemp)

    }, [scriptsQuery.data])

    useEffect(() => {
        const tasksTemp: Task[] = []

        if (tasksQuery.isSuccess) {
            tasksQuery.data.forEach((entry: { packages: { id: string; name: string; version: string; downloadlink: string; date: string; silentSwitch: string } | null; script: { id: string; name: string; description: string; script_value: string; interpreter: string; fileExtension: string } | null; id: string; client: { macAddress: { macAddress: string } } }) => {
                let taskTemp: Script | Package = initialScriptState

                if (entry.packages !== null) {
                    taskTemp = ({
                        id: entry.packages.id,
                        name: entry.packages.name,
                        version: entry.packages.version,
                        url: entry.packages.downloadlink,
                        addingDate: new Date(entry.packages.date),
                        silentSwitch: entry.packages.silentSwitch
                    })
                } else if (entry.script !== null) {
                    taskTemp = ({
                        id: entry.script.id,
                        name: entry.script.name,
                        description: entry.script.description,
                        code: entry.script.script_value,
                        executionDate: new Date(),
                        language: entry.script.interpreter,
                        fileExtension: entry.script.fileExtension
                    })
                }

                tasksTemp.push({
                    id: entry.id,
                    clientId: entry.client.macAddress.macAddress,
                    task: taskTemp
                })
            })
        }

        setTasks(tasksTemp)

    }, [tasksQuery.data])

    return (
        <section id='main-section' style={{backgroundColor: 'var(--nl-clr-2)'}} data-theme={interfaceStyle}>
            {
                <div id='layout-container'>

                    {
                        token !== undefined ?
                            <>
                                <NavBar/>
                                <SideBar/>
                            </> : null
                    }

                    <Suspense fallback={<SkeletonLoading/>}>
                        <Routes>
                            <Route path='dashboard'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                            <Route path='dashboard/clients'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Clients/>}/>}/>
                            <Route path='dashboard/groups'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Groups/>}/>}/>
                            <Route path='dashboard/scripts'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Scripts/>}/>}/>
                            <Route path='dashboard/packages'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Packages/>}/>}/>
                            <Route path='dashboard/users'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Users/>}/>}/>
                            <Route path='dashboard/settings'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Settings/>}/>}/>
                            <Route path='dashboard/*'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                            <Route path='*'
                                   element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<LandingPage/>}/>}/>
                        </Routes>
                    </Suspense>
                </div>
            }
        </section>
    )
}

export default App

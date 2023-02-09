import React, {lazy, Suspense, useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'

import NavBar from './components/ui/navbar/NavBar'
import SideBar from './components/ui/sidebar/SideBar'
import SkeletonLoading from './components/ui/skeleton_loading/SkeletonLoading'
import useClientStore from "./stores/clientInformationStore";
import useScriptStore from "./stores/script/scriptInformationStore";
import usePackageStore from "./stores/package/packageInformationStore";
import {
    defaultClientData
} from "./components/ui/card_list/basic_card_list/basic_card_list_demo_data/BasicCardListDemoData";
import {
    defaultPackageData,
    defaultScriptData
} from "./components/ui/table/basic_table/basic_table_demo_data/BasicTableDemoData";
import LandingPage from "./pages/landing_page/LandingPage";
import PrivateRoute, {PrivateRouteProps} from "./react_router_routes/private_route/PrivateRoute";
import useUserStore from "./stores/user_session/userStore";
import ProtectedRoute, {ProtectedRouteProps} from "./react_router_routes/private_route/ProtectedRoute";
import useGroupStore from "./stores/groupInformationStore";
import {defaultGroupData} from "./components/ui/table/filter_table/filter_table_demo_data/FilterTableDemoData";

function App() {

    const Overview = lazy(() => import('./pages/Overview'))
    const Devices = lazy(() => import('./pages/Devices'))
    const Groups = lazy(() => import('./pages/Groups'))
    const Scripts = lazy(() => import('./pages/Scripts'))
    const Packages = lazy(() => import('./pages/Packages'))
    const Settings = lazy(() => import('./pages/Settings'))

    const {token} = useUserStore()

    const [currentUri, setCurrentUri] = useState<string>(window.location.href)

    /* TODO: check if user has the rights to visit this page -> api call */
    const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuthenticated: token !== undefined && token !== '',
        authenticationPath: '/',
    }

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: token !== undefined && token !== '',
        redirectPath: 'dashboard',
    }

    useEffect(() => {
        /*const socket = new WebSocket('ws://192.168.178.27:8080/webpage/ad77351b-e3b5-4512-99be-bfd429bae4dc/SfRoe1TaF4nALDabtTI7hLnnF汉O8N3UyM82nSsUKJRLUXNl8T2hPGjKFcV3rxkR4')

        socket.onmessage = ev => {
            console.log(ev.data)
        }*/
    }, [])

    const {setClients} = useClientStore()
    const {setScripts} = useScriptStore()
    const {setPackages} = usePackageStore()
    const {setGroups} = useGroupStore()

    /* TODO: REMOVE DEMO DATA */
    useEffect(() => {
        setClients(defaultClientData)
        setScripts(defaultScriptData)
        setPackages(defaultPackageData)
        setGroups(defaultGroupData)
    }, [])

    useEffect(() => {
        setCurrentUri(() => window.location.href)
    }, [window.location.href, token])

    return (
        <section id='main-section' style={{backgroundColor: 'var(--nl-clr-2)'}} data-theme='moderna-'>
            {
                <div id='layout-container'>

                    {
                        currentUri.toLowerCase().includes('dashboard') && defaultPrivateRouteProps.isAuthenticated ?
                            <>
                                <NavBar/>
                                <SideBar/>
                            </> : null
                    }

                    <Suspense fallback={<SkeletonLoading/>}>
                        <Routes>
                            <Route path='dashboard'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                            <Route path='dashboard/devices'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Devices/>}/>}/>
                            <Route path='dashboard/groups'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Groups/>}/>}/>
                            <Route path='dashboard/scripts'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Scripts/>}/>}/>
                            <Route path='dashboard/packages'
                                   element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Packages/>}/>}/>
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

{/*<section id='main-section' style={{backgroundColor: 'var(--nl-clr-2)'}} data-theme='moderna-'>
            <div id='layout-container'>

                <NavBar/>
                <SideBar/>

                <Suspense fallback={<SkeletonLoading/>}>
                    <Routes>
                        <Route path='/' element={<Overview/>}/>
                        <Route path='devices' element={<Devices/>}/>
                        <Route path='groups' element={<Groups/>}/>
                        <Route path='scripts' element={<Scripts/>}/>
                        <Route path='packages' element={<Packages/>}/>
                        <Route path='settings' element={<Settings/>}/>
                        <Route path='*' element={<Overview/>}/>
                    </Routes>
                </Suspense>
            </div>
        </section>*/
}

export default App

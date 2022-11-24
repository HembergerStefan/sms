import React, {lazy, Suspense, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'

import NavBar from './components/ui/navbar/NavBar'
import SideBar from './components/ui/sidebar/SideBar'
import SkeletonLoading from './components/ui/skeleton_loading/SkeletonLoading'
import io from "socket.io-client";

function App() {

    const Overview = lazy(() => import('./pages/Overview'))
    const Devices = lazy(() => import('./pages/Devices'))
    const Groups = lazy(() => import('./pages/Groups'))
    const Scripts = lazy(() => import('./pages/Scripts'))
    const Packages = lazy(() => import('./pages/Packages'))
    const User = lazy(() => import('./pages/User'))
    const Profile = lazy(() => import('./pages/Profile'))
    const Settings = lazy(() => import('./pages/Settings'))

    //const socket = io('ws://172.16.101.43:8080/webpage/1923081e-a47e-4446-88ce-27707436afd3/wW2wIjtj4kOHbG/2g2bkAuai2aO+FPjGVd49fm/uiOWBvEsP4yUuQ927pTQEOyQd')

    //const socket = new WebSocket('ws://172.16.101.43:8080/webpage/1923081e-a47e-4446-88ce-27707436afd3/wW2wIjtj4kOHbG/2g2bkAuai2aO+FPjGVd49fm/uiOWBvEsP4yUuQ927pTQEOyQd')

    useEffect(() => {

    }, [])

    return (
        <section id='main-section' style={{backgroundColor: 'var(--nl-clr-2)'}} data-theme='moderna-'>
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
                        <Route path='user' element={<User/>}/>
                        <Route path='profile' element={<Profile/>}/>
                        <Route path='settings' element={<Settings/>}/>
                        <Route path='*' element={<Overview/>}/>
                    </Routes>
                </Suspense>
            </div>
        </section>
    )
}

export default App

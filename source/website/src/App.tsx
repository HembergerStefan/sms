import React, {lazy, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'

import NavBar from './components/ui/navbar/NavBar'
import SideBar from './components/ui/sidebar/SideBar'
import SkeletonLoading from './components/ui/skeleton_loading/SkeletonLoading'

function App() {

    const Overview = lazy(() => import('./pages/Overview'))
    const Devices = lazy(() => import('./pages/Devices'))
    const Groups = lazy(() => import('./pages/Groups'))
    const Scripts = lazy(() => import('./pages/Scripts'))
    const Packages = lazy(() => import('./pages/Packages'))
    const User = lazy(() => import('./pages/User'))
    const Profile = lazy(() => import('./pages/Profile'))
    const Settings = lazy(() => import('./pages/Settings'))

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

import React from 'react';
import NavBar from "./components/ui/navbar/NavBar";
import SideBar from "./components/ui/sidebar/SideBar";
import Overview from "./pages/Overview";
import Devices from "./pages/Devices";
import Groups from "./pages/Groups";
import Scripts from "./pages/Scripts";
import Packages from "./pages/Packages";
import User from "./pages/User";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <div id='layout-container'>

            <NavBar/>
            <SideBar/>

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
        </div>
    );
}

export default App;

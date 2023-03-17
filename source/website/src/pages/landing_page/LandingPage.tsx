import React from 'react'
import Login from "../Login/Login";

const LandingPage = () => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'hsl(0, 0%, 100%)'
        }}>
            <Login/>
        </div>
    )
}

export default LandingPage
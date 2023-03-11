import React, {memo} from 'react'

import './ThemeMenuItemModernaLight.css'

const ThemeMenuItemModernaLight = () => {

    return (
        <div id='dashboard-theme--container'>
            <div id='dashboard-theme--header'>
                <span/>
                <span/>
                <span/>
            </div>
            <div id='dashboard-theme--sidebar'>
                <div>
                    <span/>
                    <span/>
                </div>

                <div>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
            <div id='dashboard-theme--main'>
                <div>
                    <div>
                        <span className='fw--semi-bold' style={{fontSize: '11px'}}>Systems Management Server</span>
                        <span style={{fontSize: '9px'}}>Welcome, Admin!</span>
                    </div>
                    <span/>
                </div>

                <span/>
                <span/>
            </div>
        </div>
    )
}

export default memo(ThemeMenuItemModernaLight)
import React, {memo} from 'react'

import './ThemeMenuItemModernaDark.css'

const ThemeMenuItemModernaDark = () => {

    return (
        <div id='dashboard-theme--container--dark'>
            <div id='dashboard-theme--header--dark'>
                <span/>
                <span/>
                <span/>
            </div>
            <div id='dashboard-theme--sidebar--dark'>
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
            <div id='dashboard-theme--main--dark'>
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

export default memo(ThemeMenuItemModernaDark)
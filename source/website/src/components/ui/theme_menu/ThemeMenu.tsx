import React, {memo} from 'react'

import DoneRoundedIcon from '@mui/icons-material/DoneRounded'

import useWebsiteStore from '../../../stores/website/websiteStore'

import ThemeMenuItemModernaLight from './theme_menu_items/moderna_light/ThemeMenuItemModernaLight'
import ThemeMenuItemModernaDark from './theme_menu_items/moderna_dark/ThemeMenuItemModernaDark'

import './ThemeMenu.css'

const ThemeMenu = () => {

    const {interfaceStyle, setInterfaceStyle} = useWebsiteStore()

    return (
        <section id='theme-menu--container'>
            <div className={interfaceStyle === 'moderna-light' ? 'active-theme' : undefined}
                 onClick={() => setInterfaceStyle('moderna-light')}>
                <ThemeMenuItemModernaLight/>
                <span className='fw--semi-bold'>Moderna Light</span>
                <div style={{display: interfaceStyle === 'moderna-light' ? 'flex' : 'none'}}>
                    <span/>
                    <div>
                        <DoneRoundedIcon style={{fontSize: '20px'}}/>
                    </div>
                </div>
            </div>

            <div className={interfaceStyle === 'moderna-dark' ? 'active-theme' : undefined}
                 onClick={() => setInterfaceStyle('moderna-dark')}>
                <ThemeMenuItemModernaDark/>
                <span className='fw--semi-bold'>Moderna Dark</span>
                <div style={{display: interfaceStyle === 'moderna-dark' ? 'flex' : 'none'}}>
                    <span/>
                    <div>
                        <DoneRoundedIcon style={{fontSize: '20px'}}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default memo(ThemeMenu)
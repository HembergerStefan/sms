import React from 'react'

import {useTranslation} from 'react-i18next'

import ThemeMenu from '../components/ui/theme_menu/ThemeMenu'

import './Layout.css'

const Clients = () => {

    const {t} = useTranslation()

    return (
        <section id='dashboard-layout--container'>
            <h1 className='fs-tr-1 fw--semi-bold'>{t('Settings')}</h1>

            <div style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
                <div>
                    <h2 className='fs-qr-1 fw--semi-bold'>{t('Appearance')}</h2>
                    <span>{t('Change how Systems Management Server looks and feels in your browser')}.</span>
                </div>

                <ThemeMenu/>
            </div>
        </section>
    )
}

export default Clients
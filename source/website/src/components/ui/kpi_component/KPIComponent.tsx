import React from 'react'

import {useTranslation} from 'react-i18next'

import './KPIComponent.css'

interface KpiComponentProps {
    title: string
    value: number
    icon: React.ReactNode
    theme: string
}

const KpiComponent = ({title, value, icon, theme}: KpiComponentProps) => {

    const {t} = useTranslation()

    return (
        <div id='kpi-container' className='box'>
            <div style={{backgroundColor: theme}}>
                {icon}
            </div>
            <div>
                <span className='fs-pr-body-1 fw--semi-bold clr-pr-1'>{t(title)}</span>
                <span className='fs-pr-1 fw--extra-bold clr-pr-1'>{value}</span>
            </div>
        </div>
    )
}

export default KpiComponent
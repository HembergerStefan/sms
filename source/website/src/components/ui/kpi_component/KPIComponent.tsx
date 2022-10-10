import React from 'react'
import './KPIComponent.css'

interface KpiComponentProps {
    title: string
    value: number
    icon: React.ReactNode
    theme: string
}

const KpiComponent = ({title, value, icon, theme}: KpiComponentProps) => {
    return (
        <div id='kpi-container'>
            <div style={{backgroundColor: theme}}>
                {icon}
            </div>
            <div>
                <span className='fs-pr-body-1 fw--semi-bold'>{title}</span>
                <span className='fs-pr-1 fw--extra-bold'>{value}</span>
            </div>
        </div>
    )
}

export default KpiComponent
import React from 'react'

import {useTranslation} from 'react-i18next'

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import OnlinePredictionRoundedIcon from '@mui/icons-material/OnlinePredictionRounded'

import useClientStore from '../stores/clientInformationStore'
import {DataTypes} from '../data/data_types'

import BasicCardListManager from '../components/ui/card_list/basic_card_list_manager/BasicCardListManager'
import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import TextListComponent from '../components/ui/text_list_component/TextListComponent'

import './Layout.css'

const Clients = () => {

    const {t} = useTranslation()

    const {clients, getOnlineClients} = useClientStore()

    return (
        <section id='dashboard-layout--container'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h1 className='fs-tr-1 fw--semi-bold'>{t('Clients')}</h1>
            </div>

            <div id='kpi-wrapper'>
                <KPIComponent title='Amount of Clients' value={clients.length} icon={<DevicesRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Total Online Clients' value={getOnlineClients().length}
                              icon={<OnlinePredictionRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
            </div>

            <TextListComponent headingContent={
                <h2 className='fs-qi-1 fw--semi-bold'>{t('Client-Script Executions')}</h2>
            } textListType={DataTypes.SCRIPT}/>

            <BasicCardListManager/>
        </section>
    )
}

export default Clients
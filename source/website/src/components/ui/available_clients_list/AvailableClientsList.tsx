import React, {memo, useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useAvailableClientStore from '../../../stores/availableClientStore'
import {defaultAvailableClientData} from './available_clients_demo_data/AvailableClientListDemoData'

import BoxHeading from '../box_heading_container/BoxHeading'
import AvailableClientItem from './available_client_item/AvailableClientItem'
import BasicCardListDropdownContent from '../../form/dropdown/basic_card_list/BasicCardListDropdownContent'

import './AvailableClientsList.css'

const AvailableClientsList = () => {

    const {t} = useTranslation()

    const {availableClients, setAvailableClients} = useAvailableClientStore()

    const [mountDropdown, setMountDropdown] = useState<boolean>(false)

    /* TODO: REMOVE DEMO DATA */
    useEffect(() => {
        setAvailableClients(defaultAvailableClientData)
    }, [])

    return (
        <section id='available-clients--section' className='box'>
            <BoxHeading content={
                <h2 className='fs-qr-1 fw--semi-bold'>{t('Available')}</h2>}
                        dropdownContent={undefined}
                        mountDropdown={mountDropdown}
                        setMountDropdown={setMountDropdown}/>

            <div id='available-clients--container'>
                {
                    availableClients.map((availableClient, index) => (
                        <AvailableClientItem key={`availableClient${index}`} itemIndex={index}
                                             availableClient={availableClient}/>
                    ))
                }
            </div>
        </section>
    )
}

export default memo(AvailableClientsList)
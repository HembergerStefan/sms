import React, {memo, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useAvailableClientStore from '../../../stores/availableClientStore'

import BoxHeading from '../box_heading_container/BoxHeading'
import AvailableClientItem from './available_client_item/AvailableClientItem'

import './AvailableClientsList.css'

const AvailableClientsList = () => {

    const {t} = useTranslation()

    const {availableClients} = useAvailableClientStore()

    const [mountDropdown, setMountDropdown] = useState<boolean>(false)

    return (
        <section id='available-clients--section' className='box'>
            <BoxHeading content={
                <h2 className='fs-qr-1 fw--semi-bold'>{t('Available Clients')}</h2>}
                        dropdownContent={undefined}
                        mountDropdown={mountDropdown}
                        setMountDropdown={setMountDropdown}/>

            <div id='available-clients--container'>
                {
                    availableClients.length !== 0 ?
                        availableClients.map((availableClient, index) => (
                            <AvailableClientItem key={`availableClient${index}`} itemIndex={index}
                                                 availableClient={availableClient}/>
                        ))
                        :
                        <div id='no-clients'>
                            <span className='fs-sc-body-1'>{t('No clients available')}</span>
                        </div>
                }
            </div>
        </section>
    )
}

export default memo(AvailableClientsList)
import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useClientStore from '../../../../stores/clientInformationStore'
import useCardListClientStore from '../../../../stores/cardListClientStore'


import BasicCardListDropdownContent from '../../../form/dropdown/basic_card_list/BasicCardListDropdownContent'
import BoxHeading from '../../box_heading_container/BoxHeading'
import CardItem from './card_item/CardItem'

import './BasicCardList.css'

const BasicCardList = () => {

    const {t} = useTranslation()

    /* Get the selected client out of the stores & the possibility to update the stores */
    const {clients} = useClientStore()

    const {clientPageSize, clientPageIndex, clientPageCount, setClientPageCount} = useCardListClientStore()

    const [mountDropdown, setMountDropdown] = useState<boolean>(false)

    /* Recalculate the amount of needed pages every time the script data changes or the user changed the clientPageSize */
    useEffect(() => {
        /* Set count of pages needed for this amount of clients per page */
        setClientPageCount(Math.ceil(clients.length / clientPageSize))
    }, [clients, clientPageSize])

    return (
        <section id='basic-card-list-container' className='box'>
            <BoxHeading content={
                <h2 className='fs-qr-1 fw--semi-bold'>{t('All Clients')}</h2>}
                        dropdownContent={<BasicCardListDropdownContent setMountDropdown={setMountDropdown}/>}
                        mountDropdown={mountDropdown}
                        setMountDropdown={setMountDropdown}/>

            <div id='basic-card-list'>
                {/* TODO: ADD FILTERING */}
                {clients.map((client, index) => {
                    if (index >= clientPageSize * clientPageIndex && index <= clientPageIndex * clientPageSize + (clientPageSize - 1)) {
                        return <CardItem key={`cardItem${index}`} item={client}/>
                    } else {
                        return null
                    }
                })}
            </div>

           <div className='mg-t-big'>
                <span className='fs-sc-body-1'>
                {t('Page')} {clientPageIndex + 1} {t('of')} {clientPageCount}
            </span>
           </div>
        </section>
    )
}

export default BasicCardList
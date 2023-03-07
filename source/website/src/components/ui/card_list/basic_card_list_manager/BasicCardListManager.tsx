import React from 'react'

import useCardListClientStore from '../../../../stores/cardListClientStore'
import {DataTypes} from '../../../../data/data_types'

import BasicCardList from '../basic_card_list/BasicCardList'
import BasicTable from '../../table/basic_table/BasicTable'

const BasicCardListManager = () => {

    const {clientDisplayMode} = useCardListClientStore()

    return (
        clientDisplayMode === 'Card' ? <BasicCardList/> : <BasicTable tableType={DataTypes.CLIENT}/>
    )
}

export default BasicCardListManager
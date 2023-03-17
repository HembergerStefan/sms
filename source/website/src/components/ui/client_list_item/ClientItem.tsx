import React from 'react'

import {AvailableClient} from '../../../data/data_types'

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'

import useFilterDataListStore from '../../../stores/filterDataListStore'
import {useAddClientToGroupMutation} from '../../../utils/api/ApiService'
import useHover from '../../../hooks/useHover'

import Iconing from '../numbering/iconing/Iconing'
import IPInput from '../ip_input/IPInput'
import AdaptButton from '../../form/common_button/adapt_button/AdaptButton'
import TooltipManager from '../tooltip/TooltipManager'

import './ClientItem.css'

interface ClientItemProps {
    client: AvailableClient
    mutationText: string
    mutationFunction?: Function
}

const ClientItem = ({client, mutationText, mutationFunction}: ClientItemProps) => {

    const {forGroup} = useFilterDataListStore()

    const [hoverRef, isHovered] = useHover()

    const addClientToGroupMutation = useAddClientToGroupMutation(client.macAddress, forGroup.id)

    const addToGroup = () => {
        addClientToGroupMutation.mutate()
    }

    const mutationWrapper = () => {
        if (mutationFunction) {
            mutationFunction(client)
        }
    }

    return (
        <div className='client-item'>
            <Iconing value={1} fixedColor={true} icon={DevicesRoundedIcon}/>
            <div>
                <h2 ref={hoverRef} className='fs-qi-1 fw--semi-bold clr-pr-1'>{client.name}</h2>
                <IPInput value={client.ip}/>
            </div>
            <AdaptButton placeholder={mutationText} onOnClick={mutationFunction ? mutationWrapper : addToGroup}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{client.name}</span>}/> : null
            }
        </div>
    )
}

export default ClientItem
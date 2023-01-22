import React, {useEffect} from 'react'

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'

import {AvailableClient} from '../../../../data/data_types'

import useHover from '../../../../hooks/useHover'

import Iconing from '../../numbering/iconing/Iconing'
import IPInput from '../../ip_input/IPInput'
import AdaptButton from '../../../form/common_button/adapt_button/AdaptButton'
import TooltipManager from '../../tooltip/TooltipManager'

interface AvailableClientItemProps {
    itemIndex: number
    availableClient: AvailableClient
}

const AvailableClientItem = ({itemIndex, availableClient}: AvailableClientItemProps) => {

    const [hoverRef, isHovered] = useHover()

    /* TODO: implement onSuccess method */
    const onSuccess = () => {

    }

    return (
        <div className='available-client'>
            <Iconing value={itemIndex} fixedColor={true} icon={DevicesRoundedIcon}/>
            <div>
                <h2 ref={hoverRef} className='fs-qi-1 fw--semi-bold clr-pr-1'>{availableClient.name}</h2>
                <IPInput value={availableClient.ip}/>
            </div>
            <AdaptButton placeholder='Adapt' onOnClick={onSuccess}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{availableClient.name}</span>}/> : null
            }
        </div>
    )
}

export default AvailableClientItem
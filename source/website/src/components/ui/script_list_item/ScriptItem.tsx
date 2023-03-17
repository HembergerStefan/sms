import React from 'react'

import {Script} from '../../../data/data_types'

import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'

import useHover from '../../../hooks/useHover'

import Iconing from '../numbering/iconing/Iconing'
import IPInput from '../ip_input/IPInput'
import AdaptButton from '../../form/common_button/adapt_button/AdaptButton'
import TooltipManager from '../tooltip/TooltipManager'

import './ScriptItem.css'

interface ScriptItemProps {
    script: Script
    mutationText: string
    mutationFunction: Function
}

const ScriptItem = ({script, mutationText, mutationFunction}: ScriptItemProps) => {

    const [hoverRef, isHovered] = useHover()

    const mutationWrapper = () => {
        mutationFunction(script)

    }

    return (
        <div className='script-item'>
            <Iconing value={1} fixedColor={true} icon={TerminalRoundedIcon}/>
            <div>
                <h2 ref={hoverRef} className='fs-qi-1 fw--semi-bold clr-pr-1'>{script.name}</h2>
                <IPInput value={script.description}/>
            </div>
            <AdaptButton placeholder={mutationText} onOnClick={mutationWrapper}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{script.name}</span>}/> : null
            }
        </div>
    )
}

export default ScriptItem
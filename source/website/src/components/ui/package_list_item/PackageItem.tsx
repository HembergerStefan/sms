import React from 'react'

import {Package} from '../../../data/data_types'

import AppsRoundedIcon from '@mui/icons-material/AppsRounded'

import useHover from '../../../hooks/useHover'

import Iconing from '../numbering/iconing/Iconing'
import IPInput from '../ip_input/IPInput'
import AdaptButton from '../../form/common_button/adapt_button/AdaptButton'
import TooltipManager from '../tooltip/TooltipManager'

import './PackageItem.css'

interface PackageItemProps {
    _package: Package
    mutationText: string
    mutationFunction: Function
}

const PackageItem = ({_package, mutationText, mutationFunction}: PackageItemProps) => {

    const [hoverRef, isHovered] = useHover()

    const mutationWrapper = () => {
        mutationFunction(_package)

    }

    return (
        <div className='package-item'>
            <Iconing value={1} fixedColor={true} icon={AppsRoundedIcon}/>
            <div>
                <h2 ref={hoverRef} className='fs-qi-1 fw--semi-bold clr-pr-1'>{_package.name}</h2>
                <IPInput value={_package.url}/>
            </div>
            <AdaptButton placeholder={mutationText} onOnClick={mutationWrapper}/>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-sc-body-1 fw--semi-bold'>{_package.name}</span>}/> : null
            }
        </div>
    )
}

export default PackageItem
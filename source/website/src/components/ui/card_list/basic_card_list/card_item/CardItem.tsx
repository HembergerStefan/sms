import React, {memo, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useGroupStore from '../../../../../stores/groupInformationStore'
import {Client, DataTypes, Group} from '../../../../../data/data_types'

import useHover from '../../../../../hooks/useHover'

import TooltipManager from '../../../tooltip/TooltipManager'
import OnlineStatus from '../../../online_status_displaying/OnlineStatus'
import TitleInputWrapper from '../../../title_input_wrapper/TitleInputWrapper'
import ProgressRing from '../../../progress_ring/ProgressRing'
import Chip from '../../../chip/Chip'
import IPInput from '../../../ip_input/IPInput'
import DialogManager from '../../../dialog/DialogManager'

import './CardItem.css'

interface CardItemProps {
    item: Client
    cardItemIndex: number
}

const CardItem = ({item, cardItemIndex}: CardItemProps) => {

    const {t} = useTranslation()

    const [hoverRef, isHovered] = useHover()

    return (
        <article className='card-item'>
            <div className='card-item--heading-wrapper'>
                <span className='fs-qi-1 fw--semi-bold clr-pr-1'>{item.name}</span>
                <OnlineStatus client={item}/>
            </div>

                <div className='card-item--ipgro-wrapper'>
                    <TitleInputWrapper title='IP' content={
                        <IPInput value={item.ip}/>
                    }/>

                <TitleInputWrapper title={`${t('Groups')} (${item.groups.length})`} content={
                    <div ref={hoverRef} id='group-container'>
                        {item.groups.map((group, index) => (
                            <Chip key={`chip${index}`} value={group}/>
                        ))}
                    </div>
                }/>
            </div>

                <TitleInputWrapper title='Usages' content={
                    <div className='card-item--usage-wrapper'>
                        <div>
                            <h3 className='fs-tr-body-1 fw--semi-bold'>{t('CPU')}</h3>
                            <ProgressRing value={item.cpuUsage}/>
                        </div>

                    <div>
                        <h3 className='fs-tr-body-1 fw--semi-bold'>Memory</h3>
                        <ProgressRing value={item.usedDiskspace}/>
                    </div>
                </div>
            }/>

            {
                (isHovered) ? <TooltipManager
                    content={
                        <div id='card-groups--tooltip'>
                            <span className='fs-pr-body-1 fw--semi-bold'>In Groups</span>
                            <div id='group-container'>
                                {item.groups.map((group, index) => (
                                    <Chip key={`chip${index}`} value={group}/>
                                ))}
                            </div>
                        </div>
                    }/> : null
            }
        </article>
    )
}

export default memo(CardItem)
import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import Checkbox from '../../../form/checkbox/Checkbox'

import './TextListItem.css'

interface TextListItemProps {
    client: string
    action: string
    actionDesc: string
    date?: string
    timeAgo?: string
}

const TextListItem = ({client, action, actionDesc, date, timeAgo}: TextListItemProps) => {

    const {t} = useTranslation()

    return (
        <div id='list-item'>
            <Checkbox {...{checked: true, readOnly: true}} style={{cursor: 'default'}}/>
            <div id='info-date--wrapper'>
                <span className='fs-sc-body-1 fw--semi-bold clr-pr-1'>{client}
                    <span className='fs-sc-body-1 fw-regular'> {actionDesc} "
                        <span className='fs-sc-body-1 fw--semi-bold clr-pr-1'>{action}"
                            {
                                date ? <span className='fs-sc-body-1 fw-regular'> {t('on')} {date}</span> : null
                            }
                        </span>
                    </span>
                </span>
                {
                    timeAgo ? <span className='fs-qr-body-1 fw-light'>{timeAgo}</span> : null
                }
            </div>
        </div>
    )
}

export default memo(TextListItem)
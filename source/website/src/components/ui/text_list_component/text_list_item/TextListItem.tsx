import React, {memo} from 'react'

import Checkbox from '../../../form/checkbox/Checkbox'

import './TextListItem.css'

interface TextListItemProps {
    client: string
    action: string
    actionDesc: string
    date: string
    timeAgo: string
}

const TextListItem = ({client, action, actionDesc, date, timeAgo}: TextListItemProps) => {

    return (
        <div id='list-item'>
            <Checkbox {...{checked: true, readOnly: true}} style={{cursor: 'default'}}/>
            <div id='info-date--wrapper'>
                <span className='fs-sc-body-1 fw--semi-bold clr-pr-1'>{client}
                    <span className='fs-sc-body-1 fw-regular'> {actionDesc} "
                        <span className='fs-sc-body-1 fw--semi-bold clr-pr-1'>{action}
                            <span className='fs-sc-body-1 fw-regular'>" on {date}</span>
                        </span>
                    </span>
                </span>
                <span className='fs-qr-body-1 fw-light'>{timeAgo} ago</span>
            </div>
        </div>
    )
}

export default memo(TextListItem)
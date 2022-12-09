import React, {memo} from 'react'

import {useTranslation} from 'react-i18next'

import BoxHeading from '../box_heading_container/BoxHeading'
import TextListItem from './text_list_item/TextListItem'

import './TextListComponent.css'

interface TextListComponentProps {
    headingContent: React.ReactNode
}

const TextListComponent = ({headingContent}: TextListComponentProps) => {

    const {t} = useTranslation()

    return (
        <article id='text-list--container' className='box'>
            <BoxHeading content={headingContent}/>

            <div id='list-item-container'>
                <TextListItem client='Client 1' action='Setup' actionDesc='executed the script' date='3rd August 2022' timeAgo='1 month'/>
                <TextListItem client='Client 1' action='Setup' actionDesc='executed the script' date='3rd August 2022' timeAgo='2 days'/>
                <TextListItem client='Client 3' action='AutoClicker' actionDesc='executed the script' date='1st July 2022' timeAgo='1 week'/>
                <TextListItem client='Client 1' action='Reset Windows' actionDesc='executed the script' date='16th July 2022' timeAgo='10 min'/>
            </div>
        </article>
    )
}

export default memo(TextListComponent)
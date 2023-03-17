import React, {memo} from 'react'
import {useTranslation} from 'react-i18next'

interface DropdownContentProps {
    setMount: Function
    items: string[] | number[]
    crItem: string | number
    setCrItem: Function
}

const DropdownContent = ({setMount, crItem, setCrItem, items}: DropdownContentProps) => {

    const {t} = useTranslation()

    /* Select the item and unmount this component */
    const selectItem = (cr: string | number): void => {
        /* Only set the new item when it differs from the old selected value */
        if (cr !== crItem) {
            setCrItem(() => cr)
            setMount(() => false)
        }
    }

    return (
        <ul id='dropdown-content'>
            {
                items.length !== 0 ?
                    items.map((cr, index) => (
                        <li key={`dropdown-list-item-${index}`}
                            className={cr === crItem ? 'selected--dropdown-item' : undefined}
                            onClick={() => selectItem(cr)}>
                            <span className='fs-pr-body-1 fw-regular'>{cr}</span>
                        </li>
                    ))
                    :
                    <li>
                        <span className='fs-pr-body-1 fw-regular'>{t('No items available')}</span>
                    </li>
            }
        </ul>
    )
}

export default memo(DropdownContent)
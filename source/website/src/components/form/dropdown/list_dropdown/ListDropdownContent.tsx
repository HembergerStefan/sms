import React, {memo} from 'react'

interface DropdownContentProps {
    setMount: Function
    items: string[]
    setCrItem: Function
}

const DropdownContent = ({setMount, setCrItem, items}: DropdownContentProps) => {

    /* Select the item and unmount this component */
    const selectItem = (cr: string): void => {
        setCrItem(cr)

        setMount(() => false)
    }

    return (
        <ul id='dropdown-content'>
            {
                items.map((cr) => (
                    <li onClick={() => selectItem(cr)}>
                        <span className='fs-pr-body-1 fw-regular'>{cr}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default memo(DropdownContent)
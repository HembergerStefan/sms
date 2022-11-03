import React, {useEffect, useRef} from 'react'

import './Dropdown.css'

interface DropdownContentProps {
    mount: boolean
    setMount: Function
    setCrItem: Function
    items: string[]
}

const DropdownContent = ({mount, setMount, setCrItem, items}: DropdownContentProps) => {

    const mountRef = useRef<HTMLUListElement>(null)
    const node = mountRef.current

    useEffect((): void => {
        if (node !== null) {
            /* When the component is mounted, then show it */
            if (mount) {
                node.classList.add('active-dropdown-content')
                /* Else hide it */
            } else {
                node.classList.remove('active-dropdown-content')
            }
        }
    }, [mount])

    /* Select the item and unmount this component */
    const selectItem = (cr: string): void => {
        setCrItem(cr)

        setMount(() => false)
    }

    return (
        <ul ref={mountRef} id='dropdown-content' >
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

export default DropdownContent
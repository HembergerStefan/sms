import React, {useEffect, useRef} from 'react'

import './Dropdown.css'

interface DropdownContentProps {
    mount: boolean
    setCrItem: Function
    items: string[]
}

const DropdownContent = ({mount, setCrItem, items}: DropdownContentProps) => {

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

    const selectItem = (cr: string): void => {
        setCrItem(cr)

        if (node !== null) {
            node.classList.remove('active-dropdown-content')
        }
    }

    return (
        <ul ref={mountRef} id='dropdown-content'>
            <div id='dropdown-content-scroll-area'>
                {
                    items.map((cr) => (
                        <li onClick={() => selectItem(cr)}>
                            <span className='fs-pr-body-1 fw-regular'>{cr}</span>
                        </li>
                    ))
                }
            </div>
        </ul>
    )
}

export default DropdownContent
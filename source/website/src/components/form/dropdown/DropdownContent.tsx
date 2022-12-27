import React, {useEffect, useRef, memo} from 'react'

import './Dropdown.css'

interface DropdownContentProps {
    mount: boolean
    content: React.ReactNode
}

const DropdownContent = ({mount, content}: DropdownContentProps) => {

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

    return (
        <section ref={mountRef} id='dropdown-content-container'>
            {content}
        </section>
    )
}

export default memo(DropdownContent)
import React, {useEffect, useRef} from 'react'
import './Dropdown.css'

interface DropdownContentProps {
    mount: boolean
    crItem: Function
}

const DropdownContent = ({mount, crItem}: DropdownContentProps) => {

    const mountRef = useRef<HTMLUListElement>(null)

    const ITEMS = [
        'Adobe Illustrator',
        'WebStorm',
        'IntelliJ IDEA Ultimate',
        'Figma',
        'Spotify',
        'Windows Explorer',
        'Steam'
    ]

    useEffect(() => {
        if (mountRef.current !== null) {
            mountRef.current.classList.toggle('active-dropdown-content')
        }
    }, [mount])

    return (
        <ul ref={mountRef} id='dropdown-content'>
            {
                ITEMS.map((cr) => (
                    <li onClick={() => crItem(cr)}>
                        <span>{cr}</span>
                    </li>
                ))
            }
        </ul>
    );
};

export default DropdownContent
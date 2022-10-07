import React, {useEffect, useRef} from 'react'
import './Dropdown.css'

interface DropdownContentProps {
    mount: boolean
    setCrItem: Function
}

const DropdownContent = ({mount, setCrItem}: DropdownContentProps) => {

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

    const toggleDropdownContent = (cr: string): void => {
        setCrItem(cr)

        if (mountRef.current !== null) {
            mountRef.current.classList.remove('active-dropdown-content')
        }
    }

    return (
        <ul ref={mountRef} id='dropdown-content'>
            <div id='dropdown-content-scroll-area'>
                {
                    ITEMS.map((cr) => (
                        <li onClick={() => toggleDropdownContent(cr)}>
                            <span className='fs-pr-body-1 fw-regular'>{cr}</span>
                        </li>
                    ))
                }
            </div>
        </ul>
    );
};

export default DropdownContent
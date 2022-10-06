import React, {useEffect, useRef} from 'react';
import './Dropdown.css'

interface DropdownContentProps {
    mount: boolean
}

const DropdownContent = ({mount}: DropdownContentProps) => {

    const mountRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (mountRef.current !== null) {
            mountRef.current.classList.toggle('active-dropdown-content')
        }
    }, [mount])

    return (
        <ul ref={mountRef} id='dropdown-content'>
            <li>
                <span>Adobe Illustrator</span>
            </li>
            <li>
                <span>WebStorm</span>
            </li>
            <li>
                <span>IntelliJ IDEA Ultimate</span>
            </li>
            <li>
                <span>Figma</span>
            </li>
        </ul>
    );
};

export default DropdownContent;
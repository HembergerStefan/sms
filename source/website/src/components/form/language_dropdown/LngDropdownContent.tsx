import React, {useEffect, useRef} from 'react'
import usa from "../../../data/images/language_dropdown/usa_icon.svg";
import austria from "../../../data/images/language_dropdown/austria_icon.svg";

interface LngDropdownContentProps {
    mount: boolean
    setMount: Function
    changeLng: Function
}

const LngDropdownContent = ({mount, setMount, changeLng}: LngDropdownContentProps) => {

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
        <ul ref={mountRef} id='language-dropdown-content' className='box'>
            <li onClick={() => {
                changeLng('en')
                setMount(() => false)
            }}>
                <img className='language-icon' src={usa} alt='lngIcon'/>
                <span className='fs-pr-body-1 fw--semi-bold'>English</span>
            </li>

            <li onClick={() => {
                changeLng('de')
                setMount(() => false)
            }}>
                <img className='language-icon' src={austria} alt='lngIcon'/>
                <span className='fs-pr-body-1 fw--semi-bold'>Deutsch</span>
            </li>
        </ul>
    )
}

export default LngDropdownContent
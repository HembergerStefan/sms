import React, {useEffect, useRef} from 'react'

import {useTranslation} from 'react-i18next'

import {usa, austria} from '../../../data/images/language_dropdown'

import useLngStore from '../../../stores/lngStore'

interface LngDropdownContentProps {
    mount: boolean
    setMount: Function
}

const LngDropdownContent = ({mount, setMount}: LngDropdownContentProps) => {

    const mountRef = useRef<HTMLUListElement>(null)
    const node = mountRef.current

    /* Translation Hook */
    const {i18n} = useTranslation()

    /* Update the lng in the store */
    const setLng = useLngStore((state: { setLng: (lng: string) => void }) => state.setLng)

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

    /* Translation Method */
    const handleChangeLng = (lng: string) => {
        i18n.changeLanguage(lng)

        /* Change the store lng */
        setLng(lng)

        /* After selecting lng unmount this component */
        setMount(() => false)
    }

    return (
        <ul ref={mountRef} id='language-dropdown-content' className='box'>
            <li onClick={() => handleChangeLng('en')}>
                <img className='language-icon' src={usa} alt='lngIcon'/>
                <span className='fs-pr-body-1 fw--semi-bold'>English</span>
            </li>

            <li onClick={() => handleChangeLng('de')}>
                <img className='language-icon' src={austria} alt='lngIcon'/>
                <span className='fs-pr-body-1 fw--semi-bold'>Deutsch</span>
            </li>
        </ul>
    )
}

export default LngDropdownContent
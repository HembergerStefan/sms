import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import usa from '../../../data/images/language_dropdown/usa_icon.svg'
import austria from '../../../data/images/language_dropdown/austria_icon.svg'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import './LngDropdown.css'
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import LngDropdownContent from "./LngDropdownContent";

const LngDropdown = () => {

    /* Translation Hook */
    const {i18n} = useTranslation()

    const [crLngIcon, setCrLngIcon] = useState(usa)
    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)

    /* Always hide the component when clicking outside the component */
    const [dropdownRef] = useOnClickOutside(() => activeDropdown ? setActiveDropdown(false) : null)

    useEffect(() => {
        const crLng = localStorage.getItem('lng')

        if (crLng !== null) {
            (crLng === 'en') ? setCrLngIcon(usa) : setCrLngIcon(austria)
        }
    }, [])

    /* Translation Method */
    const handleChangeLng = (lng: string) => {
        i18n.changeLanguage(lng)

        lng === 'en' ? setCrLngIcon(usa) : setCrLngIcon(austria)

        localStorage.setItem('lng', lng)
    }

    return (
        <div ref={dropdownRef} id='language-container' className='clr-pr-1'>
            <button id='language-change' onClick={() => setActiveDropdown(prev => !prev)}>
                <img className='language-icon' src={crLngIcon} alt='lngIcon'/>
                <ExpandMoreRoundedIcon style={{fontSize: 'var(--icon-size-medium)'}}/>
            </button>

            <LngDropdownContent mount={activeDropdown} setMount={setActiveDropdown} changeLng={handleChangeLng}/>
        </div>
    )
}

export default LngDropdown
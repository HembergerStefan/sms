import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import useLngStore from '../../../stores/lngStore'

import useOnClickOutside from '../../../hooks/useOnClickOutside'

import LngDropdownContent from './LngDropdownContent'

import './LngDropdown.css'

const LngDropdown = () => {

    /* Translation Hook */
    const {i18n} = useTranslation()

    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)

    /* Always hide the component when clicking outside the component */
    const [dropdownRef] = useOnClickOutside(() => activeDropdown ? setActiveDropdown(false) : null)

    /* Get the lng icon out of the store */
    const lngCountryIcon = useLngStore((state: { getLngCountryIcon: () => string}) => state.getLngCountryIcon)

    /* Update the lng in the store */
    const selectedLng = useLngStore((state: { selectedLng: string }) => state.selectedLng)

    /* Set the selected lng when rendering the webpage */
    useEffect(() => {
        i18n.changeLanguage(selectedLng)
    }, [])

    return (
        <div ref={dropdownRef} id='language-container' className='clr-pr-1'>
            <button id='language-change' onClick={() => setActiveDropdown(prev => !prev)}>
                <img className='language-icon' src={lngCountryIcon()} alt='lngIcon'/>
                <ExpandMoreRoundedIcon style={{fontSize: 'var(--icon-size-medium)'}}/>
            </button>

            <LngDropdownContent mount={activeDropdown} setMount={setActiveDropdown}/>
        </div>
    )
}

export default LngDropdown
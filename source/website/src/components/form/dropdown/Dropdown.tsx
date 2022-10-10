import React, {createElement, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import DropdownContent from './DropdownContent'
import './Dropdown.css'

const Dropdown = () => {

    const {t} = useTranslation()
    const defaultDropdownValue: string = 'Select Item'

    const iconToggleRef = useRef<HTMLDivElement>(null)

    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<string>(defaultDropdownValue)
    const [interactionIcon, setInteractionIcon] = useState<string>('expandMoreRoundedIcon')

    /* List of all the svg mui icon components -> the name is mapped to the original component by reference
    * by using this the typescript array can use the name of the components and it can be mapped to the real component
    * by reference */
    const Components: { [key: string]: any } = {
        'expandMoreRoundedIcon': ExpandMoreRoundedIcon,
        'clearRoundedIcon': ClearRoundedIcon
    }

    useEffect((): void => {
        if (iconToggleRef.current !== null) {
            iconToggleRef.current.classList.toggle('active-expand-more-icon')
        }
    }, [activeDropdown])

    useEffect((): void => {
        /* User selected item */
        if (selectedItem !== defaultDropdownValue) {
            setInteractionIcon('clearRoundedIcon')
        } else {
            setInteractionIcon('expandMoreRoundedIcon')

            /* User deleted selected item, so the default value will be displayed -> arrow down */
            if (iconToggleRef.current !== null) {
                iconToggleRef.current.classList.remove('active-expand-more-icon')
            }
        }
    }, [selectedItem])

    const toggleSelectedItemIcon = (ev: React.MouseEvent<HTMLDivElement>): void => {
        if (interactionIcon === 'clearRoundedIcon') {
            ev.stopPropagation()

            setSelectedItem(defaultDropdownValue)
        }
    }

    return (
        <div id='dropdown-container'>
            <div id='dropdown-header-container' onClick={() => setActiveDropdown(!activeDropdown)}>
                <span className='fs-pr-body-1 fw-regular'>{t(selectedItem)}</span>
                <div ref={iconToggleRef} onClick={toggleSelectedItemIcon}>
                    {
                        /* Create the mui svg component */
                        createElement<any>(Components[interactionIcon])
                    }
                </div>
            </div>

            <DropdownContent mount={activeDropdown} setCrItem={setSelectedItem}/>
        </div>
    )
}

export default Dropdown
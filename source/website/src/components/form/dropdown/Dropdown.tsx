import React, {createElement, useEffect, useRef, useState, memo} from 'react'
import {useTranslation} from 'react-i18next'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'

import useOnClickOutside from '../../../hooks/useOnClickOutside'

import DropdownContent from './DropdownContent'
import ListDropdownContent from './list_dropdown/ListDropdownContent'

import './Dropdown.css'

interface DropdownProps {
    prefix?: string
    defaultValue: string | number
    firstSelectedValue?: string | number
    items: string[] | number[]
    handleChange: Function
}

const Dropdown = ({prefix, defaultValue, firstSelectedValue, items, handleChange}: DropdownProps) => {

    const {t} = useTranslation()

    const iconToggleRef = useRef<HTMLDivElement>(null)

    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)
    const [dropdownItems, setDropdownItems] = useState<string[] | number[]>([])
    const [selectedItem, setSelectedItem] = useState<string | number>(firstSelectedValue !== undefined ? firstSelectedValue : defaultValue)
    const [interactionIcon, setInteractionIcon] = useState<string>('expandMoreRoundedIcon')

    /* Always hide the component when clicking outside the component */
    const [dropdownRef] = useOnClickOutside(() => activeDropdown ? setActiveDropdown(false) : null)

    /* List of all the svg mui icon components -> the name is mapped to the original component by reference
    * by using this the typescript array can use the name of the components, and it can be mapped to the real component
    * by reference */
    const Components: { [key: string]: any } = {
        'expandMoreRoundedIcon': ExpandMoreRoundedIcon,
        'clearRoundedIcon': ClearRoundedIcon
    }

    useEffect(() => {
        setSelectedItem(() => defaultValue)
    }, [defaultValue])

    useEffect(() => {
        if (items.length > 0) {
            setDropdownItems(() => items.sort((n1, n2) => {
                if (n1 > n2) {
                    return 1
                }

                if (n1 < n2) {
                    return -1
                }

                return 0
            }))
        }
    }, [items])

    /* Change the icon when dropdown content render state changes */
    useEffect((): void => {
        if (iconToggleRef.current !== null) {
            iconToggleRef.current.classList.toggle('active--expand-more--icon')
        }
    }, [activeDropdown])

    useEffect((): void => {
        /* User selected item */
        if (selectedItem !== defaultValue) {
            setInteractionIcon('clearRoundedIcon')
        } else {
            setInteractionIcon('expandMoreRoundedIcon')

            /* User deleted selected item, so the default value will be displayed -> arrow down */
            if (iconToggleRef.current !== null) {
                iconToggleRef.current.classList.remove('active--expand-more--icon')
            }
        }

        /* Something changed so call the method */
        handleChange(selectedItem)
    }, [selectedItem])

    const resetSelection = (ev: React.MouseEvent<HTMLDivElement>): void => {
        if (interactionIcon === 'clearRoundedIcon') {
            ev.stopPropagation()
            setSelectedItem(defaultValue)

            setActiveDropdown(() => false)
        }
    }

    return (
        <div ref={dropdownRef} id='dropdown-container'>
            <div id='dropdown-header-container' onClick={() => setActiveDropdown(prev => !prev)}>
                <span className='fs-pr-body-1 fw-regular'>
                    {prefix ? t(prefix) : ''} {selectedItem}
                </span>
                <div ref={iconToggleRef} onClick={resetSelection}>
                    {
                        /* Create the mui svg component */
                        createElement<any>(Components[interactionIcon])
                    }
                </div>
            </div>

            <DropdownContent mount={activeDropdown}
                             dropdownContent={<ListDropdownContent setMount={setActiveDropdown} items={dropdownItems}
                                                                   crItem={selectedItem}
                                                                   setCrItem={setSelectedItem}/>}/>
        </div>
    )
}

export default memo(Dropdown)
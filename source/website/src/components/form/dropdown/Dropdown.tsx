import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import DropdownContent from './DropdownContent'
import './Dropdown.css'

const Dropdown = () => {

    const {t} = useTranslation();

    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<string>('Select Item')

    useEffect(() => {
        const expandMoreContainer = document.querySelector<Element>('#dropdown-header-container > div')

        if (expandMoreContainer !== null) {
            expandMoreContainer.classList.toggle('active-expand-more-icon')
        }
    }, [activeDropdown])

    /* Callback function for the dropdown content - so that
    the selectedItem can be accessed in this component */
    const setCrItem = (item: string): void => {
        setSelectedItem(item)
    }

    return (
        <div id='dropdown-container'>
            <div id='dropdown-header-container' onClick={() => setActiveDropdown(!activeDropdown)}>
                <span className='fs-pr-body-1 fw-regular'>{t(selectedItem)}</span>
                <div>
                    <ExpandMoreRoundedIcon/>
                </div>
            </div>

            <DropdownContent mount={activeDropdown} crItem={setCrItem}/>
        </div>
    );
};

export default Dropdown;
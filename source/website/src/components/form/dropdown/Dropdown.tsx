import React, {useEffect, useState} from 'react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import './Dropdown.css'
import DropdownContent from './DropdownContent';
import useHover from '../../../hooks/useHover';
import TooltipManager from "../../ui/tooltip/TooltipManager";
import {useTranslation} from "react-i18next";

const Dropdown = () => {

    const {t} = useTranslation();

    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)
    const [tooltipDropdownText, setTooltipDropdownText] = useState<string>('Click to expand')
    const [hoverRef, isHovered] = useHover();

    useEffect(() => {
        window.addEventListener('click', (ev) => {

            const expandDropdownContainer = document.querySelector<Element>('#dropdown-header-container > div')
            const expandDropdownSVG = document.querySelector<Element>('#dropdown-header-container > div > svg')
            const expandDropdownPath = document.querySelector<Element>('#dropdown-header-container > div > svg > path')

            if (ev.target !== expandDropdownContainer && ev.target !== expandDropdownSVG && ev.target !== expandDropdownPath) {
                setActiveDropdown(false)
            }
        })
    }, [])

    useEffect(() => {
        const expandMoreContainer = document.querySelector<Element>('#dropdown-header-container > div')

        if (expandMoreContainer !== null) {
            expandMoreContainer.classList.toggle('active-expand-more-icon')
            if (activeDropdown) {
                setTooltipDropdownText('Click to collapse')
            } else {
                setTooltipDropdownText('Click to expand')
            }
        }
    }, [activeDropdown])

    return (
        <>
            <div id='dropdown-container'>
                <div id='dropdown-header-container'>
                    <span className='fs-pr-body-1 fw-regular'>Select Item</span>
                    <div ref={hoverRef} onClick={() => setActiveDropdown(!activeDropdown)}>
                        <ExpandMoreRoundedIcon/>
                    </div>
                </div>

                <DropdownContent mount={activeDropdown}/>
            </div>

            {
                (isHovered) ? <TooltipManager
                    content={<span className='fs-pr-body-1 fw--semi-bold'>{t(tooltipDropdownText)}</span>}/> : null
            }
        </>
    );
};

export default Dropdown;
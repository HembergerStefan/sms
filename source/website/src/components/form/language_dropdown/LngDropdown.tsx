import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import usa from '../../../data/images/language_dropdown/usa_icon.svg'
import austria from '../../../data/images/language_dropdown/austria_icon.svg'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import './LngDropdown.css'

const LngDropdown = () => {

    /* Translation Hook */
    const {i18n} = useTranslation();

    const [crLngIcon, setCrLngIcon] = useState(usa)

    useEffect(() => {
        const crLng = localStorage.getItem('lng')

        if (crLng !== null) {
            (crLng === 'en') ? setCrLngIcon(usa) : setCrLngIcon(austria)
        }
    }, [])

    /* Translation Method */
    const handleChangeLng = (lng: string) => {
        i18n.changeLanguage(lng);

        localStorage.setItem('lng', lng);
    };

    return (
        <div id='language-container'>
            <button id='language-change'>
                <img className='language-icon' src={crLngIcon} alt='lngIcon'/>
                <ExpandMoreRoundedIcon id='expand-more-icon'/>
            </button>

            <ul id='language-dropdown-content'>
                <li onClick={() => {
                    handleChangeLng('en')
                    setCrLngIcon(usa)
                }}>
                    <img className='language-icon' src={usa} alt='lngIcon'/>
                    <span className='fs-sc-body-1 fw--semi-bold'>English</span>
                </li>

                <li onClick={() => {
                    handleChangeLng('de')
                    setCrLngIcon(austria)
                }}>
                    <img className='language-icon' src={austria} alt='lngIcon'/>
                    <span className='fs-sc-body-1 fw--semi-bold'>Deutsch</span>
                </li>
            </ul>
        </div>
    );
};

export default LngDropdown;
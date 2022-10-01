import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useTranslation} from 'react-i18next';
import usa from '../../../data/images/language_dropdown/usa_icon.svg'
import austria from '../../../data/images/language_dropdown/austria_icon.svg'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Tooltip from '../../ui/tooltip/Tooltip';
import './LngDropdown.css'

const LngDropdown = () => {

    /* Translation Hook */
    const {t, i18n} = useTranslation();

    const [crLngIcon, setCrLngIcon] = useState(usa)
    const [renderComponent, setRenderComponent] = useState(false)

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
        <>
            <div id='language-container' className='clr-pr-1'>
                <button id='language-change'
                        onMouseOver={() => setRenderComponent(true)}
                        onMouseLeave={() => setRenderComponent(false)}>
                    <img className='language-icon' src={crLngIcon} alt='lngIcon'/>
                    <ExpandMoreRoundedIcon id='expand-more-icon'/>
                </button>

                <ul id='language-dropdown-content'>
                    <li onClick={() => {
                        handleChangeLng('en')
                        setCrLngIcon(usa)
                    }}>
                        <img className='language-icon' src={usa} alt='lngIcon'/>
                        <span className='fs-pr-body-1 fw--semi-bold'>English</span>
                    </li>

                    <li onClick={() => {
                        handleChangeLng('de')
                        setCrLngIcon(austria)
                    }}>
                        <img className='language-icon' src={austria} alt='lngIcon'/>
                        <span className='fs-pr-body-1 fw--semi-bold'>Deutsch</span>
                    </li>
                </ul>
            </div>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Tooltip content={
                        <>
                            <span className='fs-qi-1 fw--semi-bold'>📄 {t('Change Language')}</span>
                            <span
                                className='fs-pr-body-1 fw-regular clr-sc-1 mg-t-small'>{t('Customize the Dashboard language preset')}.</span>
                        </>
                    }/>,
                    document.querySelector('#layout-container')!) : null
            }
        </>
    );
};

export default LngDropdown;
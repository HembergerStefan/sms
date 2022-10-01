import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from '@mui/icons-material/Settings';
import {useTranslation} from 'react-i18next';
import Tooltip from '../tooltip/Tooltip';
import ReactDOM from 'react-dom';

interface SideBarListItemProps {
    value: any
}

const SideBarListItem = ({value}: SideBarListItemProps) => {

    const {t} = useTranslation();

    const [renderComponent, setRenderComponent] = useState(false)

    // Assigning location variable
    const location = useLocation();
    // Destructuring pathname from location
    const {pathname} = location;
    // Javascript split method to get the name of the path in array
    const splitLocation = pathname.split('/');

    /* List of all the svg mui icon components -> the name is mapped to the original component by reference
    * by using this the typescript array can use the name of the components and it can be mapped to the real component
    * by reference */
    const Components: { [key: string]: any } = {
        dashboardRoundedIcon: DashboardRoundedIcon,
        devicesRoundedIcon: DevicesRoundedIcon,
        groupsIcon: GroupsIcon,
        terminalRoundedIcon: TerminalRoundedIcon,
        appsRoundedIcon: AppsRoundedIcon,
        personIcon: PersonIcon,
        settingsIcon: SettingsIcon
    };

    useEffect(() => {
        const sideBarContainer = document.querySelector('.active-sidebar-layout')

        if (sideBarContainer === null) {
            setRenderComponent(false)
        }
    }, [renderComponent])

    return (
        <>
            <li
                className={`clr-pr-1 side-image--text-wrapper ${(splitLocation[1] === value.url) ? 'side-active-nav-item' : ''}`}>
                <Link to={`/${value.url}`} onMouseOver={() => setRenderComponent(true)}
                      onMouseLeave={() => setRenderComponent(false)}>
                    {
                        /* Create the mui svg component */
                        React.createElement(Components[value.image], {style: {fontSize: '24px'}})
                    }
                    <span className='fs-sc-body-1 fw--semi-bold'>{t(value.title)}</span>
                </Link>
            </li>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Tooltip content={<span className='fs-pr-body-1 fw--semi-bold'>{t(value.title)}</span>}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </>
    );
};

export default SideBarListItem;
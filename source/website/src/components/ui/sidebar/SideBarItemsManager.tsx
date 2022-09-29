import React, {useEffect, useRef} from 'react';
import {Link, useLocation} from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {NavBarItems} from '../../../data/navbar/NavBarItems';
import {useTranslation} from 'react-i18next';
import '../tooltip/Tooltip.css'

const SideBarItemsManager = ({startIndex, endIndex}: { startIndex: number, endIndex: number }) => {

    const {t} = useTranslation();

    // Assigning location variable
    const location = useLocation();
    // Destructuring pathname from location
    const {pathname} = location;
    // Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

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

    return (
        <ul>
            {
                NavBarItems.slice(startIndex, endIndex).map((value, index) => (
                    <li key={index}
                        className={`side-image--text-wrapper ${(splitLocation[1] === value.url) ? 'side-active-nav-item' : ''}`}>
                        <Link to={`/${value.url}`} data-tooltip={t(value.title)}>
                            {
                                /* Create the mui svg component */
                                React.createElement(Components[value.image])
                            }
                            <span className='fs-qi-1 fw--semi-bold'>{t(value.title)}</span>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
};

export default SideBarItemsManager;
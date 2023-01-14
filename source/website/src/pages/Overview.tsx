import React, {useEffect, useRef, useState} from 'react'

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'

import Dropdown from '../components/form/dropdown/Dropdown'
import KPIComponent from "../components/ui/kpi_component/KPIComponent"
import FullSize from "../components/form/menu/full_size/FullSizeButton";
import TextListComponent from "../components/ui/text_list_component/TextListComponent";
import ScriptDialogToggle from "../components/form/script_dialog_toggle/ScriptDialogToggle";
import SolidDialogButton from "../components/form/dialog_button/solid/SolidDialogButton";
import SolidOutlinedDialogButton
    from "../components/form/dialog_button/outlined/solid_outlined/SolidOutlinedDialogButton";
import DashedOutlinedDialogButton
    from "../components/form/dialog_button/outlined/dashed_outlined/DashedOutlinedDialogButton";
import {useTranslation} from "react-i18next";
import BasicTable from "../components/ui/table/basic_table/BasicTable";
import {DataTypes} from "../data/data_types";
import BasicCardList from "../components/ui/card_list/basic_card_list/BasicCardList";
import BasicCardListManager from "../components/ui/card_list/basic_card_list_manager/BasicCardListManager";
import AvailableClientsList from "../components/ui/available_clients_list/AvailableClientsList";

const Overview = () => {

    const {t} = useTranslation()

    const cnRef = useRef<HTMLDivElement>(null)

    const [userName, setUserName] = useState('Håkon Wium Lie')
    const [welcomeMessage, setWelcomeMessage] = useState({title: 'Welcome', subTitle: 'How are you feeling today?'})

    const hours: number = new Date().getHours()

    useEffect((): void => {
        getMessageToTime(hours)
    }, [hours])

    const getMessageToTime = (hours: number): void => {
        if (hours < 11) {
            setWelcomeMessage({title: 'Good Morning', subTitle: 'Have you had a good start to the day?'})
        } else if (hours >= 11 && hours <= 12) {
            setWelcomeMessage({title: 'Good Noon', subTitle: 'Lunchtime.'})
        } else if (hours > 12 && hours <= 18) {
            setWelcomeMessage({title: 'Good Afternoon', subTitle: 'Did you finish of some task?'})
        } else {
            setWelcomeMessage({title: 'Good Evening', subTitle: 'Have a restful night.'})
        }
    }

    const ITEMS = [
        'Adobe Illustrator',
        'WebStorm',
        'IntelliJ IDEA Ultimate',
        'Figma',
        'Spotify',
        'Windows Explorer',
        'Steam'
    ]

    return (
        <div style={{
            height: '100%',
            width: '100%',
            background: 'var(--nl-clr-1)',
            borderRadius: '25px 0 0 0',
            padding: '40px',
            gridArea: 'main',
            overflow: 'auto'
        }}>
            <h1 className='fs-pr-1 fw--semi-bold'>{t(welcomeMessage.title)}, {userName}!</h1>
            <span className='fs-pr-body-1 fw-regula'>{t(welcomeMessage.subTitle)}</span>

            <br/>
            <br/>

            <AvailableClientsList/>

            <br/>
            <br/>

            <BasicCardListManager/>
            <br/>
            <br/>
            <BasicTable tableType={DataTypes.SCRIPT}/>
            <br/>
            <br/>
            <BasicTable tableType={DataTypes.PACKAGE}/>
            <br/>
            <br/>


            <div style={{display: 'flex', gap: '10px'}}>
                <SolidDialogButton placeholder='Click me' onOnClick={() => {
                }}/>
                <SolidOutlinedDialogButton placeholder='Click me' onOnClick={() => {
                }}/>
                <DashedOutlinedDialogButton placeholder='Click me' onOnClick={() => {
                }}/>
            </div>

            <br/>
            <br/>

            <ScriptDialogToggle/>

            <br/>
            <br/>

            <div ref={cnRef} className='box'
                 style={{height: '80px', width: 'fit-content', display: 'flex', gap: '.5rem', padding: '5px'}}>
                <FullSize containerRef={cnRef} size='var(--icon-size-small)'/>
                {/*<KebabMenu size='var(--icon-size-small)'/>*/}
            </div>

            <br/>


            <Dropdown defaultValue='Select Item' items={ITEMS} handleChange={() => {
            }}/>

            {/*<ChartContainer/>*/}

            <br/>
            <br/>

            <TextListComponent
                headingContent={<h2 className='fs-qi-1 fw--semi-bold'>{t('Client-Script Execution')}</h2>}/>

            <br/>

            <div style={{display: 'flex', alignItems: ' center', gap: '1rem'}}>
                <KPIComponent title='Amount of Groups' value={4} icon={<PeopleAltRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Amount of Clients' value={15} icon={<DevicesRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                <KPIComponent title='Scripts executed' value={1} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
            </div>
        </div>
    )
}

export default Overview
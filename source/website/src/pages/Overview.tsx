import React, {useEffect, useRef, useState} from 'react'

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'

import Dropdown from '../components/form/dropdown/Dropdown'
import KPIComponent from "../components/ui/kpi_component/KPIComponent"
import FullSize from "../components/form/menu/full_size/FullSizeButton";
import KebabMenu from "../components/form/menu/kebab_menu/KebabMenuButton";
import Checkbox from "../components/form/checkbox/Checkbox";
import TextListComponent from "../components/ui/text_list_component/TextListComponent";
import {STATES} from "../components/form/checkbox/CheckboxStates";
import ChartContainer from "../components/ui/chart/ChartContainer";

const Overview = () => {

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
        } else if (hours >= 11 && hours <= 13) {
            setWelcomeMessage({title: 'Good Noon', subTitle: 'Lunchtime.'})
        } else if (hours > 13 && hours <= 18) {
            setWelcomeMessage({title: 'Good Afternoon', subTitle: 'Did you finish of some task?'})
        } else {
            setWelcomeMessage({title: 'Good Evening', subTitle: 'Sleeping time.'})
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

    const [isChecked, setChecked] = useState<string>(STATES.EMPTY)

    const handleChange = () => {
        let updatedChecked = STATES.EMPTY

        if (isChecked === STATES.EMPTY) {
            updatedChecked = STATES.INDETERMINATE
        } else if (isChecked === STATES.INDETERMINATE) {
            updatedChecked = STATES.CHECKED
        }

        setChecked(updatedChecked)
    }

    return (
        <div style={{
            height: '100%',
            width: '100%',
            background: 'var(--nl-clr-1)',
            borderRadius: '25px 0 0 0',
            padding: '40px',
            gridArea: 'main'
        }}>
            <h1 className='fs-pr-1 fw--semi-bold'>{welcomeMessage.title}, {userName}!</h1>
            <span className='fs-pr-body-1 fw-regula'>{welcomeMessage.subTitle}</span>

            <br/>
            <br/>

            <Checkbox value={isChecked} handleChange={handleChange}/>

            <br/>
            <br/>

            <div ref={cnRef} className='box'
                 style={{height: '80px', width: 'fit-content', display: 'flex', gap: '.5rem', padding: '5px'}}>
                <FullSize containerRef={cnRef} size='var(--icon-size-small)'/>
                <KebabMenu size='var(--icon-size-small)'/>
            </div>

            <br/>


            <Dropdown defaultValue='Select Item' items={ITEMS}/>

            <ChartContainer/>

            <br/>
            <br/>

            <TextListComponent heading='Client-Script Execution'/>

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
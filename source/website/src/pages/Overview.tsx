import React, {useEffect, useState} from 'react'
import Dropdown from '../components/form/dropdown/Dropdown'
import KPIComponent from "../components/ui/kpi_component/KPIComponent";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';

const Overview = () => {

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

    return (
        <div style={{
            height: '100%',
            width: '100%',
            background: 'var(--nl-clr-1)',
            borderRadius: '25px 0 0 0',
            padding: '40px',
            gridArea: 'main'
        }}>
            <span className='fs-pr-1 fw--semi-bold clr-pr-1'>{welcomeMessage.title}, {userName}!</span>
            <br/>
            <span className='fs-pr-body-1 fw-regular clr-sc-1'>{welcomeMessage.subTitle}</span>

            <br/>
            <br/>

            <Dropdown/>

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
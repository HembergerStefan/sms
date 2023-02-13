import React, {useEffect, useState} from 'react'

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'

import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import TextListComponent from '../components/ui/text_list_component/TextListComponent'
import {useTranslation} from 'react-i18next'
import {DataTypes} from '../data/data_types'
import AvailableClientsList from '../components/ui/available_clients_list/AvailableClientsList'
import useChartScriptExecutionsStore, {Dataset} from '../stores/chartScriptExecutionsStore'
import useChartPackageInstallationsStore from '../stores/chartPackageInstallationsStore'
import FilterTable from '../components/ui/table/filter_table/FilterTable'
import useUserStore from '../stores/user_session/userStore'

import './Layout.css'

const Overview = () => {

    const {t} = useTranslation()

    const {username} = useUserStore()

    const [welcomeMessage, setWelcomeMessage] = useState({title: 'Welcome', subTitle: 'How are you feeling today?'})

    const hours: number = new Date().getHours()

    useEffect((): void => {
        getMessageToTime(hours)
    }, [hours])

    const getMessageToTime = (hours: number): void => {
        if (hours < 11) {
            setWelcomeMessage({title: 'Good Morning', subTitle: 'Have you had a good start to the day?'})
        } else if (hours >= 11 && hours <= 12) {
            setWelcomeMessage({title: 'Good Noon', subTitle: 'Get some brake.'})
        } else if (hours > 12 && hours <= 18) {
            setWelcomeMessage({title: 'Good Afternoon', subTitle: 'Did you finish of some task?'})
        } else {
            setWelcomeMessage({title: 'Good Evening', subTitle: 'Have a restful night.'})
        }
    }

    const {setLabels, setDataSets} = useChartScriptExecutionsStore()
    const {
        setPackageInstallationLabels,
        setPackageInstallationDataSets
    } = useChartPackageInstallationsStore()

    /* TODO: remove demo data/labels */
    useEffect(() => {
        setLabels(['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
        setPackageInstallationLabels(['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

        const data1: Dataset = {
            label: 'Executed',
            data: [18, 30, 24, 33, 42, 38, 44, 37, 34]
        }

        const data2: Dataset = {
            label: 'Not Executed',
            data: [28, 19, 34, 21, 28, 20, 25, 20, 24]
        }

        setDataSets([data1, data2])

        const data3: Dataset = {
            label: 'Installed',
            data: [28, 19, 20, 25, 28, 20, 34, 21, 24]
        }

        const data4: Dataset = {
            label: 'Not Installed',
            data: [44, 37, 34, 33, 42, 38, 18, 30, 24,]
        }

        setPackageInstallationDataSets([data3, data4])
    }, [])

    return (
        <section id='dashboard-layout--container'>
            <div>
                <h1 className='fs-pr-1 fw--semi-bold'>{t(welcomeMessage.title)}, {username}!</h1>
                <span className='fs-pr-body-1 fw-regula'>{t(welcomeMessage.subTitle)}</span>
            </div>

            <div style={{display: 'flex', alignItems: ' center', gap: '30px'}}>
                <KPIComponent title='Amount of Groups' value={4} icon={<PeopleAltRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Amount of Clients' value={15} icon={<DevicesRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                <KPIComponent title='Scripts executed' value={1} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
                <KPIComponent title='Packages installed' value={23} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
            </div>

            <div style={{display: 'flex', gap: '30px'}}>
                <AvailableClientsList/>

                <TextListComponent headingContent={
                    <h2 className='fs-qi-1 fw--semi-bold'>{t('Latest Activities')}</h2>
                }/>
            </div>

            <FilterTable tableType={DataTypes.SCRIPT}/>
        </section>
    )
}

export default Overview
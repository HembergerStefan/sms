import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded'

import useScriptStore from '../stores/script/scriptInformationStore'
import {DataTypes} from '../data/data_types'

import {useUserPermittedQuery} from '../utils/api/ApiService'

import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import BasicTable from '../components/ui/table/basic_table/BasicTable'
import TaskButton from '../components/form/common_button/task_button/TaskButton'
import DialogManager from '../components/ui/dialog/DialogManager'

import './Layout.css'

const Clients = () => {

    const {t} = useTranslation()

    const {scripts, getExecutedScripts, getNotExecutedScripts} = useScriptStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])
    return (
        <section id='dashboard-layout--container'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h1 className='fs-tr-1 fw--semi-bold'>{t('Scripts')}</h1>
                {
                    userPermitted ? <TaskButton task={() => {
                        setRenderDialogComponent(() => true)
                    }} taskName='Add Script' icon={<AddRoundedIcon/>}/> : null
                }
            </div>

            <div id='kpi-wrapper'>
                <KPIComponent title='Amount of Scripts' value={scripts.length} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Scripts executed' value={getExecutedScripts().length}
                              icon={<CheckBoxRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
                <KPIComponent title='Scripts not executed' value={getNotExecutedScripts().length}
                              icon={<DangerousRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
            </div>

            <BasicTable tableType={DataTypes.SCRIPT}/>

            <DialogManager dialogTyp={DataTypes.SCRIPT}
                           title='Add Script' editMode={false}
                           displayId={scripts.length + 1}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </section>
    )
}

export default Clients
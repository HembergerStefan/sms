import React, {useState} from 'react'
import BasicCardListManager from '../components/ui/card_list/basic_card_list_manager/BasicCardListManager'
import KPIComponent from '../components/ui/kpi_component/KPIComponent'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import {DataTypes} from '../data/data_types'
import TextListComponent from '../components/ui/text_list_component/TextListComponent'
import TaskButton from '../components/form/common_button/task_button/TaskButton'
import DialogManager from '../components/ui/dialog/DialogManager'
import {useTranslation} from "react-i18next";

const Devices = () => {

    const {t} = useTranslation()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)

    return (
        <div style={{
            height: '100%', width: '100%', background: 'var(--nl-clr-1)', borderRadius: '25px 0 0 0',
            padding: '40px', gridArea: 'main', overflow: 'auto'
        }}>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h1 className='fs-tr-1 fw--semi-bold'>Clients</h1>
                <TaskButton task={() => {
                    setRenderDialogComponent(() => true)
                }} taskName='Add Client'/>
            </div>

            <div style={{display: 'flex', alignItems: ' center', gap: '50px', margin: '28px 0'}}>
                <KPIComponent title='Amount of Packages' value={28} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Package installation pending' value={2} icon={<DevicesRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                <KPIComponent title='Packages not installed' value={5} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
                <KPIComponent title='Packages installed' value={23} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
            </div>

            <div style={{display: 'grid', gap: '28px', margin: '30px 0'}}>
                <div style={{display: 'flex', gap: '50px', margin: '30px 0'}}>
                    <TextListComponent headingContent={
                        <h2 className='fs-qi-1 fw--semi-bold'>Client-Script Execution</h2>
                    }/>

                    <TextListComponent headingContent={
                        <h2 className='fs-qi-1 fw--semi-bold'>Client-Package Installation</h2>
                    }/>
                </div>

                <BasicCardListManager/>
            </div>


            <DialogManager dialogTyp={DataTypes.CLIENT}
                           title='Add Client' editMode={false}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </div>
    )
}

export default Devices
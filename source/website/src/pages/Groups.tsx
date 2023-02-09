import React, {useState} from 'react'
import KPIComponent from "../components/ui/kpi_component/KPIComponent"
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded"
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded"
import {DataTypes} from "../data/data_types"
import FilterTable from "../components/ui/table/filter_table/FilterTable"
import {useTranslation} from "react-i18next"
import DialogManager from "../components/ui/dialog/DialogManager"
import TaskButton from "../components/form/common_button/task_button/TaskButton"
import useGroupStore from "../stores/groupInformationStore"

import './Layout.css'

const Clients = () => {

    const {t} = useTranslation()

    const {groups, getClientsOfGroups, getAverageClientsPerGroup} = useGroupStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)

    return (
        <div id='dashboard-layout--container'>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <h1 className='fs-tr-1 fw--semi-bold'>Groups</h1>
                    <TaskButton task={() => {
                        setRenderDialogComponent(() => true)
                    }} taskName='Add Group'/>
                </div>

                <div style={{display: 'flex', alignItems: ' center', gap: '50px', margin: '28px 0'}}>
                    <KPIComponent title='Amount of Groups' value={groups.length} icon={<TerminalRoundedIcon/>}
                                  theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                    <KPIComponent title='Total Clients in Groups' value={getClientsOfGroups().length}
                                  icon={<DevicesRoundedIcon/>}
                                  theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                    <KPIComponent title='Average Clients per Group' value={getAverageClientsPerGroup()} icon={<TerminalRoundedIcon/>}
                                  theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
                </div>

                <FilterTable tableType={DataTypes.GROUP}/>

                <DialogManager dialogTyp={DataTypes.GROUP}
                               title='Add Group' editMode={false}
                               renderComponent={renderDialogComponent}
                               setRenderComponent={setRenderDialogComponent}/>
            </div>
        </div>
    )
}

export default Clients
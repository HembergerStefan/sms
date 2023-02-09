import React, {useEffect, useState} from 'react';
import KPIComponent from "../components/ui/kpi_component/KPIComponent";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import ChartContainer from "../components/ui/chart/ChartContainer";
import {ChartTypes} from "../data/chart_types";
import ChartPackageInstallationsDropdownContent
    from "../components/form/dropdown/chart/package_installations/ChartPackageInstallationsDropdownContent";
import BasicTable from "../components/ui/table/basic_table/BasicTable";
import {DataTypes} from "../data/data_types";
import useChartScriptExecutionsStore, {Dataset} from "../stores/chartScriptExecutionsStore";
import ChartScriptExecutionsDropdownContent
    from "../components/form/dropdown/chart/script_executions/ChartScriptExecutionDropdownContent";
import {useTranslation} from "react-i18next";
import TaskButton from "../components/form/common_button/task_button/TaskButton";
import DialogManager from "../components/ui/dialog/DialogManager";

const Clients = () => {

    const {t} = useTranslation()

    const {labels, dataSets, tickStepSize, setLabels, setDataSets} = useChartScriptExecutionsStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)

    /* TODO: remove demo data/labels */
    useEffect(() => {
        setLabels(['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

        const data1: Dataset = {
            label: 'Executed',
            data: [18, 30, 24, 33, 42, 38, 44, 37, 34]
        }

        const data2: Dataset = {
            label: 'Not Executed',
            data: [28, 19, 34, 21, 28, 20, 25, 20, 24]
        }

        setDataSets([data1, data2])
    }, [])

    return (
        <div style={{
            height: '100%', width: '100%', background: 'var(--nl-clr-1)', borderRadius: '25px 0 0 0',
            padding: '40px', gridArea: 'main', overflow: 'auto'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h1 className='fs-tr-1 fw--semi-bold'>Scripts</h1>
                <TaskButton task={() => {
                    setRenderDialogComponent(() => true)
                }} taskName='Add Script'/>
            </div>

            <div style={{display: 'flex', alignItems: ' center', gap: '50px', marginTop: '28px'}}>
                <KPIComponent title='Amount of Packages' value={28} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
                <KPIComponent title='Package installation pending' value={2} icon={<DevicesRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-1')}/>
                <KPIComponent title='Packages not installed' value={5} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-3')}/>
                <KPIComponent title='Packages installed' value={23} icon={<TerminalRoundedIcon/>}
                              theme={getComputedStyle(document.body).getPropertyValue('--ac-clr-2')}/>
            </div>

            <div style={{display: 'flex', gap: '50px', margin: '30px 0'}}>
                <ChartContainer chartType={ChartTypes.LINE} boxHeading='Script Executions'
                                dropdownContent={<ChartScriptExecutionsDropdownContent/>} labels={labels}
                                dataSets={dataSets}
                                tickStepSize={tickStepSize}/>
            </div>

            <BasicTable tableType={DataTypes.SCRIPT}/>

            <DialogManager dialogTyp={DataTypes.SCRIPT}
                           title='Add Script' editMode={false}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </div>
    );
};

export default Clients;
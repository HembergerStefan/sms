import React, {useEffect} from 'react';
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

const Clients = () => {

    const {labels, dataSets, tickStepSize, setLabels, setDataSets} = useChartScriptExecutionsStore()

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
            <h1 className='fs-sc-1 fw--semi-bold'>All Scripts</h1>

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
        </div>
    );
};

export default Clients;
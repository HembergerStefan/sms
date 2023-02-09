import React, {useEffect, useState} from 'react';
import {ChartTypes} from "../data/chart_types";
import ChartPackageInstallationsDropdownContent
    from "../components/form/dropdown/chart/package_installations/ChartPackageInstallationsDropdownContent";
import ChartContainer from "../components/ui/chart/ChartContainer";
import useChartPackageInstallationsStore from "../stores/chartPackageInstallationsStore";
import {Dataset} from "../stores/chartScriptExecutionsStore";
import AvailableClientsList from "../components/ui/available_clients_list/AvailableClientsList";
import TextListComponent from "../components/ui/text_list_component/TextListComponent";
import KPIComponent from "../components/ui/kpi_component/KPIComponent";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import {DataTypes} from "../data/data_types";
import BasicTable from "../components/ui/table/basic_table/BasicTable";
import {useTranslation} from "react-i18next";
import TaskButton from "../components/form/common_button/task_button/TaskButton";
import DialogManager from "../components/ui/dialog/DialogManager";

const Clients = () => {

    const {t} = useTranslation()

    const {
        packageInstallationlabels,
        packageInstallationDataSets,
        packageInstallationTickStepSize,
        setPackageInstallationLabels,
        setPackageInstallationDataSets
    } = useChartPackageInstallationsStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)

    /* TODO: remove demo data/labels */
    useEffect(() => {
        setPackageInstallationLabels(['April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

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
        <div style={{
            height: '100%', width: '100%', background: 'var(--nl-clr-1)', borderRadius: '25px 0 0 0',
            padding: '40px', gridArea: 'main', overflow: 'auto'
        }}>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <h1 className='fs-tr-1 fw--semi-bold'>Packages</h1>
                <TaskButton task={() => {
                    setRenderDialogComponent(() => true)
                }} taskName='Add Package'/>
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
                <ChartContainer chartType={ChartTypes.LINE} boxHeading='Package Installations'
                                dropdownContent={<ChartPackageInstallationsDropdownContent/>}
                                labels={packageInstallationlabels}
                                dataSets={packageInstallationDataSets}
                                tickStepSize={packageInstallationTickStepSize}/>

                <ChartContainer chartType={ChartTypes.BAR} boxHeading='Package Installations'
                                dropdownContent={<ChartPackageInstallationsDropdownContent/>}
                                labels={packageInstallationlabels}
                                dataSets={packageInstallationDataSets}
                                tickStepSize={packageInstallationTickStepSize}/>
            </div>

            <BasicTable tableType={DataTypes.PACKAGE}/>

            <DialogManager dialogTyp={DataTypes.PACKAGE}
                           title='Add Package' editMode={false}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </div>
    );
};

export default Clients;
import React from 'react';
import BasicCardListManager from "../components/ui/card_list/basic_card_list_manager/BasicCardListManager";
import KPIComponent from "../components/ui/kpi_component/KPIComponent";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import ChartContainer from "../components/ui/chart/ChartContainer";
import {ChartTypes} from "../data/chart_types";
import ChartPackageInstallationsDropdownContent
    from "../components/form/dropdown/chart/package_installations/ChartPackageInstallationsDropdownContent";
import BasicTable from "../components/ui/table/basic_table/BasicTable";
import {DataTypes} from "../data/data_types";
import TextListComponent from "../components/ui/text_list_component/TextListComponent";
import AvailableClientsList from "../components/ui/available_clients_list/AvailableClientsList";

const Main = () => {
    return (
        <div style={{
            height: '100%', width: '100%', background: 'var(--nl-clr-1)', borderRadius: '25px 0 0 0',
            padding: '40px', gridArea: 'main', overflow: 'auto'
        }}>

            <h1 className='fs-sc-1 fw--semi-bold'>All Clients</h1>

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
        </div>
    );
};

export default Main;
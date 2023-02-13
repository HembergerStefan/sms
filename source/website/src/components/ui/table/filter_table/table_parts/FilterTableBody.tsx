import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'
import {ColumnDef, flexRender, Table} from '@tanstack/react-table'

import {Client, DataTypes} from '../../../../../data/data_types'

import BoxHeading from '../../../box_heading_container/BoxHeading'
import BasicScriptTableDropdownContent
    from '../../../../form/dropdown/basic_table/basic_script_table/BasicScriptTableDropdownContent'
import BasicPackageTableDropdownContent
    from '../../../../form/dropdown/basic_table/basic_packaget_table/BasicPackageTableDropdownContent'
import useClientStore, {initialClientState} from "../../../../../stores/clientInformationStore"
import Dropdown from "../../../../form/dropdown/Dropdown"
import useFilterDataListStore from "../../../../../stores/filterDataListStore";

interface FilterTableBodyProps {
    table: Table<any>
    columns: ColumnDef<any, any>[]
    tableType: DataTypes
}

const FilterTableBody = ({table, columns, tableType}: FilterTableBodyProps) => {

    const {t} = useTranslation()

    /* Get the selected clients out of the store & the possibility to update the store */
    const {clients, getClientByName} = useClientStore()

    const {forClient, setForDataType, setForClient} = useFilterDataListStore()

    const defaultClient = clients.at(0) ?? initialClientState
    const [mountDropdown, setMountDropdown] = useState<boolean>(false)

    const CLIENT_NAME_ITEMS: string[] = clients.map(client => client.name)

    /* User selected item, so change the table size to it */
    const handleChange = (cr: string): void => {
        setForClient(getClientByName(cr))
    }

    const scriptFilter = (): void => {
        setForClient(forClient)
        setForDataType(DataTypes.SCRIPT)
    }

    const packageFilter = (): void => {
        setForClient(forClient)
        setForDataType(DataTypes.PACKAGE)
    }

    return (
        <tbody id='basic-table--body'>

        {/* Trick so that the header with the menu button is between the thead and the tbody with some margin,
                    but it spans over all the columns, so that the menu button will be on the right outer side and the
                    heading on the left outer side */}
        <tr>
            <td colSpan={columns.length} style={{borderRadius: 'var(--br-r-medium) var(--br-r-medium) 0 0'}}>
                <BoxHeading content={
                    <>
                        <h2 className='fs-qr-1 fw--semi-bold'>
                            {tableType === 0 ? t('Executed Scripts') : t('Installed Packages')}</h2>

                        <div id='filter--menu-items'>
                            <button className={tableType === 0 ? 'active--filter-button' : undefined}
                                    onClick={() => scriptFilter()}>
                                <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>{t('Scripts')}</span>
                            </button>

                            <button className={tableType === 1 ? 'active--filter-button' : undefined}
                                    onClick={() => packageFilter()}>
                                <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>{t('Packages')}</span>
                            </button>

                            <Dropdown defaultValue={defaultClient.name} items={CLIENT_NAME_ITEMS}
                                      handleChange={handleChange}/>
                        </div>
                    </>
                } dropdownContent={tableType === 0 ?
                    <BasicScriptTableDropdownContent setMountDropdown={setMountDropdown}/> :
                    <BasicPackageTableDropdownContent setMountDropdown={setMountDropdown}/>}
                            mountDropdown={mountDropdown} setMountDropdown={setMountDropdown}/>
            </td>
        </tr>

        {
            table.getPageCount() === 0 ? <tr>
                    <td colSpan={columns.length}>
                        <span className='fw--semi-bold clr-pr-1'>{t('No entries available')}!</span>
                    </td>
                </tr> :
                /* Display the row/cell content */
                table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {
                            row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
        }
        </tbody>
    )
}

export default FilterTableBody
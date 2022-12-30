import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'
import {ColumnDef, flexRender, Table} from '@tanstack/react-table'

import {BasicTableTypes} from '../BasicTable'

import BoxHeading from '../../../box_heading_container/BoxHeading'
import BasicScriptTableDropdownContent
    from '../../../../form/dropdown/basic_table/basic_script_table/BasicScriptTableDropdownContent'
import BasicPackageTableDropdownContent
    from "../../../../form/dropdown/basic_table/basic_packaget_table/BasicPackageTableDropdownContent";

interface BasicTableBodyProps {
    table: Table<any>
    columns: ColumnDef<any, any>[]
    tableType: BasicTableTypes
}

const BasicTableBody = ({table, columns, tableType}: BasicTableBodyProps) => {

    const {t} = useTranslation()
    const [mountDropdown, setMountDropdown] = useState<boolean>(false)

    return (
        <tbody id='basic-table--body'>

        {/* Trick so that the header with the menu button is between the thead and the tbody with some margin,
                    but it spans over all the columns, so that the menu button will be on the right outer side and the
                    heading on the left outer side */}
        <tr>
            <td colSpan={columns.length} style={{borderRadius: 'var(--br-r-medium) var(--br-r-medium) 0 0'}}>
                <BoxHeading content={
                    <h2 className='fs-qr-1 fw--semi-bold'>
                        {tableType === 0 ? t('All Scripts') : t('All Packages')}</h2>}
                            dropdownContent={tableType === 0 ? <BasicScriptTableDropdownContent/> :
                                <BasicPackageTableDropdownContent/>}
                            mountDropdown={mountDropdown}
                            setMountDropdown={setMountDropdown}/>
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

export default BasicTableBody
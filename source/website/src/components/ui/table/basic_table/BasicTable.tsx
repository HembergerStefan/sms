import React, {useEffect, useState} from 'react'

import {
    CellContext,
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable, ColumnDef,
} from '@tanstack/react-table'

import {Script, Package} from './basic_table_types/BasicTableTypes'
import {defaultScriptData, defaultPackageData} from './basic_table_demo_data/BasicTableDemoData'

import useDataListScriptStore from '../../../../store/dataListScriptStore'
import useDataListPackageStore from '../../../../store/dataListPackageStore'

import Checkbox from '../../../form/checkbox/Checkbox'
import Numbering from '../../numbering/Numbering'
import BasicTableHeader from './table_parts/BasicTableHeader'
import BasicTableBody from './table_parts/BasicTableBody'
import BasicTableFooter from './table_parts/BasicTableFooter'


import './BasicTable.css'

export enum BasicTableTypes {
    SCRIPT, PACKAGE
}

interface BasicTableProps {
    tableType: BasicTableTypes
}

const BasicTable = ({tableType}: BasicTableProps) => {

    const {
        setScriptTable,
        scriptPageSize,
        scriptPageIndex,
        setScriptPageIndex,
        setScriptPageCount
    } = useDataListScriptStore()

    const {
        setPackageTable,
        packagePageSize,
        packagePageIndex,
        setPackagePageIndex,
        setPackagePageCount
    } = useDataListPackageStore()

    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState(() => tableType === 0 ? [...defaultScriptData] : [...defaultPackageData])

    const columnHelper = createColumnHelper<Script & Package>()

    const scriptColumns: ColumnDef<any, any>[] = [
        {
            id: 'select',
            header: () => (
                <Checkbox {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }}
                />
            ),
            cell: ({row}: CellContext<Script, string>) => (
                <Checkbox {...{
                    checked: row.getIsSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
                />
            ),
            enableSorting: false,
        },
        columnHelper.accessor('title', {
            header: () => <h1>Title</h1>,
            cell: info => <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Numbering value={info.row.index}/>
                <span className='fw--semi-bold clr-pr-1'>{info.getValue()}</span>
            </div>,
        }),
        columnHelper.accessor('description', {
            header: () => <h1>Description</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('language', {
            header: () => <h1>Language</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('executionDate', {
            header: () => <h1>Execution Date</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('status', {
            header: () => <h1>Status</h1>,
            cell: info => <span>{info.getValue()}</span>,
        })
    ]

    const packageColumns: ColumnDef<any, any>[] = [
        {
            id: 'select',
            header: () => (
                <Checkbox {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }}
                />
            ),
            cell: ({row}: CellContext<Package, string>) => (
                <Checkbox {...{
                    checked: row.getIsSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
                />
            ),
            enableSorting: false,
        },
        columnHelper.accessor('title', {
            header: () => <h1>Title</h1>,
            cell: info => <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Numbering value={info.row.index}/>
                <span className='fw--semi-bold clr-pr-1'>{info.getValue()}</span>
            </div>,
        }),
        columnHelper.accessor('version', {
            header: () => <h1>Version</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('installationDate', {
            header: () => <h1>Installation Date</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('status', {
            header: () => <h1>Status</h1>,
            cell: info => <span>{info.getValue()}</span>,
        })
    ]

    const columns: ColumnDef<any, any>[] = tableType === 0 ? scriptColumns : packageColumns

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    useEffect(() => {
        if (tableType === 0) {
            setScriptTable(table)
            table.setPageIndex(scriptPageIndex)
        } else {
            setPackageTable(table)
            table.setPageIndex(packagePageIndex)
        }
    }, [])

    /* React to changes on the table page size */
    useEffect(() => {
        if (tableType === 0) {
            table.setPageSize(scriptPageSize)
        } else {
            table.setPageSize(packagePageSize)
        }
    }, [scriptPageSize, packagePageSize])

    let index = table.getState().pagination.pageIndex

    /* React to changes on the table page index */
    useEffect(() => {
        if (tableType === 0) {
            setScriptPageIndex(index)
        } else {
            setPackagePageIndex(index)
        }
    }, [index])

    let pageCount = table.getPageCount()

    /* React to changes on the table page count */
    useEffect(() => {
        if (tableType === 0) {
            setScriptPageCount(pageCount)
        } else {
            setPackagePageCount(pageCount)
        }
    }, [pageCount])

    return (
        <table id='basic-table'>
            <BasicTableHeader table={table}/>
            <BasicTableBody table={table} columns={columns} tableType={tableType}/>
            <BasicTableFooter table={table} columns={columns}/>
        </table>
    )
}

export default BasicTable
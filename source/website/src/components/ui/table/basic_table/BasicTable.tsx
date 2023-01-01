import React, {useEffect, useMemo, useState} from 'react'

import {
    CellContext,
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    RowSelectionState,
    useReactTable, ColumnDef,
} from '@tanstack/react-table'

import {Script, Package} from '../../../../data/data_types'
import {defaultScriptData, defaultPackageData} from './basic_table_demo_data/BasicTableDemoData'

import useScriptStore from '../../../../store/scriptInformationStore'
import useDataListScriptStore from '../../../../store/dataListScriptStore'
import useDataListPackageStore from '../../../../store/dataListPackageStore'

import Checkbox from '../../../form/checkbox/Checkbox'
import Numbering from '../../numbering/Numbering'
import BasicTableHeader from './table_parts/BasicTableHeader'
import BasicTableBody from './table_parts/BasicTableBody'
import BasicTableFooter from './table_parts/BasicTableFooter'

import './BasicTable.css'
import DialogManager from "../../dialog/DialogManager";
import {useTranslation} from "react-i18next";
import usePackageStore from "../../../../store/packageInformationStore";
import RedirectButton from "../../../form/common_button/redirect_button/RedirectButton";
import StatusDisplaying from "../status_displaying/StatusDisplaying";

export enum BasicTableTypes {
    SCRIPT, PACKAGE
}

interface BasicTableProps {
    tableType: BasicTableTypes
}

const BasicTable = ({tableType}: BasicTableProps) => {

    const {t} = useTranslation()

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {scripts, setScripts, getScriptStatus} = useScriptStore()

    /* Get the selected packages out of the store & the possibility to update the store */
    const {_packages, setPackages, getPackageStatus} = usePackageStore()

    const {
        setScriptTable,
        scriptPageSize,
        scriptPageIndex,
        setScriptPageIndex,
        setScriptPageCount,
        setSelectionScriptRows
    } = useDataListScriptStore()

    const {
        setPackageTable,
        packagePageSize,
        packagePageIndex,
        setPackagePageIndex,
        setPackagePageCount
    } = useDataListPackageStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(-1)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState(() => tableType === 0 ? [...scripts] : [..._packages])

    /* Reload/Load table when data was modified (e.g.: added, deleted, ...) */
    useEffect(() => {
        setRowSelection(() => ({}))

        if (tableType === 0) {
            setData(() => scripts)
        } else {
            setData(() => _packages)
        }
    }, [scripts, _packages])

    const columnHelper = createColumnHelper<Script & Package>()

    const selectionColumn: ColumnDef<any, any> = (
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
        }
    )

    const titleColumn: ColumnDef<any, any> = (
        columnHelper.accessor('name', {
            header: () => <h1>{t('Name')}</h1>,
            cell: info => <div onClick={() => {
                setSelectedId(() => info.row.original.id)
                setRenderDialogComponent((prevState) => !prevState)
            }} style={{display: 'flex', alignItems: 'center', gap: '16px', width: 'fit-content', cursor: 'pointer'}}>
                <Numbering value={info.row.index + 1}/>
                <span className='fw--semi-bold clr-pr-1'>{info.getValue()}</span>
            </div>,
        })
    )

    const scriptColumns = useMemo<ColumnDef<any, any>[]>(() => [
        selectionColumn,
        titleColumn,
        columnHelper.accessor('description', {
            header: () => <h1>{t('Description')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('language', {
            header: () => <h1>{t('Language')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('executionDate', {
            header: () => <h1>{t('Execution Date')}</h1>,
            cell: info => <span>
                {info.getValue().getDate()} {t(info.getValue().toLocaleString('default', {month: 'long'}))} {info.getValue().getFullYear()}, {info.getValue().toLocaleTimeString().slice(0, info.getValue().toLocaleTimeString().length - 3)}
            </span>,
        }),
        {
            id: 'status',
            header: () => <h1>{t('Status')}</h1>,
            cell: info => <StatusDisplaying status={getScriptStatus(info.row.original.id)}
                                            success={getScriptStatus(info.row.original.id).toLowerCase() === 'executed'}/>,
            accessorFn: originalRow => getScriptStatus(originalRow.id)
        },
    ], [])

    const packageColumns = useMemo<ColumnDef<any, any>[]>(() => [
        selectionColumn,
        titleColumn,
        columnHelper.accessor('version', {
            header: () => <h1>{t('Version')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('installationDate', {
            header: () => <h1>{t('Installation Date')}</h1>,
            cell: info => <span>
                {info.getValue().getDate()} {t(info.getValue().toLocaleString('default', {month: 'long'}))} {info.getValue().getFullYear()}, {info.getValue().toLocaleTimeString().slice(0, info.getValue().toLocaleTimeString().length - 3)}
            </span>,
        }),
        {
            id: 'status',
            header: () => <h1>{t('Status')}</h1>,
            cell: info => <StatusDisplaying status={getPackageStatus(info.row.original.id)}
                                            success={getPackageStatus(info.row.original.id).toLowerCase() === 'installed'}/>,
            accessorFn: originalRow => getPackageStatus(originalRow.id)
        },
        columnHelper.accessor('url', {
            header: () => <h1>{t('Link')}</h1>,
            cell: info => <div style={{width: 'fit-content'}}>
                <RedirectButton content='Got to page' url={info.getValue()} target='_blank'/>
            </div>
        }),
    ], [])

    const columns: ColumnDef<any, any>[] = tableType === 0 ? scriptColumns : packageColumns

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        /* TODO: Remove demo data */
        setScripts(defaultScriptData)
        setPackages(defaultPackageData)

        if (tableType === 0) {
            setScriptTable(table)
            table.setPageIndex(scriptPageIndex)
        } else {
            setPackageTable(table)
            table.setPageIndex(packagePageIndex)
        }
    }, [])

    /* React to changes on the table row selection */
    useEffect(() => {
        if (tableType === 0) {
            const rows: number[] = []

            Object.entries(rowSelection).forEach(([key]) => {
                rows.push(table.getRow(key).original.id)
            })

            setSelectionScriptRows(rows)
        }
    }, [rowSelection])

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
        <>
            <DialogManager title='Update Script Information' editMode={true} selectedId={selectedId}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>

            <table id='basic-table'>
                <BasicTableHeader table={table}/>
                <BasicTableBody table={table} columns={columns} tableType={tableType}/>
                <BasicTableFooter table={table} columns={columns}/>
            </table>
        </>
    )
}

export default BasicTable
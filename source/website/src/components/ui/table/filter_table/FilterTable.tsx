import React, {useEffect, useMemo, useState} from 'react'

import {useTranslation} from 'react-i18next'
import {
    CellContext,
    ColumnDef,
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'

import {Client, DataTypes, Package, Script} from '../../../../data/data_types'
import useScriptStore from '../../../../stores/scriptInformationStore'
import useDataListScriptStore from '../../../../stores/dataListScriptStore'
import useDataListPackageStore from '../../../../stores/dataListPackageStore'
import usePackageStore from '../../../../stores/packageInformationStore'
import useClientStore, {initialClientState} from '../../../../stores/clientInformationStore'

import Checkbox from '../../../form/checkbox/Checkbox'
import Numbering from '../../numbering/Numbering'

import BasicTableHeader from '../basic_table/table_parts/BasicTableHeader'
import FilterTableBody from './table_parts/FilterTableBody'
import BasicTableFooter from '../basic_table/table_parts/BasicTableFooter'
import DialogManager from '../../dialog/DialogManager'
import RedirectButton from '../../../form/common_button/redirect_button/RedirectButton'
import StatusDisplaying from '../status_displaying/StatusDisplaying'

import '../basic_table/BasicTable.css'
import './FilterTable.css'
import useFilterDataListStore from "../../../../stores/filterDataListStore";
import FilterTableHeader from "./table_parts/FilterTableHeader";

interface FilterTableProps {
    tableType: DataTypes
}

const FilterTable = ({tableType}: FilterTableProps) => {

    const {t} = useTranslation()

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {getScriptStatus, getScriptById} = useScriptStore()

    /* Get the selected packages out of the store & the possibility to update the store */
    const {getPackageStatus, getPackageById} = usePackageStore()

    /* Get the selected clients out of the store & the possibility to update the store */
    const {clients} = useClientStore()

    const {
        forDataType,
        forClient,
        setFilterTable,
        filterPageSize,
        filterPageIndex,
        setFilterPageIndex,
        setFilterPageCount,
    } = useFilterDataListStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(-1)
    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState<Script[] & Package[]>([])
    const [filter, setFilter] = useState<{ type: DataTypes, client: Client }>({
        type: tableType,
        client: forClient
    })

    useEffect(() => {
        setFilter(() => ({type: forDataType, client: forClient}))
    }, [forDataType, forClient])

    useEffect(() => {
        const tempData: Script[] & Package[] = []

        if (filter !== undefined) {
            if (filter.type === 0) {
                filter.client.scripts.forEach(scriptId => tempData.push(getScriptById(scriptId)))
            } else if (filter.type === 1) {
                filter.client.packages.forEach(packageId => tempData.push(getPackageById(packageId)))
            }
        }

        setData(() => tempData)
    }, [filter, clients])

    const columnHelper = createColumnHelper<Script & Package>()

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
            cell: info => {
                const date = getScriptById(info.row.original.id).executionDate
                return <span>
                    {date.getDate()} {t(date.toLocaleString('default', {month: 'long'}))} {date.getFullYear()}, {date.toLocaleTimeString().slice(0, date.toLocaleTimeString().length - 3)}
                </span>
            }
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
        titleColumn,
        columnHelper.accessor('version', {
            header: () => <h1>{t('Version')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('installationDate', {
            header: () => <h1>{t('Installation Date')}</h1>,
            cell: info => {
                const date = getPackageById(info.row.original.id).installationDate
                return <span>
                    {date.getDate()} {t(date.toLocaleString('default', {month: 'long'}))} {date.getFullYear()}, {date.toLocaleTimeString().slice(0, date.toLocaleTimeString().length - 3)}
                </span>
            }
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

    const columns: ColumnDef<any, any>[] = filter.type === 0 ? scriptColumns : packageColumns

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        setFilterTable(table)
        table.setPageIndex(filterPageIndex)
    }, [])

    /* React to changes on the table page size */
    useEffect(() => {
        table.setPageSize(filterPageSize)
    }, [filterPageSize])

    let index = table.getState().pagination.pageIndex

    /* React to changes on the table page index */
    useEffect(() => {
        setFilterPageIndex(index)
    }, [index])

    let pageCount = table.getPageCount()

    /* React to changes on the table page count */
    useEffect(() => {
        setFilterPageCount(pageCount)
    }, [pageCount])

    return (
        <>
            <DialogManager dialogTyp={filter.type === 0 ? DataTypes.SCRIPT : DataTypes.PACKAGE}
                           title={`Update ${filter.type === 0 ? 'Script' : 'Package'} Information`} editMode={true}
                           selectedId={selectedId}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>

            <table id='basic-table'>
                <FilterTableHeader table={table}/>
                <FilterTableBody table={table} columns={columns} tableType={filter.type}/>
                <BasicTableFooter table={table} columns={columns}/>
            </table>
        </>
    )
}

export default FilterTable
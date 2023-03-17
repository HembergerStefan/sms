import React, {useEffect, useMemo, useState} from 'react'

import {useTranslation} from 'react-i18next'
import {
    ColumnDef,
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'

import {Client, DataTypes, Group, Package, Script} from '../../../../data/data_types'
import useScriptStore, {initialScriptState} from '../../../../stores/script/scriptInformationStore'
import usePackageStore from '../../../../stores/package/packageInformationStore'
import useClientStore, {initialClientState} from '../../../../stores/clientInformationStore'
import useGroupStore, {initialGroupState} from '../../../../stores/groupInformationStore'
import useFilterDataListStore from '../../../../stores/filterDataListStore'
import useFilterDataListClientStore from '../../../../stores/filter_data_list/filterDataListClientStore'
import useFilterDataListGroupStore from '../../../../stores/filter_data_list/filterDataListGroupStore'

import {
    useRemoveClientFromGroupMutation,
    useUserPermittedQuery
} from '../../../../utils/api/ApiService'

import FilterTableHeader from './table_parts/FilterTableHeader'
import FilterTableBody from './table_parts/FilterTableBody'
import BasicTableFooter from '../basic_table/table_parts/BasicTableFooter'
import DialogManager from '../../dialog/DialogManager'
import Numbering from '../../numbering/Numbering'
import OnlineStatus from '../../online_status_displaying/OnlineStatus'
import RedirectButton from '../../../form/common_button/redirect_button/RedirectButton'
import StatusDisplaying from '../status_displaying/StatusDisplaying'
import AdaptButton from '../../../form/common_button/adapt_button/AdaptButton'

import '../basic_table/BasicTable.css'
import './FilterTable.css'

interface FilterTableProps {
    tableType: DataTypes
}

const FilterTable = ({tableType}: FilterTableProps) => {

    const {t} = useTranslation()

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {getScriptStatus, getScriptById} = useScriptStore()

    /* Get the selected packages out of the store & the possibility to update the store */
    const {getPackageById} = usePackageStore()

    /* Get the groups out of the store & the possibility to update the store */
    const {groups} = useGroupStore()

    /* Get the selected clients out of the store & the possibility to update the store */
    const {clients, getClientByMacAddress, getClientOnlineStatus} = useClientStore()

    const {
        forClient,
        forGroup
    } = useFilterDataListStore()

    const filterClientOptions = useFilterDataListClientStore()
    const filterGroupOptions = useFilterDataListGroupStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>('')
    const [selectedRow, setSelectedRow] = useState<number>(-1)
    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState<Script[] & Package[] & Client[]>([])
    const [group, setGroup] = useState<Group>(initialGroupState)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)
    const [filter, setFilter] = useState<{ type: DataTypes, client: Client, group: Group }>({
        type: tableType === 2 ? DataTypes.SCRIPT : tableType,
        client: forClient,
        group: forGroup
    })

    const userPermittedQuery = useUserPermittedQuery()
    const clientRemoveFromGroupMutation = useRemoveClientFromGroupMutation(group.id)

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    useEffect(() => {
        setFilter(() => ({type: filter.type, client: forClient, group: forGroup}))
    }, [filter.type, forClient, forGroup])

    useEffect(() => {
        setGroup(() => filter.group)
    }, [filter.group])

    useEffect(() => {
        const tempData: Script[] & Package[] & Client[] = []

        if (filter !== undefined) {
            if (filter.type === 0) {
                filter.client.scripts.forEach(scriptId => tempData.push(getScriptById(scriptId) !== undefined ? getScriptById(scriptId)! : initialScriptState))
            } else if (filter.type === 1) {
                filter.client.packages.forEach(packageId => tempData.push(getPackageById(packageId)))
            } else if (filter.type === 3) {
                filter.group.clients.forEach(clientMacAddress => tempData.push(getClientByMacAddress(clientMacAddress) !== undefined ? getClientByMacAddress(clientMacAddress)! : initialClientState))
            }
        }

        setData(() => tempData)
    }, [filter, clients, groups])

    const columnHelper = createColumnHelper<Script & Package & Client>()

    const titleColumn: ColumnDef<any, any> = (
        columnHelper.accessor('name', {
            header: () => <h1>{t('Name')}</h1>,
            cell: info => <div onClick={() => {
                if (tableType === 3) {
                    setSelectedId(() => info.row.original.macAddress)
                    setSelectedRow(() => info.row.index)
                    setRenderDialogComponent((prevState) => !prevState)
                }
            }} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: 'fit-content',
                cursor: `${tableType === 3 ? 'pointer' : 'default'}`
            }}>
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
                const date = getScriptById(info.row.original.id) !== undefined ? getScriptById(info.row.original.id)!.executionDate : initialScriptState.executionDate
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
        columnHelper.accessor('addingDate', {
            header: () => <h1>{t('Add Date')}</h1>,
            cell: info => {
                const date = getPackageById(info.row.original.id).addingDate
                return <span>
                    {date.getDate()} {t(date.toLocaleString('default', {month: 'long'}))} {date.getFullYear()}, {date.toLocaleTimeString().slice(0, date.toLocaleTimeString().length - 3)}
                </span>
            }
        }),
        columnHelper.accessor('url', {
            header: () => <h1>{t('Link')}</h1>,
            cell: info => <div style={{width: 'fit-content'}}>
                <RedirectButton content='Go to page' url={info.getValue()} target='_blank'/>
            </div>
        }),
    ], [])

    const clientColumns = useMemo<ColumnDef<any, any>[]>(() => [
        titleColumn,
        columnHelper.accessor('macAddress', {
            header: () => <h1>{t('MacAddress')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('ip', {
            header: () => <h1>{t('Ip')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('usedDiskspace', {
            header: () => <h1>{t('Memory')}</h1>,
            cell: info => <span>{info.getValue()}%</span>,
        }),
        columnHelper.accessor('cpuUsage', {
            header: () => <h1>{t('CPU')}</h1>,
            cell: info => <span>{info.getValue()}%</span>,
        }),
        columnHelper.accessor('ramUsage', {
            header: () => <h1>{t('Ram')}</h1>,
            cell: info => <span>{info.getValue()}%</span>,
        }),
        columnHelper.accessor('os', {
            header: () => <h1>{t('OS')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        {
            id: 'lastOnline',
            header: () => <h1>{t('Online Status')}</h1>,
            cell: info => <OnlineStatus client={info.row.original}/>,
            accessorFn: originalRow => getClientOnlineStatus(originalRow.macAddress).status
        },
        {
            id: 'removeFromGroup',
            header: () => <h1>{t('Group Action')}</h1>,
            cell: info => <AdaptButton placeholder='Remove'
                                       onOnClick={() => clientRemoveFromGroupMutation.mutate(info.row.original.macAddress)}/>,
            accessorFn: originalRow => originalRow.id,
        }
    ], [])

    const columns: ColumnDef<any, any>[] = filter.type === 0 ? scriptColumns : filter.type === 1 ? packageColumns : clientColumns

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility: {'removeFromGroup': userPermitted}
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        if (tableType === 2) {
            filterClientOptions.setFilterTable(table)
            table.setPageIndex(filterClientOptions.filterPageIndex)
        } else if (tableType === 3) {
            filterGroupOptions.setFilterTable(table)
            table.setPageIndex(filterGroupOptions.filterPageIndex)
        }
    }, [])

    /* React to changes on the table page size */
    useEffect(() => {
        if (tableType === 2) {
            table.setPageSize(filterClientOptions.filterPageSize)
        } else if (tableType === 3) {
            table.setPageSize(filterGroupOptions.filterPageSize)
        }
    }, [filterClientOptions.filterPageSize, filterGroupOptions.filterPageSize])

    let index = table.getState().pagination.pageIndex

    /* React to changes on the table page index */
    useEffect(() => {
        if (tableType === 2) {
            filterClientOptions.setFilterPageIndex(index)
        } else if (tableType === 3) {
            filterGroupOptions.setFilterPageIndex(index)
        }
    }, [index])

    let pageCount = table.getPageCount()

    /* React to changes on the table page count */
    useEffect(() => {
        if (tableType === 2) {
            filterClientOptions.setFilterPageCount(pageCount)
        } else if (tableType === 3) {
            filterGroupOptions.setFilterPageCount(pageCount)
        }
    }, [pageCount])

    return (
        <>
            <DialogManager
                dialogTyp={tableType === 0 ? DataTypes.SCRIPT : tableType === 1 ? DataTypes.PACKAGE : DataTypes.CLIENT}
                title={`Update ${tableType === 0 ? 'Script' : tableType === 1 ? 'Package' : 'Client'} Information`}
                editMode={true}
                selectedId={selectedId}
                displayId={selectedRow + 1}
                renderComponent={renderDialogComponent}
                setRenderComponent={setRenderDialogComponent}/>

            <table id='basic-table'>
                <FilterTableHeader table={table}/>
                <FilterTableBody table={table} columns={columns} tableType={filter.type} setForTableType={setFilter}/>
                <BasicTableFooter table={table} columns={columns}/>
            </table>
        </>
    )
}

export default FilterTable
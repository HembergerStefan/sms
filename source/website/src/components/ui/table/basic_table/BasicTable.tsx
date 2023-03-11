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

import {Client, DataTypes, Package, Script, User} from '../../../../data/data_types'

import useScriptStore from '../../../../stores/script/scriptInformationStore'
import useDataListScriptStore from '../../../../stores/dataListScriptStore'
import useDataListPackageStore from '../../../../stores/dataListPackageStore'
import usePackageStore from '../../../../stores/package/packageInformationStore'
import useClientStore from '../../../../stores/clientInformationStore'
import useUserInfoStore from '../../../../stores/user/userInformationStore'
import useRoleStore from '../../../../stores/role/roleInformationStore'
import useDataListClientStore from '../../../../stores/dataListClientStore'
import useDataListUserStore from '../../../../stores/dataListUserStore'

import Checkbox from '../../../form/checkbox/Checkbox'
import Numbering from '../../numbering/Numbering'
import BasicTableHeader from './table_parts/BasicTableHeader'
import BasicTableBody from './table_parts/BasicTableBody'
import BasicTableFooter from './table_parts/BasicTableFooter'
import DialogManager from '../../dialog/DialogManager'
import RedirectButton from '../../../form/common_button/redirect_button/RedirectButton'
import StatusDisplaying from '../status_displaying/StatusDisplaying'
import OnlineStatus from '../../online_status_displaying/OnlineStatus'

import './BasicTable.css'

interface BasicTableProps {
    tableType: DataTypes
}

const BasicTable = ({tableType}: BasicTableProps) => {

    const {t} = useTranslation()

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {scripts, getScriptStatus} = useScriptStore()

    /* Get the selected packages out of the store & the possibility to update the store */
    const {_packages} = usePackageStore()

    /* Get the selected users out of the store & the possibility to update the store */
    const {users} = useUserInfoStore()

    /* Get the selected clients out of the store & the possibility to update the store */
    const {clients, getClientOnlineStatus} = useClientStore()

    /* Get the roles out of the store */
    const {getRoleById} = useRoleStore()

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
        setPackagePageCount,
        setSelectionPackageRows
    } = useDataListPackageStore()

    const {
        setClientTable,
        clientPageSize,
        clientPageIndex,
        setClientPageIndex,
        setClientPageCount,
        setSelectionClientRows
    } = useDataListClientStore()

    const {
        setUserTable,
        userPageSize,
        userPageIndex,
        setUserPageIndex,
        setUserPageCount,
        setSelectionUserRows
    } = useDataListUserStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>('')
    const [selectedRow, setSelectedRow] = useState<number>(-1)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState(() => tableType === 0 ? [...scripts] : tableType === 1 ? [..._packages] : tableType === 2 ? [...clients] : [...users])

    /* Reload/Load table when data was modified (e.g.: added, deleted, ...) */
    useEffect(() => {
        setRowSelection(() => ({}))

        if (tableType === 0) {
            setData(() => scripts)
        } else if (tableType === 1) {
            setData(() => _packages)
        } else if (tableType === 2) {
            setData(() => clients)
        } else if (tableType === 4) {
            setData(() => users)
        }
    }, [scripts, _packages, clients, users])

    const columnHelper = createColumnHelper<Script & Package & Client & User>()

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
                if (tableType === 2) {
                    setSelectedId(() => info.row.original.macAddress)
                } else {
                    setSelectedId(() => info.row.original.id)
                }
                setSelectedRow(() => info.row.index)
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
        columnHelper.accessor('addingDate', {
            header: () => <h1>{t('Add Date')}</h1>,
            cell: info => {
                const date = new Date(info.getValue())

                return <span>
                {date.getDate()} {t(date.toLocaleString('default', {month: 'long'}))} {date.getFullYear()}, {date.toLocaleTimeString().slice(0, date.toLocaleTimeString().length - 3)}
            </span>
            },
        }),
        columnHelper.accessor('url', {
            header: () => <h1>{t('Link')}</h1>,
            cell: info => <div style={{width: 'fit-content'}}>
                <RedirectButton content='Got to page' url={info.getValue()} target='_blank'/>
            </div>
        }),
    ], [])

    const clientColumns = useMemo<ColumnDef<any, any>[]>(() => [
        selectionColumn,
        titleColumn,
        columnHelper.accessor('ip', {
            header: () => <h1>{t('Ip')}</h1>,
            cell: info => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor('usedDiskspace', {
            header: () => <h1>{t('Used Diskspace')}</h1>,
            cell: info => <span>{info.getValue()}%</span>,
        }),
        columnHelper.accessor('cpuUsage', {
            header: () => <h1>{t('CPU Usage')}</h1>,
            cell: info => <span>{info.getValue()}%</span>,
        }),
        columnHelper.accessor('groups', {
            header: () => <h1>{t('Groups')}</h1>,
            cell: info => <span>{info.getValue().join(', ')}</span>,
        }),
        {
            id: 'lastOnline',
            header: () => <h1>{t('Online Status')}</h1>,
            cell: info => <OnlineStatus client={info.row.original}/>,
            accessorFn: originalRow => getClientOnlineStatus(originalRow.macAddress).status
        }
    ], [])

    const userColumns = useMemo<ColumnDef<any, any>[]>(() => [
        selectionColumn,
        columnHelper.accessor('username', {
            header: () => <h1>{t('Username')}</h1>,
            cell: info => <div onClick={() => {
                setSelectedId(() => info.row.original.id)
                setSelectedRow(() => info.row.index)
                setRenderDialogComponent((prevState) => !prevState)
            }} style={{display: 'flex', alignItems: 'center', gap: '16px', width: 'fit-content', cursor: 'pointer'}}>
                <Numbering value={info.row.index + 1}/>
                <span className='fw--semi-bold clr-pr-1'>{info.getValue()}</span>
            </div>,
        }),
        {
            id: 'role',
            header: () => <h1>{t('Role')}</h1>,
            cell: info => <span>{getRoleById(info.row.original.role).name}</span>,
            accessorFn: originalRow => getRoleById(originalRow.role).name
        }
    ], [])

    const columns: ColumnDef<any, any>[] = tableType === 0 ? scriptColumns : tableType === 1 ? packageColumns : tableType === 2 ? clientColumns : userColumns

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
        if (tableType === 0) {
            setScriptTable(table)
            table.setPageIndex(scriptPageIndex)
        } else if (tableType === 1) {
            setPackageTable(table)
            table.setPageIndex(packagePageIndex)
        } else if (tableType === 2) {
            setClientTable(table)
            table.setPageIndex(clientPageIndex)
        } else if (tableType === 4) {
            setUserTable(table)
            table.setPageIndex(userPageIndex)
        }
    }, [])

    /* React to changes on the table row selection */
    useEffect(() => {
        const rows: string[] = []

        Object.entries(rowSelection).forEach(([key]) => {
            if (tableType !== 2) {
                rows.push(table.getRow(key).original.id)
            } else {
                rows.push(table.getRow(key).original.macAddress)
            }
        })

        if (tableType === 0) {
            setSelectionScriptRows(rows)
        } else if (tableType === 1) {
            setSelectionPackageRows(rows)
        } else if (tableType === 2) {
            setSelectionClientRows(rows)
        } else if (tableType === 4) {
            setSelectionUserRows(rows)
        }
    }, [rowSelection])

    /* React to changes on the table page size */
    useEffect(() => {
        if (tableType === 0) {
            table.setPageSize(scriptPageSize)
        } else if (tableType === 1) {
            table.setPageSize(packagePageSize)
        } else if (tableType === 2) {
            table.setPageSize(clientPageSize)
        } else if (tableType === 4) {
            table.setPageSize(userPageSize)
        }
    }, [scriptPageSize, packagePageSize, clientPageSize, userPageSize])

    let index = table.getState().pagination.pageIndex

    /* React to changes on the table page index */
    useEffect(() => {
        if (tableType === 0) {
            setScriptPageIndex(index)
        } else if (tableType === 1) {
            setPackagePageIndex(index)
        } else if (tableType === 2) {
            setClientPageIndex(index)
        } else if (tableType === 4) {
            setUserPageIndex(index)
        }
    }, [index])

    let pageCount = table.getPageCount()

    /* React to changes on the table page count */
    useEffect(() => {
        if (tableType === 0) {
            setScriptPageCount(pageCount)
        } else if (tableType === 1) {
            setPackagePageCount(pageCount)
        } else if (tableType === 2) {
            setClientPageCount(pageCount)
        } else if (tableType === 4) {
            setUserPageCount(pageCount)
        }
    }, [pageCount])

    return (
        <>
            <DialogManager
                dialogTyp={tableType === 0 ? DataTypes.SCRIPT : tableType === 1 ? DataTypes.PACKAGE : tableType === 2 ? DataTypes.CLIENT : DataTypes.USER}
                title={`Update ${tableType === 0 ? 'Script' : tableType === 1 ? 'Package' : tableType === 2 ? 'Client' : 'User'} Information`}
                editMode={true}
                selectedId={selectedId}
                displayId={selectedRow + 1}
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
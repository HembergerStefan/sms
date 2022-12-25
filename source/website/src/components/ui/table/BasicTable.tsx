import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import {
    CellContext,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import './BasicTable.css'
import BoxHeading from '../box_heading_container/BoxHeading'
import Checkbox from '../../form/checkbox/Checkbox'
import Numbering from "../numbering/Numbering";
import useDataListStore from "../../../store/dataListStore";
import BasicTableDropdownContent from "../../form/dropdown/basic_table/BasicTableDropdownContent";

const BasicTable = () => {

    const {t} = useTranslation()

    const {setTable, pageSize, setPageIndex, setPageCount} = useDataListStore()

    const [sorting, setSorting] = useState<SortingState>([])
    const [mountDropdown, setMountDropdown] = useState<boolean>(false)

    type Script = {
        id: number
        title: string
        description: string
        executionDate: string
        language: string
    }

    const defaultData: Script[] = [
        {
            id: 1,
            title: 'Setup Windows',
            description: 'Install Windows 11 (21H2)',
            language: 'PowerShell',
            executionDate: '3rd August 2022'
        },
        {
            id: 2,
            title: 'AutoClicker',
            description: 'More Clicks than ever',
            language: 'Python',
            executionDate: '5rd December 2022'
        },
        {
            id: 3,
            title: 'DWW',
            description: 'Disable Windows Watermark',
            language: 'Python',
            executionDate: '3rd August 2022'
        },
        {
            id: 4,
            title: 'DWW Test',
            description: 'Disable Windows Watermark Testing tool',
            language: 'Python',
            executionDate: '3rd August 2022'
        },
        {
            id: 5,
            title: 'Remove DWW',
            description: 'Disable Windows Watermark deinstaller',
            language: 'Python',
            executionDate: '3rd August 2022'
        },
        {
            id: 6,
            title: 'DWW 2.0',
            description: 'Disable Windows Watermark in Version 2',
            language: 'Python',
            executionDate: '3rd August 2022'
        },
        {
            id: 7,
            title: 'Cleanup Code',
            description: 'Script for clean upping code',
            language: 'Python',
            executionDate: '3rd August 2022'
        }
    ]

    const columnHelper = createColumnHelper<Script>()

    const columns = [
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
        })
    ]
    const [data, setData] = useState(() => [...defaultData])
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
        setTable(table)
    }, [])

    /* React to changes on the table page size */
    useEffect(() => {
        table.setPageSize(pageSize)
    }, [pageSize])

    let pageIndex = table.getState().pagination.pageIndex

    /* React to changes on the table page index */
    useEffect(() => {
        setPageIndex(pageIndex)
    }, [pageIndex])

    let pageCount = table.getPageCount()

    /* React to changes on the table page count */
    useEffect(() => {
        setPageCount(pageCount)
    }, [pageCount])

    return (
        <>
            <table id='basic-table'>
                <thead id='basic-table--head'>
                {
                    /* Display the headers */
                    table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {
                                            (header.isPlaceholder || header.index === 0) ?
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                                : (
                                                    <div className={header.index !== 0 ? 'header--content-container' : ''}
                                                         onClick={header.column.getToggleSortingHandler()}>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                                asc: <KeyboardArrowUpRoundedIcon/>,
                                                                desc: <KeyboardArrowDownRoundedIcon/>,
                                                            }
                                                                [header.column.getIsSorted() as string] ??
                                                            <UnfoldMoreRoundedIcon/>
                                                        }
                                                    </div>
                                                )}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }

                {/* For the spacing between the thead and the tbody */}
                <tr style={{height: '10px'}}></tr>

                </thead>

                <tbody id='basic-table--body'>

                {/* Trick so that the header with the menu button is between the thead and the tbody with some margin,
                    but it spans over all the columns, so that the menu button will be on the right outer side and the
                    heading on the left outer side */}
                <tr>
                    <td colSpan={columns.length} style={{borderRadius: 'var(--br-r-medium) var(--br-r-medium) 0 0'}}>
                        <BoxHeading content={<h2 className='fs-qr-1 fw--semi-bold'>{t('All Scripts')}</h2>}
                                    dropdownContent={<BasicTableDropdownContent/>}
                                    mountDropdown={mountDropdown}
                                    setMountDropdown={setMountDropdown}/>
                    </td>
                </tr>

                {
                    table.getPageCount() === 0 ? <tr>
                            <td colSpan={columns.length}>
                                <span className='fw--semi-bold clr-pr-1'>No entries available!</span>
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

                <tfoot id='basic-table--footer'>
                <tr>
                    <td colSpan={columns.length}>
                        {
                            table.getPageCount() === 0 ? null :
                                <span className='fs-sc-body-1'>
                                    {t('Page')} {table.getState().pagination.pageIndex + 1} {t('of')} {table.getPageCount()}
                                </span>
                        }
                    </td>
                </tr>
                </tfoot>
            </table>
        </>
    )
}

export default BasicTable
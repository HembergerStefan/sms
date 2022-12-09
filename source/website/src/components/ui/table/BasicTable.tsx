import React, {HTMLProps, useState} from 'react'

import {useTranslation} from 'react-i18next'
import {CellContext, createColumnHelper, flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table'
import './BasicTable.css'
import BoxHeading from "../box_heading_container/BoxHeading";
import Checkbox from "../../form/checkbox/Checkbox";

const BasicTable = () => {

    const {t} = useTranslation()

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
        }
    ]

    const columnHelper = createColumnHelper<Script>()

    const columns = [
        {
            id: 'select',
            header: () => (
                <IndeterminateCheckbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell: ({row}: CellContext<Script, string>) => (
                <div className="px-1">
                    <IndeterminateCheckbox
                        {...{
                            checked: row.getIsSelected(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                </div>
            ),
        },
        columnHelper.accessor('title', {
            header: () => <h1>Title</h1>,
            cell: info => <span className='fw--semi-bold clr-pr-1'>{info.getValue()}</span>,
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

    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState(() => [...defaultData])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    function IndeterminateCheckbox({
                                       indeterminate,
                                       className = '',
                                       ...rest
                                   }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
        const ref = React.useRef<HTMLInputElement>(null!)

        React.useEffect(() => {
            if (typeof indeterminate === 'boolean') {
                ref.current.indeterminate = !rest.checked && indeterminate
            }
        }, [ref, indeterminate])

        return (
            <input
                type="checkbox"
                ref={ref}
                className={className + ' cursor-pointer'}
                {...rest}
            />
        )
    }


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
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
                </thead>

                {/* For the spacing between the thead and the tbody */}
                <div></div>

                <tbody id='basic-table--body'>

                {/* Trick so that the header with the menu button is between the thead and the tbody with some margin,
                    but it spans over all the columns, so that the menu button will be on the right outer side and the
                    heading on the left outer side */}
                <tr>
                    <td colSpan={columns.length} style={{borderRadius: 'var(--br-r-medium) var(--br-r-medium) 0 0'}}>
                        <BoxHeading content={<h2 className='fs-qr-1 fw--semi-bold'>{t('All Scripts')}</h2>}/>
                    </td>
                </tr>

                {
                    /* Display the row/cell content */
                    table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map((cell, index) => (
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
            </table>
        </>
    )
}

export default BasicTable
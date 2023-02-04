import React from 'react'

import {flexRender, Table} from '@tanstack/react-table'

import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded'

interface FilterTableHeaderProps {
    table: Table<any>
}

const FilterTableHeader = ({table}: FilterTableHeaderProps) => {

    return (
        <thead id='basic-table--head'>
        {
            /* Display the headers */
            table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {
                        headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {
                                    <div className='header--content-container'
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
                                }
                            </th>
                        ))
                    }
                </tr>
            ))
        }

        {/* For the spacing between the thead and the tbody */}
        <tr style={{height: '10px'}}></tr>

        </thead>
    )
}

export default FilterTableHeader
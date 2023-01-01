import React from 'react'

import {useTranslation} from 'react-i18next'
import {ColumnDef, Table} from '@tanstack/react-table'

interface BasicTableFooterProps {
    table: Table<any>
    columns: ColumnDef<any, any>[]
}

const BasicTableFooter = ({table, columns}: BasicTableFooterProps) => {

    const {t} = useTranslation()

    return (
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
    )
}

export default BasicTableFooter
import React from 'react'

import {useTranslation} from 'react-i18next'

import useDataListStore from '../../../../store/dataListStore'

import Dropdown from '../Dropdown'

import './BasicTableDropdownContent.css'

const BasicTableDropdownContent = () => {

    const {t} = useTranslation()

    const {nextPage, previousPage, canNextPage, canPreviousPage, setPageSize, pageSize} = useDataListStore()

    const PAGE_SIZE_ITEMS: string[] = ['5', '10', '20', '30', '40', '50']

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setPageSize(cr)
    }

    return (
        <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>
            <span className='fs-sc-body-1' style={{marginBottom: '2px'}}>{t('Page Settings')}</span>
            <li>
                <button onClick={() => previousPage()}
                        disabled={!canPreviousPage()}>
                    <span>{t('Previous Page')}</span>
                </button>
            </li>

            <li>
                <button onClick={() => nextPage()}
                        disabled={!canNextPage()}>
                    <span>{t('Next Page')}</span>
                </button>
            </li>

            <div>
                <hr/>
                <Dropdown prefix='Page Size: ' defaultValue='10' firstSelectedValue={String(pageSize)}
                          items={PAGE_SIZE_ITEMS}
                          handleChange={handleChange}/>
            </div>
        </ul>
    )
}

export default BasicTableDropdownContent
import React from 'react'

import {useTranslation} from 'react-i18next'

import useDataListStore from '../../../../store/dataListStore'

import Dropdown from '../Dropdown'

import './BasicTableDropdownContent.css'

interface DropdownContentProps {
    setMount: Function
}

const BasicTableDropdownContent = ({setMount}: DropdownContentProps) => {

    const {t} = useTranslation()

    const {nextPage, previousPage, canNextPage, canPreviousPage, getPageSize, setPageSize} = useDataListStore()

    const PAGE_SIZE_ITEMS: string[] = ['5', '10', '20', '30', '40', '50']

    /* Select the item and unmount this component */
    const selectItem = (cr: string): void => {

        setMount(() => false)
    }

    return (
        <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>
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

            <li>
                <Dropdown defaultValue='Select Item' items={PAGE_SIZE_ITEMS}/>
            </li>

            <li>
                <select
                    value={getPageSize()}
                    onChange={event => setPageSize(Number(event.target.value))}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </li>
        </ul>
    )
}

export default BasicTableDropdownContent
import React from 'react'

import {useTranslation} from 'react-i18next'

import useFilterDataListStore from '../../../../../stores/filterDataListStore'

import Dropdown from '../../Dropdown'

import '../FilterTableDorpdownContent.css'

interface FilterScriptTableDropdownContentProps {
    setMountDropdown: Function
}

const FilterScriptTableDropdownContent = ({setMountDropdown}: FilterScriptTableDropdownContentProps) => {

    const {t} = useTranslation()

    const {
        filterPageSize,
        previousFilterPage,
        nextFilterPage,
        setFilterPageSize,
        canPreviousFilterPage,
        canNextFilterPage,
    } = useFilterDataListStore()

    const PAGE_SIZE_ITEMS: number[] = [5, 10, 20, 30, 40, 50]

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setFilterPageSize(cr)
    }

    return (
        <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>

            <li>
                <button onClick={() => previousFilterPage()}
                        disabled={!canPreviousFilterPage()}>
                    <span>{t('Previous Page')}</span>
                </button>
            </li>

            <li>
                <button onClick={() => nextFilterPage()}
                        disabled={!canNextFilterPage()}>
                    <span>{t('Next Page')}</span>
                </button>
            </li>

            <hr/>

            <div>
                <Dropdown prefix='Page Size' defaultValue={10} firstSelectedValue={filterPageSize}
                          items={PAGE_SIZE_ITEMS}
                          handleChange={handleChange}/>
            </div>
        </ul>
    )
}

export default FilterScriptTableDropdownContent
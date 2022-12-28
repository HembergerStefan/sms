import React from 'react'

import {useTranslation} from 'react-i18next'

import useDataListScriptStore from '../../../../../store/dataListScriptStore'

import Dropdown from '../../Dropdown'

import '../BasicTableDropdownContent.css'

const BasicScriptTableDropdownContent = () => {

    const {t} = useTranslation()

    const {
        setScriptPageSize,
        scriptPageSize,
        nextScriptPage,
        canNextScriptPage,
        previousScriptPage,
        canPreviousScriptPage
    } = useDataListScriptStore()

    const PAGE_SIZE_ITEMS: string[] = ['5', '10', '20', '30', '40', '50']

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setScriptPageSize(cr)
    }

    return (
        <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>
            <span className='fs-sc-body-1' style={{marginBottom: '2px'}}>{t('Page Settings')}</span>
            <li>
                <button onClick={() => previousScriptPage()}
                        disabled={!canPreviousScriptPage()}>
                    <span>{t('Previous Page')}</span>
                </button>
            </li>

            <li>
                <button onClick={() => nextScriptPage()}
                        disabled={!canNextScriptPage()}>
                    <span>{t('Next Page')}</span>
                </button>
            </li>

            <div>
                <hr/>
                <Dropdown prefix='Page Size: ' defaultValue='10' firstSelectedValue={String(scriptPageSize)}
                          items={PAGE_SIZE_ITEMS}
                          handleChange={handleChange}/>
            </div>
        </ul>
    )
}

export default BasicScriptTableDropdownContent
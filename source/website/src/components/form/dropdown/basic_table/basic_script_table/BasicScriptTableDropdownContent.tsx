import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import useScriptStore from '../../../../../store/scriptInformationStore'
import useDataListScriptStore from '../../../../../store/dataListScriptStore'

import Dropdown from '../../Dropdown'
import DialogManager from '../../../../ui/dialog/DialogManager'

import '../BasicTableDropdownContent.css'

interface BasicScriptTableDropdownContentProps {
    setMountDropdown: Function
}

const BasicScriptTableDropdownContent = ({setMountDropdown}: BasicScriptTableDropdownContentProps) => {

    const {t} = useTranslation()

    const {
        setScriptPageSize,
        scriptPageSize,
        nextScriptPage,
        canNextScriptPage,
        previousScriptPage,
        canPreviousScriptPage,
        selectionScriptRows,
    } = useDataListScriptStore()

    const {removeScript} = useScriptStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)

    const PAGE_SIZE_ITEMS: number[] = [5, 10, 20, 30, 40, 50]

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setScriptPageSize(cr)
    }

    /* On add open the dialog for adding */
    const add = () => {
        setMountDropdown(() => false)
        setRenderDialogComponent(() => true)
    }

    /* Remove all selected script entries */
    const remove = () => {
        selectionScriptRows.forEach(id => {
            removeScript(id)
        })
    }

    return (
        <>
            <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>

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

                <hr/>

                <div>
                    <Dropdown prefix='Page Size' defaultValue={10} firstSelectedValue={scriptPageSize}
                              items={PAGE_SIZE_ITEMS}
                              handleChange={handleChange}/>
                </div>

                <hr/>

                <li>
                    <button onClick={() => add()}>
                        <div style={{color: 'var(--sc-clr)'}}>
                            <NoteAddRoundedIcon/>
                            <span>{t('Add')}</span>
                        </div>
                    </button>
                </li>

                <li>
                    <button onClick={() => remove()}
                            disabled={selectionScriptRows.length === 0}>
                        <div style={{color: 'var(--ac-clr-2)'}}>
                            <DeleteRoundedIcon/>
                            <span
                                style={{color: 'var(--ac-clr-2)'}}>{t('Remove')} {selectionScriptRows.length !== 0 ? `(${selectionScriptRows.length})` : ''}</span>
                        </div>
                    </button>
                </li>
            </ul>

            <DialogManager title='Add Script' editMode={false} renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </>
    )
}

export default BasicScriptTableDropdownContent
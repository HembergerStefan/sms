import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import useCardListClientStore from '../../../../stores/cardListClientStore'

import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded'

import './BasicCardListDropdownContent.css'
import Dropdown from "../Dropdown";

interface BasicScriptTableDropdownContentProps {
    setMountDropdown: Function
}

const BasicCardListDropdownContent = ({setMountDropdown}: BasicScriptTableDropdownContentProps) => {

    const {t} = useTranslation()

    const {
        setClientDisplayMode,
        setClientPageSize,
        clientPageSize,
        nextClientPage,
        canNextClientPage,
        previousClientPage,
        canPreviousClientPage,
    } = useCardListClientStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)

    const PAGE_SIZE_ITEMS: number[] = [3, 6, 12, 24, 48, 64]

    /* User selected item, so change the card list size to it */
    const handleChange = (cr: number): void => {
        setClientPageSize(cr)
    }

    return (
        <>
            <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>

                <li>
                    <button onClick={() => setClientDisplayMode('Table')}>
                        <div style={{color: 'var(--sc-clr)'}}>
                            <ViewListRoundedIcon/>
                            <span>{t('List View')}</span>
                        </div>
                    </button>
                </li>

                <hr/>

                <li>
                    <button onClick={() => previousClientPage()}
                            disabled={!canPreviousClientPage()}>
                        <span>{t('Previous Page')}</span>
                    </button>
                </li>

                <li>
                    <button onClick={() => nextClientPage()}
                            disabled={!canNextClientPage()}>
                        <span>{t('Next Page')}</span>
                    </button>
                </li>

                <hr/>

                <div>
                    <Dropdown prefix='Page Size' defaultValue={6} firstSelectedValue={clientPageSize}
                              items={PAGE_SIZE_ITEMS}
                              handleChange={handleChange}/>
                </div>

            </ul>

            {/*<DialogManager dialogTyp={DialogManagerTypes.SCRIPT} title='Add Script' editMode={false}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>*/}
        </>
    )
}

export default BasicCardListDropdownContent
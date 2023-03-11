import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import useDataListClientStore from '../../../../../stores/dataListClientStore'
import useCardListClientStore from '../../../../../stores/cardListClientStore'
import {useRemoveClientMutation, useUserPermittedQuery} from '../../../../../utils/api/ApiService'

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import Dropdown from '../../Dropdown'

import '../BasicTableDropdownContent.css'

interface BasicClientTableDropdownContentProps {
    setMountDropdown: Function
}

const BasicClientTableDropdownContent = ({setMountDropdown}: BasicClientTableDropdownContentProps) => {

    const {t} = useTranslation()

    const {setClientDisplayMode} = useCardListClientStore()

    const {
        setClientPageSize,
        clientPageSize,
        nextClientPage,
        canNextClientPage,
        previousClientPage,
        canPreviousClientPage,
        selectionClientRows
    } = useDataListClientStore()

    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    const clientRemoveMutation = useRemoveClientMutation()
    const PAGE_SIZE_ITEMS: number[] = [5, 10, 20, 30, 40, 50]

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setClientPageSize(cr)
    }

    /* Remove all selected clients entries */
    const remove = () => {
        selectionClientRows.forEach(id => {
            clientRemoveMutation.mutate(id)
        })

        setMountDropdown(() => false)
    }

    return (
        <>
            <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>

                <li>
                    <button onClick={() => setClientDisplayMode('Card')}>
                        <div style={{color: 'var(--sc-clr)'}}>
                            <GridViewRoundedIcon/>
                            <span>{t('Card View')}</span>
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
                    <Dropdown prefix='Page Size' defaultValue={10} firstSelectedValue={clientPageSize}
                              items={PAGE_SIZE_ITEMS}
                              handleChange={handleChange}/>
                </div>

                {
                    userPermitted ?
                        <>
                            <hr/>

                            <li>
                                <button onClick={() => remove()}
                                        disabled={selectionClientRows.length === 0}>
                                    <div style={{color: 'var(--ac-clr-2)'}}>
                                        <DeleteRoundedIcon/>
                                        <span
                                            style={{color: 'var(--ac-clr-2)'}}>{t('Remove')} {selectionClientRows.length !== 0 ? `(${selectionClientRows.length})` : ''}</span>
                                    </div>
                                </button>
                            </li>
                        </> : null
                }
            </ul>
        </>
    )
}

export default BasicClientTableDropdownContent
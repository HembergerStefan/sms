import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import {DataTypes} from '../../../../../data/data_types'
import {
    useRemoveUserMutation,
    useUserPermittedQuery
} from '../../../../../utils/api/ApiService'
import useUserInfoStore from '../../../../../stores/user/userInformationStore'
import useDataListUserStore from '../../../../../stores/dataListUserStore'

import Dropdown from '../../Dropdown'
import DialogManager from '../../../../ui/dialog/DialogManager'

import '../BasicTableDropdownContent.css'

interface BasicScriptTableDropdownContentProps {
    setMountDropdown: Function
}

const BasicUserTableDropdownContent = ({setMountDropdown}: BasicScriptTableDropdownContentProps) => {

    const {t} = useTranslation()

    const {
        setUserPageSize,
        userPageSize,
        nextUserPage,
        canNextUserPage,
        previousUserPage,
        canPreviousUserPage,
        selectionUserRows,
    } = useDataListUserStore()

    const {users} = useUserInfoStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    const mutation = useRemoveUserMutation()
    const PAGE_SIZE_ITEMS: number[] = [5, 10, 20, 30, 40, 50]

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setUserPageSize(cr)
    }

    /* On add open the dialog for adding */
    const add = () => {
        setMountDropdown(() => false)
        setRenderDialogComponent(() => true)
    }

    /* Remove all selected user entries */
    const remove = () => {
        selectionUserRows.forEach(id => {
            mutation.mutate(id)
        })

        setMountDropdown(() => false)
    }

    return (
        <>
            <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>

                <li>
                    <button onClick={() => previousUserPage()}
                            disabled={!canPreviousUserPage()}>
                        <span>{t('Previous Page')}</span>
                    </button>
                </li>

                <li>
                    <button onClick={() => nextUserPage()}
                            disabled={!canNextUserPage()}>
                        <span>{t('Next Page')}</span>
                    </button>
                </li>

                <hr/>

                <div>
                    <Dropdown prefix='Page Size' defaultValue={10} firstSelectedValue={userPageSize}
                              items={PAGE_SIZE_ITEMS}
                              handleChange={handleChange}/>
                </div>

                {
                    userPermitted ?
                        <>
                            <hr/>

                            <li>
                                <button onClick={() => add()}>
                                    <div style={{color: 'var(--sc-clr)'}}>
                                        <PersonRoundedIcon/>
                                        <span>{t('Add')}</span>
                                    </div>
                                </button>
                            </li>

                            <li>
                                <button onClick={() => remove()}
                                        disabled={selectionUserRows.length === 0}>
                                    <div style={{color: 'var(--ac-clr-2)'}}>
                                        <DeleteRoundedIcon/>
                                        <span
                                            style={{color: 'var(--ac-clr-2)'}}>{t('Remove')} {selectionUserRows.length !== 0 ? `(${selectionUserRows.length})` : ''}</span>
                                    </div>
                                </button>
                            </li>
                        </> : null
                }
            </ul>

            <DialogManager dialogTyp={DataTypes.USER} title='Add User' editMode={false}
                           displayId={users.length + 1}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </>
    )
}

export default BasicUserTableDropdownContent
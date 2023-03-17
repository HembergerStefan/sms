import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'

import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded'
import AddToQueueRoundedIcon from '@mui/icons-material/AddToQueueRounded'

import {DataTypes} from '../../../../../data/data_types'

import {useUserPermittedQuery} from '../../../../../utils/api/ApiService'

import useFilterDataListStore from '../../../../../stores/filterDataListStore'
import useFilterDataListGroupStore from '../../../../../stores/filter_data_list/filterDataListGroupStore'

import Dropdown from '../../Dropdown'
import DialogManager from '../../../../ui/dialog/DialogManager'
import GroupClientAddingDialog from '../../../../ui/dialog/group/adding_client/GroupClientAddingDialog'

import '../FilterTableDorpdownContent.css'

interface FilterGroupTableDropdownContentProps {
    setMountDropdown: Function
}

const FilterGroupTableDropdownContent = ({setMountDropdown}: FilterGroupTableDropdownContentProps) => {

    const {t} = useTranslation()

    const {forGroup} = useFilterDataListStore()

    const {
        filterPageSize,
        previousFilterPage,
        nextFilterPage,
        setFilterPageSize,
        canPreviousFilterPage,
        canNextFilterPage
    } = useFilterDataListGroupStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)
    const [renderAddingClientDialogComponent, setRenderAddingClientDialogComponent] = useState<boolean>(false)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    const PAGE_SIZE_ITEMS: number[] = [5, 10, 20, 30, 40, 50]

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setFilterPageSize(cr)
    }

    /* On update open the dialog for updating group */
    const update = () => {
        setMountDropdown(() => false)
        setRenderDialogComponent(() => true)
    }

    /* On adding client open the dialog for adding client to group */
    const addClientToGroup = () => {
        setMountDropdown(() => false)
        setRenderAddingClientDialogComponent(() => true)
    }

    return (
        <>
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

                {
                    userPermitted ?
                        <>
                            <hr/>

                            <li>
                                <button onClick={() => addClientToGroup()}
                                        disabled={forGroup === null || forGroup === undefined || forGroup.id === ''}>
                                    <div style={{color: 'var(--sc-clr)'}}>
                                        <AddToQueueRoundedIcon/>
                                        <span>{t('Add Client')}</span>
                                    </div>
                                </button>
                            </li>

                            <li>
                                <button onClick={() => update()}
                                        disabled={forGroup === null || forGroup === undefined || forGroup.id === ''}>
                                    <div style={{color: 'var(--sc-clr)'}}>
                                        <SettingsSuggestRoundedIcon/>
                                        <span>{t('Update Group')}</span>
                                    </div>
                                </button>
                            </li>
                        </> : null
                }
            </ul>

            <DialogManager dialogTyp={DataTypes.GROUP} title='Update Group Information' editMode={true}
                           selectedId={forGroup.id}
                           displayId={1}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>

            {
                (renderAddingClientDialogComponent) ? ReactDOM.createPortal(
                    <GroupClientAddingDialog unmountComponent={setRenderAddingClientDialogComponent}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </>
    )
}

export default FilterGroupTableDropdownContent
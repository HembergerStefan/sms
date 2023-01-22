import React, {useState} from 'react'

import {useTranslation} from 'react-i18next'

import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import {DataTypes} from '../../../../../data/data_types'

import usePackageStore from '../../../../../stores/packageInformationStore'
import useDataListPackageStore from '../../../../../stores/dataListPackageStore'

import Dropdown from '../../Dropdown'
import DialogManager from '../../../../ui/dialog/DialogManager'

import '../BasicTableDropdownContent.css'

interface BasicPackageTableDropdownContentProps {
    setMountDropdown: Function
}

const BasicPackageTableDropdownContent = ({setMountDropdown}: BasicPackageTableDropdownContentProps) => {

    const {t} = useTranslation()

    const {
        setPackagePageSize,
        packagePageSize,
        nextPackagePage,
        canNextPackagePage,
        previousPackagePage,
        canPreviousPackagePage,
        selectionPackageRows
    } = useDataListPackageStore()

    const {removePackage} = usePackageStore()

    const [renderDialogComponent, setRenderDialogComponent] = useState<boolean>(false)

    const PAGE_SIZE_ITEMS: number[] = [5, 10, 20, 30, 40, 50]

    /* User selected item, so change the table size to it */
    const handleChange = (cr: number): void => {
        setPackagePageSize(cr)
    }

    /* On add open the dialog for adding */
    const add = () => {
        setMountDropdown(() => false)
        setRenderDialogComponent(() => true)
    }

    /* Remove all selected package entries */
    const remove = () => {
        selectionPackageRows.forEach(id => {
            removePackage(id)
        })
    }

    return (
        <>
            <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>

                <li>
                    <button onClick={() => previousPackagePage()}
                            disabled={!canPreviousPackagePage()}>
                        <span>{t('Previous Page')}</span>
                    </button>
                </li>

                <li>
                    <button onClick={() => nextPackagePage()}
                            disabled={!canNextPackagePage()}>
                        <span>{t('Next Page')}</span>
                    </button>
                </li>

                <hr/>

                <div>
                    <Dropdown prefix='Page Size' defaultValue={10} firstSelectedValue={packagePageSize}
                              items={PAGE_SIZE_ITEMS}
                              handleChange={handleChange}/>
                </div>

                <hr/>

                <li>
                    <button onClick={() => add()}>
                        <div style={{color: 'var(--sc-clr)'}}>
                            <AppsRoundedIcon/>
                            <span>{t('Add')}</span>
                        </div>
                    </button>
                </li>

                <li>
                    <button onClick={() => remove()}
                            disabled={selectionPackageRows.length === 0}>
                        <div style={{color: 'var(--ac-clr-2)'}}>
                            <DeleteRoundedIcon/>
                            <span
                                style={{color: 'var(--ac-clr-2)'}}>{t('Remove')} {selectionPackageRows.length !== 0 ? `(${selectionPackageRows.length})` : ''}</span>
                        </div>
                    </button>
                </li>
            </ul>

            <DialogManager dialogTyp={DataTypes.PACKAGE} title='Add Package' editMode={false}
                           renderComponent={renderDialogComponent}
                           setRenderComponent={setRenderDialogComponent}/>
        </>
    )
}

export default BasicPackageTableDropdownContent
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'

import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded'

import Dialog from '../../../components/ui/dialog/Dialog'
import ScriptInformationDialog from '../../ui/dialog/script/ScriptInformationDialog'
import DialogButton from '../dialog_button/solid/SolidDialogButton'

import './ScriptDialogToggle.css'
import DashedOutlinedDialogButton from "../dialog_button/outlined/dashed_outlined/DashedOutlinedDialogButton";
import SolidOutlinedDialogButton from "../dialog_button/outlined/solid_outlined/SolidOutlinedDialogButton";

/* TODO: WILL BE REMOVED IN THE FUTURE - ONLY FOR TESTING */
const ScriptUpdateDialogToggle = () => {

    const {t} = useTranslation()

    const [renderComponent, setRenderComponent] = useState(false)

    return (
        <div id='script-information-toggle--container'>
            <button id='script-information-toggle--btn' onClick={() => setRenderComponent(true)}>
                <span className='fs-pr-body-1'>Update Script</span>
                <AddToPhotosRoundedIcon style={{color: 'var(--nl-clr-3)'}}/>
            </button>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Dialog title={t('Update Script Information')}
                            unmountComponent={setRenderComponent}
                            body={<ScriptInformationDialog id={10} editMode={true}/>}
                            footer={
                                <>
                                    <DashedOutlinedDialogButton placeholder='Delete'/>

                                    <div style={{display: 'flex', gap: '20px'}}>
                                        <SolidOutlinedDialogButton placeholder='Execute'/>
                                        <DialogButton placeholder='Save'/>
                                    </div>
                                </>
                            }/>,
                    document.querySelector('#layout-container')!) : null
            }
        </div>
    )
}

export default ScriptUpdateDialogToggle
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'

import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded'

import Dialog from '../../../components/ui/dialog/Dialog'
import ScriptInformationDialog from '../../ui/dialog/script/ScriptInformationDialog'
import DialogButton from '../dialog_button/solid/SolidDialogButton'

import './ScriptDialogToggle.css'

const ScriptDialogToggle = () => {

    const {t} = useTranslation()

    const [renderComponent, setRenderComponent] = useState(false)

    return (
        <div id='script-information-toggle--container'>
            <button id='script-information-toggle--btn' onClick={() => setRenderComponent(true)}>
                <span className='fs-pr-body-1'>Add Script</span>
                <AddToPhotosRoundedIcon style={{color: 'var(--nl-clr-3)'}}/>
            </button>

            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Dialog title={t('Add Script')}
                            unmountComponent={setRenderComponent}
                            body={<ScriptInformationDialog/>}
                            footer={
                                <>
                                    <span className='fs-tr-body-1'>Version 0.1.0</span>
                                    <br/>
                                    <DialogButton placeholder='Save'/>
                                </>
                            }/>,
                    document.querySelector('#layout-container')!) : null
            }
        </div>
    )
}

export default ScriptDialogToggle
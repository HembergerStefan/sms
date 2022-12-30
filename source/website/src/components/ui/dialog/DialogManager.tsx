import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Dialog from "./Dialog";
import ScriptInformationDialog from "./script/ScriptInformationDialog";
import DashedOutlinedDialogButton
    from "../../form/dialog_button/outlined/dashed_outlined/DashedOutlinedDialogButton";
import SolidOutlinedDialogButton from "../../form/dialog_button/outlined/solid_outlined/SolidOutlinedDialogButton";
import SolidDialogButton from "../../form/dialog_button/solid/SolidDialogButton";
import {useTranslation} from "react-i18next";
import useScriptStore from "../../../store/scriptInformationStore";


interface DialogManagerProps {
    title: string
    editMode: boolean
    selectedId?: number
    renderComponent: boolean
    setRenderComponent: Function
}

const DialogManager = ({title, editMode, selectedId, renderComponent, setRenderComponent}: DialogManagerProps) => {

    const {t} = useTranslation()

    const {removeScript} = useScriptStore()

    const remove = () => {
        if (selectedId) {
            removeScript(selectedId)
            setRenderComponent(() => false)
        }
    }

    return (
        (renderComponent) ? ReactDOM.createPortal(
            <Dialog title={t(title)}
                    unmountComponent={setRenderComponent}
                    body={<ScriptInformationDialog id={selectedId ? selectedId : undefined}
                                                   editMode={editMode}/>}
                    footer={
                        editMode ?
                            <>
                                <DashedOutlinedDialogButton placeholder='Delete' onOnClick={remove}/>

                                <div style={{display: 'flex', gap: '20px'}}>
                                    <SolidOutlinedDialogButton placeholder='Execute'
                                                               onOnClick={() => setRenderComponent(() => false)}/>
                                    <SolidDialogButton placeholder='Save'/>
                                </div>
                            </> :
                            <>
                                <span className='fs-tr-body-1'>Version 0.4.5</span>
                                <br/>
                                <SolidDialogButton placeholder='Save'/>
                            </>
                    }/>,
            document.querySelector('#layout-container')!) : null
    )
}

export default DialogManager
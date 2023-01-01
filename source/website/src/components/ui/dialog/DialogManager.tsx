import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import Dialog from "./Dialog"
import ScriptInformationDialog from "./script/ScriptInformationDialog"
import DashedOutlinedDialogButton from "../../form/dialog_button/outlined/dashed_outlined/DashedOutlinedDialogButton"
import SolidOutlinedDialogButton from "../../form/dialog_button/outlined/solid_outlined/SolidOutlinedDialogButton"
import SolidDialogButton from "../../form/dialog_button/solid/SolidDialogButton"
import {useTranslation} from "react-i18next"
import useScriptStore from "../../../store/scriptInformationStore"
import usePackageStore from "../../../store/packageInformationStore"
import PackageInformationDialog from "./package/PackageInformationDialog";

export enum DialogManagerTypes {
    SCRIPT, PACKAGE
}

interface DialogManagerProps {
    dialogTyp: DialogManagerTypes
    title: string
    editMode: boolean
    selectedId?: number
    renderComponent: boolean
    setRenderComponent: Function
}

const DialogManager = ({
                           dialogTyp,
                           title,
                           editMode,
                           selectedId,
                           renderComponent,
                           setRenderComponent
                       }: DialogManagerProps) => {

    const {t} = useTranslation()

    const {removeScript} = useScriptStore()
    const {removePackage} = usePackageStore()

    const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)

    useEffect(() => {
        if (dialogTyp === 0) {
            setDialogContent(() => <ScriptInformationDialog id={selectedId ? selectedId : undefined}
                                                            editMode={editMode}/>)
        } else {
            setDialogContent(() => <PackageInformationDialog id={selectedId ? selectedId : undefined}
                                                             editMode={editMode}/>)
        }
    }, [selectedId])

    const remove = () => {
        if (selectedId) {
            if (dialogTyp === 0) {
                removeScript(selectedId)
            } else {
                removePackage(selectedId)
            }

            setRenderComponent(() => false)
        }
    }

    return (
        (renderComponent) ? ReactDOM.createPortal(
            <Dialog dialogType={dialogTyp} title={t(title)}
                    unmountComponent={setRenderComponent}
                    body={dialogContent}
                    footer={
                        editMode ?
                            <>
                                <DashedOutlinedDialogButton placeholder='Delete' onOnClick={remove}/>

                                <div style={{display: 'flex', gap: '20px'}}>
                                    {dialogTyp !== 1 ? <SolidOutlinedDialogButton placeholder='Execute'
                                                                                  onOnClick={() => setRenderComponent(() => false)}/> : null}
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
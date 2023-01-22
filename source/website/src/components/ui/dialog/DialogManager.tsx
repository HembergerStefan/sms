import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'

import {DataTypes} from '../../../data/data_types'

import useScriptStore from '../../../stores/scriptInformationStore'
import usePackageStore from '../../../stores/packageInformationStore'

import Dialog from './Dialog'
import ScriptInformationDialog from './script/ScriptInformationDialog'
import PackageInformationDialog from './package/PackageInformationDialog'
import SolidDialogButton from '../../form/dialog_button/solid/SolidDialogButton'
import DashedOutlinedDialogButton from '../../form/dialog_button/outlined/dashed_outlined/DashedOutlinedDialogButton'
import SolidOutlinedDialogButton from '../../form/dialog_button/outlined/solid_outlined/SolidOutlinedDialogButton'

interface DialogManagerProps {
    dialogTyp: DataTypes
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
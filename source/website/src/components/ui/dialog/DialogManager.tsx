import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import {useTranslation} from 'react-i18next'

import {DataTypes} from '../../../data/data_types'

import useScriptStore from '../../../stores/script/scriptInformationStore'
import usePackageStore from '../../../stores/package/packageInformationStore'
import useGroupStore from '../../../stores/groupInformationStore'
import useClientStore from '../../../stores/clientInformationStore'
import useUserInfoStore from '../../../stores/user/userInformationStore'

import {
    useRemoveClientMutation,
    useRemoveGroupMutation,
    useRemovePackageMutation,
    useRemoveScriptMutation, useRemoveUserMutation,
    useUpdateClientMutation,
    useUpdateGroupMutation,
    useUpdatePackageMutation,
    useUpdateScriptMutation, useUpdateUserMutation, useUserPermittedQuery
} from '../../../utils/api/ApiService'

import Dialog from './Dialog'
import ScriptInformationDialog from './script/ScriptInformationDialog'
import PackageInformationDialog from './package/PackageInformationDialog'
import GroupInformationDialog from './group/GroupInformationDialog'
import SolidDialogButton from '../../form/dialog_button/solid/SolidDialogButton'
import DashedOutlinedDialogButton from '../../form/dialog_button/outlined/dashed_outlined/DashedOutlinedDialogButton'
import ClientInformationDialog from './client/ClientInformationDialog'
import UserInformationDialog from './user/UserInformationDialog'

interface DialogManagerProps {
    dialogTyp: DataTypes
    title: string
    editMode: boolean
    selectedId?: string
    displayId: number
    renderComponent: boolean
    setRenderComponent: Function
}

const DialogManager = ({
                           dialogTyp,
                           title,
                           editMode,
                           selectedId,
                           displayId,
                           renderComponent,
                           setRenderComponent
                       }: DialogManagerProps) => {

    const {t} = useTranslation()

    const {addingScript} = useScriptStore()
    const {addingPackage} = usePackageStore()
    const {addingGroup} = useGroupStore()
    const {addingClient} = useClientStore()
    const {addingUser} = useUserInfoStore()

    const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const userPermittedQuery = useUserPermittedQuery()

    const scriptUpdateMutation = useUpdateScriptMutation(addingScript)
    const packageUpdateMutation = useUpdatePackageMutation(addingPackage)
    const groupUpdateMutation = useUpdateGroupMutation(addingGroup)
    const clientUpdateMutation = useUpdateClientMutation(addingClient)
    const userUpdateMutation = useUpdateUserMutation(addingUser)

    const packageRemoveMutation = useRemovePackageMutation()
    const scriptRemoveMutation = useRemoveScriptMutation()
    const groupRemoveMutation = useRemoveGroupMutation()
    const clientRemoveMutation = useRemoveClientMutation()
    const userRemoveMutation = useRemoveUserMutation()

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    useEffect(() => {
        if (dialogTyp === 0) {
            setDialogContent(() => <ScriptInformationDialog id={selectedId ? selectedId : undefined}
                                                            displayId={displayId}
                                                            editMode={editMode}/>)
        } else if (dialogTyp === 1) {
            setDialogContent(() => <PackageInformationDialog id={selectedId ? selectedId : undefined}
                                                             displayId={displayId}
                                                             editMode={editMode}/>)
        } else if (dialogTyp === 2) {
            setDialogContent(() => <ClientInformationDialog id={selectedId ? selectedId : undefined}
                                                            displayId={displayId}
                                                            editMode={editMode}/>)
        } else if (dialogTyp === 3) {
            setDialogContent(() => <GroupInformationDialog id={selectedId ? selectedId : undefined}
                                                           displayId={displayId}
                                                           editMode={editMode}/>)
        } else if (dialogTyp === 4) {
            setDialogContent(() => <UserInformationDialog id={selectedId ? selectedId : undefined}
                                                          editMode={editMode}/>)
        }
    }, [selectedId, dialogTyp])

    const update = () => {
        if (selectedId) {
            if (dialogTyp === 0) {
                scriptUpdateMutation.mutate()
            } else if (dialogTyp === 1) {
                packageUpdateMutation.mutate()
            } else if (dialogTyp === 2) {
                clientUpdateMutation.mutate()
            } else if (dialogTyp === 3) {
                groupUpdateMutation.mutate()
            } else if (dialogTyp === 4) {
                userUpdateMutation.mutate()
            }

            setRenderComponent(() => false)
        }
    }

    const remove = () => {
        if (selectedId) {
            if (dialogTyp === 0) {
                scriptRemoveMutation.mutate(selectedId)
            } else if (dialogTyp === 1) {
                packageRemoveMutation.mutate(selectedId)
            } else if (dialogTyp === 2) {
                clientRemoveMutation.mutate(selectedId)
            } else if (dialogTyp === 3) {
                groupRemoveMutation.mutate(selectedId)
            } else if (dialogTyp === 4) {
                userRemoveMutation.mutate(selectedId)
            }

            setRenderComponent(() => false)
        }
    }

    return (
        <>
            {
                (renderComponent) ? ReactDOM.createPortal(
                    <Dialog title={t(title)}
                            unmountComponent={setRenderComponent}
                            body={dialogContent}
                            footer={
                                editMode ?
                                    <>
                                        {
                                            userPermitted ? <DashedOutlinedDialogButton placeholder='Remove'
                                                                                        onOnClick={remove}/> : null
                                        }

                                        <div style={{display: 'flex', gap: '20px'}}>
                                            {
                                                userPermitted ?
                                                    <SolidDialogButton placeholder='Save' onOnClick={update}/> : null
                                            }
                                        </div>
                                    </> :
                                    userPermitted ?
                                        <div style={{marginLeft: 'auto'}}>
                                            <SolidDialogButton placeholder={editMode ? 'Save' : 'Add'}/>
                                        </div> : null
                            } dialogTyp={dialogTyp}/>,
                    document.querySelector('#layout-container')!) : null
            }
        </>
    )
}

export default DialogManager
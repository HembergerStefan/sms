import React, {useEffect, useState} from 'react'

import useScriptStore from '../../../stores/script/scriptInformationStore'
import usePackageStore from '../../../stores/package/packageInformationStore'
import useGroupStore from '../../../stores/groupInformationStore'
import useUserInfoStore from '../../../stores/user/userInformationStore'

import {
    useAddGroupMutation,
    useAddPackageMutation,
    useAddScriptMutation, useAddUserMutation,
    useUserPermittedQuery
} from '../../../utils/api/ApiService'
import {DataTypes} from '../../../data/data_types'

import CloseButton from '../../form/menu/close/CloseButton'

import './Dialog.css'

interface DialogProps {
    dialogTyp: DataTypes
    title: string
    unmountComponent: Function
    body: React.ReactNode
    footer?: React.ReactNode
}

const Dialog = ({dialogTyp, title, unmountComponent, body, footer}: DialogProps) => {

    const [shake, setShake] = useState<boolean>(false)
    const [userPermitted, setUserPermitted] = useState<boolean>(false)

    const {addingScript, resetAddingScript} = useScriptStore()
    const {addingPackage, resetAddingPackage} = usePackageStore()
    const {addingGroup, resetAddingGroup} = useGroupStore()
    const {addingUser, resetAddingUser} = useUserInfoStore()

    const userPermittedQuery = useUserPermittedQuery()

    const scriptAddMutation = useAddScriptMutation(addingScript)
    const packageAddMutation = useAddPackageMutation(addingPackage)
    const groupAddMutation = useAddGroupMutation(addingGroup)
    const userAddMutation = useAddUserMutation(addingUser)

    useEffect(() => {
        if (userPermittedQuery.isSuccess && userPermittedQuery.data.name === 'Admin') {
            setUserPermitted(() => true)
        }
    }, [userPermittedQuery.data])

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (userPermitted) {
            dialogTyp === 0 ? addScript() : dialogTyp === 1 ? addPackage() : dialogTyp === 3 ? addGroup() : addUser()
        }

        unmountComponent()
    }

    const addScript = () => {
        scriptAddMutation.mutate()
        resetAddingScript()
    }

    const addPackage = () => {
        packageAddMutation.mutate()
        resetAddingPackage()
    }

    const addGroup = () => {
        groupAddMutation.mutate()
        resetAddingGroup()
    }

    const addUser = () => {
        userAddMutation.mutate()
        resetAddingUser()
    }

    return (
        <section className='blocking-container' onMouseDown={() => {
            setShake(() => true)

            setTimeout(() => {
                if (!shake) {
                    setShake(() => false)
                }
            }, 720)
        }}>
            <form id='dialog-container' className={shake ? 'shake' : ''} onMouseDown={event => event.stopPropagation()}
                  onSubmit={handleSubmit}>
                <div>
                    <h1 className='fs-tr-1 fw--semi-bold'>{title}</h1>
                    <div id='dialog-menu-container'>
                        <CloseButton size='28px' closeCallback={unmountComponent}/>
                    </div>
                </div>

                {body}

                <div id='dialog-footer-container'>
                    {footer}
                </div>
            </form>
        </section>
    )
}

export default Dialog
import React, {useState} from 'react'

import {DataTypes} from '../../../data/data_types'

import useScriptStore from '../../../stores/scriptInformationStore'
import usePackageStore from '../../../stores/packageInformationStore'

import CloseButton from '../../form/menu/close/CloseButton'

import './Dialog.css'

interface DialogProps {
    dialogType?: DataTypes
    title: string
    unmountComponent: Function
    body: React.ReactNode
    footer?: React.ReactNode
}

const Dialog = ({dialogType, title, unmountComponent, body, footer}: DialogProps) => {

    const [shake, setShake] = useState<boolean>(false)

    /* Add a new script */
    const {addingScript, addScript} = useScriptStore()

    /* Add a new package */
    const {addingPackage, addPackage} = usePackageStore()

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (dialogType !== undefined) {
            if (dialogType === 0) {
                addScript(addingScript)
            } else {
                addPackage(addingPackage)
            }
        }

        unmountComponent()
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
                        {/*<KebabMenu size='var(--icon-size-medium)'/>*/}
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
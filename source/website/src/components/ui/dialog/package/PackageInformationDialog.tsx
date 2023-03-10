import React, {useEffect, useState} from 'react'

import usePackageStore, {initialPackageState} from '../../../../stores/package/packageInformationStore'
import {Package} from '../../../../data/data_types'

import TextInput from '../../../form/text_input/TextInput'
import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'
import LinkInput from '../../../form/link_input/LinkInput'

import './PackageInformationDialog.css'

interface PackageInformationDialogProps {
    id?: string
    displayId: number
    editMode?: boolean
}

const PackageInformationDialog = ({id, displayId, editMode = false}: PackageInformationDialogProps) => {

    /* Get the selected packages out of the store & the possibility to update the store */
    const {_packages, addingPackage, getPackageById} = usePackageStore()

    const [selectedPackage, setSelectedPackage] = useState<Package>(initialPackageState)

    useEffect(() => {
        if (id != null && editMode) {
            setSelectedPackage(() => getPackageById(id))
        }
    }, [id])

    useEffect(() => {
        addingPackage.id = selectedPackage.id
        addingPackage.name = selectedPackage.name
        addingPackage.url = selectedPackage.url
        addingPackage.version = selectedPackage.version
        addingPackage.addingDate = selectedPackage.addingDate
        addingPackage.silentSwitch = selectedPackage.silentSwitch
    }, [selectedPackage])

    const setTitle = (content: string) => {
        addingPackage.name = content
    }

    const setVersion = (content: string) => {
        addingPackage.version = content
    }

    const setUrl = (content: string) => {
        addingPackage.url = content
    }

    const setSilentSwitch = (content: string) => {
        addingPackage.silentSwitch = content
    }

    return (
        <article id='package-information-dialog--container'>
            <section id='title-version--wrapper'>
                <TitleInputWrapper title='Title'
                                   content={<TextInput
                                       headingId={selectedPackage.id !== '' ? displayId : _packages.length + 1}
                                       isHeading={true}
                                       defaultValue={editMode ? selectedPackage.name : undefined}
                                       placeholder='Package Clarification'
                                       setStoreValue={setTitle}/>}/>
                <TitleInputWrapper title='Version' content={
                    <TextInput
                        defaultValue={editMode ? selectedPackage.version : undefined}
                        placeholder='Package Version'
                        setStoreValue={setVersion}
                        renderFullSizeToggle={false}/>}/>
            </section>

            <TitleInputWrapper title='Direct-Download Link'
                               content={<LinkInput defaultValue={editMode ? selectedPackage.url : undefined}
                                                   placeholder='Download Link' setStoreValue={setUrl}/>}/>

            <TitleInputWrapper title='Silent Switch'
                               content={<TextInput defaultValue={editMode ? selectedPackage.silentSwitch : undefined}
                                                   placeholder='Silent installing key'
                                                   setStoreValue={setSilentSwitch}/>}/>
        </article>
    )
}

export default PackageInformationDialog
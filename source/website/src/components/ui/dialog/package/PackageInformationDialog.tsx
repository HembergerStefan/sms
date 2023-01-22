import React, {useEffect, useState} from 'react'

import usePackageStore, {initialPackageState} from '../../../../stores/packageInformationStore'
import {Package} from '../../../../data/data_types'

import TextInput from '../../../form/text_input/TextInput'
import TitleInputWrapper from '../../title_input_wrapper/TitleInputWrapper'

import './PackageInformationDialog.css'
import LinkInput from "../../../form/link_input/LinkInput";

interface PackageInformationDialogProps {
    id?: number
    editMode?: boolean
}

const PackageInformationDialog = ({id, editMode = false}: PackageInformationDialogProps) => {

    /* Get the selected scripts out of the store & the possibility to update the store */
    const {_packages, addingPackage, getPackageById} = usePackageStore()

    const [selectedPackage, setSelectedPackage] = useState<Package>(initialPackageState)

    useEffect(() => {
        addingPackage.id = _packages.length + 1
    }, [])

    useEffect(() => {
        if (id != null && editMode) {
            setSelectedPackage(() => getPackageById(id))
        }
    }, [id])
    const setTitle = (content: string) => {
        addingPackage.name = content
    }

    const setUrl = (content: string) => {
        addingPackage.url = content
    }

    return (
        <article id='package-information-dialog--container'>
            <TitleInputWrapper title='Title'
                               content={<TextInput
                                   headingId={selectedPackage.id !== -1 ? selectedPackage.id : _packages.length + 1}
                                   isHeading={true}
                                   defaultValue={editMode ? selectedPackage.name : undefined}
                                   placeholder='Package Clarification'
                                   setStoreValue={setTitle}/>}/>

            <TitleInputWrapper title='Direct-Download Link'
                               content={<LinkInput defaultValue={editMode ? selectedPackage.url : undefined}
                                                   placeholder='Download Link' setStoreValue={setUrl}/>}/>
        </article>
    )
}

export default PackageInformationDialog
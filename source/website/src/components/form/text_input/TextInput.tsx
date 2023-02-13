import React, {memo, useRef} from 'react'

import {useTranslation} from 'react-i18next'

import FullSizeButton from '../menu/full_size/FullSizeButton'
import Numbering from '../../ui/numbering/Numbering'

import './TextInput.css'

interface TextInputProps {
    headingId?: number
    isHeading?: boolean
    defaultValue?: string | undefined
    placeholder: string
    customSize?: { height: number, hUnit: string, width: number, wUnit: string }
    setStoreValue: Function
}

const TextInput = ({
                       headingId,
                       isHeading = false,
                       defaultValue,
                       placeholder,
                       customSize = {height: 100, hUnit: '%', width: 100, wUnit: '%'},
                       setStoreValue
                   }: TextInputProps) => {

    const {t} = useTranslation()

    const labelRef = useRef<HTMLLabelElement>(null)

    return (
        isHeading ?
            <label id='numbering-input--wrapper' className='md-input'>
                <Numbering value={headingId ? headingId : 1} fixedColor={true}/>
                <input id='text-input' type='text'
                       defaultValue={defaultValue}
                       placeholder={t(placeholder)}
                       onChange={(event) => setStoreValue(event.target.value)}
                       required={true}
                       autoComplete='off'/>
            </label>
            :
            <label ref={labelRef} id='numbering-input--wrapper' className='md-input'>
                        <textarea id='text-input'
                                  defaultValue={defaultValue}
                                  placeholder={t(placeholder)}
                                  style={{
                                      height: customSize.height + customSize.hUnit,
                                      width: customSize.width + customSize.wUnit,
                                      padding: '6px'
                                  }}
                                  onChange={(event) => setStoreValue(event.target.value)}
                                  required={true}
                                  autoComplete='off'/>

                <FullSizeButton containerRef={labelRef} size='var(--icon-size-small)'/>
            </label>
    )
}

export default memo(TextInput)
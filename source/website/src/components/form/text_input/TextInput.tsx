import React, {memo, useRef} from 'react'

import {useTranslation} from 'react-i18next'

import './TextInput.css'
import FullSizeButton from "../menu/full_size/FullSizeButton";

interface TextInputProps {
    isHeading?: boolean
    placeholder: string
    customSize?: { height: number, hUnit: string, width: number, wUnit: string }
}

const TextInput = ({
                       isHeading = false,
                       placeholder,
                       customSize = {height: 100, hUnit: '%', width: 100, wUnit: '%'}
                   }: TextInputProps) => {

    const {t} = useTranslation()

    const labelRef = useRef<HTMLLabelElement>(null)

    return (
        <>
            {
                isHeading ?
                    <label id='numbering-input--wrapper'>
                        <span id='numbering' className='fs-qi-1'>01</span>
                        <input id='text-input' type='text' placeholder={t(placeholder)}/>
                    </label>
                    :
                    <label ref={labelRef} id='numbering-input--wrapper'>
                        <textarea id='text-input' placeholder={t(placeholder)}
                                  style={{
                                      height: customSize.height + customSize.hUnit,
                                      width: customSize.width + customSize.wUnit
                                  }}/>

                        <FullSizeButton containerRef={labelRef} size='var(--icon-size-small)'/>
                    </label>
            }
        </>
    )
}

export default memo(TextInput)
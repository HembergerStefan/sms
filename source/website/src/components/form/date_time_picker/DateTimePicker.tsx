import React, {memo, useEffect, useState} from 'react'

import './DateTimePicker.css'

interface DateTimePickerProps {
    defaultValue?: Date
    setStoreValue: Function
}

const DateTimePicker = ({defaultValue, setStoreValue}: DateTimePickerProps) => {

    const [localISOTime, setLocalISOTime] = useState<string>()

    useEffect(() => {

        const tzOffset = new Date().getTimezoneOffset() * 60000 // Offset in milliseconds

        if (defaultValue) {
            setLocalISOTime(() => new Date(defaultValue.getTime() - tzOffset)
                .toISOString().slice(0, defaultValue.toISOString().length - 8))
        }

    }, [])

    return (
        <input id='date-time--picker' className='md-input' defaultValue={localISOTime} type='datetime-local'
               onChange={(event) => setStoreValue(new Date(event.target.value))}/>
    )
}

export default memo(DateTimePicker)
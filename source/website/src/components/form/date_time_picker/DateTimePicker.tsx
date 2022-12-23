import React, {memo} from 'react'

import './DateTimePicker.css'

interface DateTimePickerProps {
    defaultValue?: Date
    setStoreValue: Function
}

const DateTimePicker = ({defaultValue, setStoreValue}: DateTimePickerProps) => {

    return (
        <input id='date-time--picker' className='md-input'
               defaultValue={defaultValue !== undefined ? defaultValue.toString() : ''} type='datetime-local'
               onChange={(event) => setStoreValue(event.target.value)}/>
    )
}

export default memo(DateTimePicker)
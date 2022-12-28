import React, {memo} from 'react'

import './DateTimePicker.css'

interface DateTimePickerProps {
    defaultValue?: Date
    setStoreValue: Function
}

const DateTimePicker = ({defaultValue, setStoreValue}: DateTimePickerProps) => {

    return (
        <input id='date-time--picker' className='md-input'
               defaultValue={defaultValue ? defaultValue.toString() : undefined} type='datetime-local'
               onChange={(event) => setStoreValue(new Date(event.target.value))}/>
    )
}

export default memo(DateTimePicker)
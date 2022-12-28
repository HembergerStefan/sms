import React, {memo} from 'react'

import './DateTimePicker.css'

interface DateTimePickerProps {
    defaultValue?: Date
    setStoreValue: Function
}

const DateTimePicker = ({defaultValue, setStoreValue}: DateTimePickerProps) => {

    return (
        <input id='date-time--picker' className='md-input'
               defaultValue={defaultValue ? defaultValue.toISOString().slice(0, defaultValue.toISOString().length - 8) : undefined}
               type='datetime-local'
               onChange={(event) => setStoreValue(new Date(event.target.value))}/>
    )
}

export default memo(DateTimePicker)
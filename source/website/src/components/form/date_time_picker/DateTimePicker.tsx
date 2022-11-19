import React, {memo} from 'react'

import './DateTimePicker.css'

const DateTimePicker = () => {

    return (
        <input id='date-time--picker' className='md-input' type='datetime-local'/>
    )
}

export default memo(DateTimePicker)
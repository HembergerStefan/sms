import React, {memo} from 'react'

import './Separator.css'

const Separator = () => {

    return (
        <div id='separator-wrapper'>
            <hr/>
            <span className='fs-tr-body-1 fw--semi-bold'> Or</span>
            <hr/>
        </div>
    )
}

export default memo(Separator)
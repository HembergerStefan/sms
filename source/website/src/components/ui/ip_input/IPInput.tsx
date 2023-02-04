import React, {memo, useRef} from 'react'

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import './IPInput.css'

interface IpInputProps {
    value: string
}

const IpInput = ({value}: IpInputProps) => {

    const ipInputRef = useRef<HTMLDivElement>(null)

    const copyToClipboard = () => {
        /* TODO: ADD COPY SUCCESS STATE NOTIFICATION IN NOTIFICATION TAB (HEADER) */
        navigator.clipboard.writeText(value).then(text => {
            if (ipInputRef.current !== null) {
                ipInputRef.current.classList.add('success-copied')

                setTimeout(() => {
                    ipInputRef.current!.classList.remove('success-copied')
                }, 720)
            }
        }).catch(reason => console.log(reason))
    }

    return (
        <div id='ip-input--container' className='clr-sc-1'>
            <span className='fs-sc-body-1'>{value}</span>
            <div ref={ipInputRef} onClick={() => copyToClipboard()}>
                <ContentCopyRoundedIcon style={{fontSize: 'var(--fs-qi-heading)'}}/>
            </div>
        </div>
    )
}

export default memo(IpInput)
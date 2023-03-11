import React, {memo, useRef} from 'react'

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import './IPInput.css'

interface IpInputProps {
    value: string
}

const IpInput = ({value}: IpInputProps) => {

    const ipInputRef = useRef<HTMLDivElement>(null)

    const copyToClipboard = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(value).then(text => {
                if (ipInputRef.current !== null) {
                    ipInputRef.current.classList.add('success-copied')

                    setTimeout(() => {
                        ipInputRef.current!.classList.remove('success-copied')
                    }, 720)
                }
            }).catch(reason => console.log(reason))
            /* case when navigator clipboard is not available */
        } else {
            // text area method
            let textArea = document.createElement('textarea')
            textArea.value = value

            // make the textarea out of viewport
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            textArea.style.top = '-999999px'

            document.body.appendChild(textArea)

            textArea.focus()
            textArea.select()

            return new Promise<void>((res, rej) => {
                // here is the place where the magic happens
                document.execCommand('copy') ? res() : rej()
                textArea.remove()

                if (ipInputRef.current !== null) {
                    ipInputRef.current.classList.add('success-copied')

                    setTimeout(() => {
                        ipInputRef.current!.classList.remove('success-copied')
                    }, 720)
                }
            })
        }
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
import React, {HTMLProps, memo} from 'react'

import {useTranslation} from 'react-i18next'

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

import './RedirectButton.css'

interface RedirectButtonProps {
    content: string
    url: string
}

const RedirectButton = ({content, url, ...props}: RedirectButtonProps & HTMLProps<HTMLAnchorElement>) => {

    const {t} = useTranslation()

    return (
        <a id='redirect-button--container' href={url} {...props}>
            <span className='clr-pr-1 fw--semi-bold anchor-d-clr'>
                {t(content)}
                <KeyboardArrowRightRoundedIcon/>
            </span>
        </a>
    )
}

export default memo(RedirectButton)
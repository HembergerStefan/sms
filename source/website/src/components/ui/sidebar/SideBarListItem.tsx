import React, {createElement, FunctionComponent, memo} from 'react'
import {Link, useLocation} from 'react-router-dom'

import useHover from '../../../hooks/useHover'

import TooltipManager from '../tooltip/TooltipManager'

interface SideBarListItemProps {
    value: { image: FunctionComponent, title: string, url: string }
}

const SideBarListItem = ({value}: SideBarListItemProps) => {

    const [hoverRef, isHovered] = useHover()

    // Assigning location variable
    const location = useLocation()
    // Destructuring pathname from location
    const {pathname} = location

    return (
        <>
            <li className='nv-clr--default side-image--text-wrapper'>
                <div className={`nav-item ${(pathname === '/' + value.url) ? 'side-active-nav-item' : ''}`}>
                    <Link ref={hoverRef} to={`/${value.url}`}>
                        {
                            /* Create the mui svg component */
                            createElement<any>(value.image, {style: {fontSize: '25px'}})
                        }
                        <span className='fs-pr-body-1 fw--semi-bold nv-clr--default'>{value.title}</span>
                    </Link>
                </div>
            </li>

            {
                (isHovered && document.querySelector<Element>('.active-sidebar-layout') !== null) ?
                    <TooltipManager content={<span className='fs-sc-body-1 fw--semi-bold'>{value.title}</span>}/>
                    : null
            }
        </>
    )
}

export default memo(SideBarListItem)
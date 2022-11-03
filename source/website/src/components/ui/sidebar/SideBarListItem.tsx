import React, {createElement, FunctionComponent} from 'react'
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
    // Javascript split method to get the name of the path in array
    const splitLocation = pathname.split('/')

    return (
        <>
            <li className={`nv-clr--default side-image--text-wrapper`}>
                <div className={`${(splitLocation[1] === value.url) ? 'side-active-nav-item' : ''}`}>
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
                    <TooltipManager content={<span>{value.title}</span>}/>
                    : null
            }
        </>
    )
}

export default SideBarListItem
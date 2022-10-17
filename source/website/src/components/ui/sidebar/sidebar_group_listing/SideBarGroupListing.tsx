import React from 'react'

import './SideBarGroupListing.css'

const SideBarGroupListing = () => {

    const ITEMS: { group: string, clients: number }[] = [
        {group: 'School', clients: 64},
        {group: 'Home Office', clients: 8},
        {group: 'Gaming', clients: 12},
        {group: 'Work', clients: 0},
        {group: 'Figma Gang', clients: 1}
    ]

    return (
        <ul id='side-group-listing'>
            {
                ITEMS.map((cr) => (
                    <li>
                        <span className='fs-pr-body-1 fw--semi-bold nv-clr--default'>{cr.group}</span>
                        <div>
                            <span className='fs-pr-body-1 fw--semi-bold'>{cr.clients}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default SideBarGroupListing
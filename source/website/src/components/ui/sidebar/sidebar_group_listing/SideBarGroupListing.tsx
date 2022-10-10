import React from 'react'
import './SideBarGroupListing.css'

const SideBarGroupListing = () => {

    const ITEMS: { name: string, clients: number }[] = [
        {'name': 'School', 'clients': 64},
        {'name': 'Home Office', 'clients': 8},
        {'name': 'Gaming', 'clients': 12},
        {'name': 'Work', 'clients': 0},
        {'name': 'Figma Gang', 'clients': 1}
    ]

    return (
        <div id='side-group-listing--container'>
            <ul id='side-group-listing'>
                {
                    ITEMS.map((cr) => (
                        <li>
                            <span className='fs-pr-body-1 fw--semi-bold nv-clr--default'>{cr.name}</span>
                            <div>
                                <span className='fs-pr-body-1 fw--semi-bold'>{cr.clients}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideBarGroupListing
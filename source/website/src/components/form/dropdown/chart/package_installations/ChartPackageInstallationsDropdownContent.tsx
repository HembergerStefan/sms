import React from 'react'

import {useTranslation} from 'react-i18next'

import useChartPackageInstallationsStore from '../../../../../stores/chartPackageInstallationsStore'

import Dropdown from '../../Dropdown'

import '../ChartDropdownContent.css'

interface ChartDropdownContentProps {

}

const ChartPackageInstallationsDropdownContent = ({}: ChartDropdownContentProps) => {

    const {t} = useTranslation()

    const {packageInstallationTickStepSize, setPackageInstallationTickStepSize} = useChartPackageInstallationsStore()

    const TICK_STEP_SIZE_ITEMS: number[] = [2, 5, 10, 15, 20, 50, 100]

    /* User selected item, so change the card list size to it */
    const handleChange = (cr: number): void => {
        setPackageInstallationTickStepSize(cr)
    }

    return (
        <>
            <ul id='dropdown-content' className='bc-tbl--ddn-cnt--cr'>

                <div>
                    <Dropdown prefix='Step Size' defaultValue={2} firstSelectedValue={packageInstallationTickStepSize}
                              items={TICK_STEP_SIZE_ITEMS}
                              handleChange={handleChange}/>
                </div>

            </ul>
        </>
    )
}

export default ChartPackageInstallationsDropdownContent
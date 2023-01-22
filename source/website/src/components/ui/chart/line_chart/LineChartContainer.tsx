import React, {useEffect, useState} from 'react'

import {Line} from 'react-chartjs-2'
import type {ChartData, ChartOptions} from 'chart.js'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from 'chart.js'

import './LineChartContainer.css'
import {useTranslation} from "react-i18next";
import {Dataset} from "../../../../store/chartScriptExecutionsStore";
import BoxHeading from "../../box_heading_container/BoxHeading";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
)

interface LineChartContainerProps {
    labels: string[]
    dataSets: Dataset[]
    tickStepSize: number
    boxHeading: string
    dropdownContent: React.ReactNode
}

const LineChartContainer = ({labels, dataSets, tickStepSize, boxHeading, dropdownContent}: LineChartContainerProps) => {

    const {t} = useTranslation()

    const [mountDropdown, setMountDropdown] = useState<boolean>(false)
    const [colors, setColors] = useState({
        prClr: 'hsl(217, 33%, 17%)',
        scClr: 'hsl(215, 25%, 27%)',
        chtClr1: 'hsl(248, 57%, 60%)',
        chtClr2: 'hsl(217, 85%, 53%)',
        bgClr: 'hsl(0, 0%, 100%)'
    })

    useEffect(() => {
        const computedStyle = getComputedStyle(document.body)

        setColors({
            prClr: computedStyle.getPropertyValue('--pr-clr'),
            scClr: computedStyle.getPropertyValue('--sc-clr'),
            chtClr1: computedStyle.getPropertyValue('--cht-br-clr-1'),
            chtClr2: computedStyle.getPropertyValue('--cht-br-clr-2'),
            bgClr: computedStyle.getPropertyValue('--nl-clr-3')
        })
    }, [])

    const data: ChartData<'line'> = {
        labels: labels,
        datasets: [
            {
                label: t(dataSets.at(0)!.label),
                data: dataSets.at(0)!.data,
                borderColor: colors.chtClr1,
                backgroundColor: 'transparent',
                tension: .5,
                pointBackgroundColor: colors.chtClr1,
                pointHoverRadius: 5
            },
            {
                label: t(dataSets.at(1)!.label),
                data: dataSets.at(1)!.data,
                borderColor: colors.chtClr2,
                backgroundColor: 'transparent',
                tension: .5,
                pointBackgroundColor: colors.chtClr2,
                pointHoverRadius: 5
            }
        ]
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                ticks: {
                    stepSize: tickStepSize
                },
                border: {
                    dash: [10]
                }
            },
        },
        interaction: {
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    textAlign: 'center',
                    font: {
                        family: 'Poppins, sans-serif',
                        size: 13,
                        weight: '400'
                    }
                }
            },
            tooltip: {
                titleAlign: 'left',
                titleFont: {
                    family: 'Poppins, sans-serif',
                    size: 15,
                    weight: '400'
                },
                bodyAlign: 'left',
                bodyFont: {
                    family: 'Poppins, sans-serif',
                    size: 13,
                    weight: '300'
                },
                usePointStyle: true,
                titleColor: colors.prClr,
                bodyColor: colors.scClr,
                backgroundColor: colors.bgClr,
                borderColor: colors.scClr,
                borderWidth: .5,
            }
        }
    }

    return (
        <article id='charts-container' className='box'>
            <BoxHeading content={
                <h2 className='fs-qr-1 fw--semi-bold'>{t(boxHeading)}</h2>}
                        dropdownContent={dropdownContent}
                        mountDropdown={mountDropdown}
                        setMountDropdown={setMountDropdown}/>

            <Line data={data} options={options}/>
        </article>
    )
}

export default LineChartContainer
import React from 'react'

import './ChartContainer.css'
import {AxisOptions, Chart} from "react-charts";

const ChartContainer = () => {

    type DailyStars = {
        date: Date,
        stars: number,
    }

    type Series = {
        label: string,
        data: DailyStars[]
    }

    const data: Series[] = [
        {
            label: 'React Charts',
            data: [
                {
                    date: new Date(),
                    stars: 24,
                }
                // ...
            ]
        },
        {
            label: 'React Query',
            data: [
                {
                    date: new Date(),
                    stars: 12,
                }
                // ...
            ]
        }
    ]

    const primaryAxis = React.useMemo(
        (): AxisOptions<DailyStars> => ({
            getValue: datum => datum.date,
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<DailyStars>[] => [
            {
                getValue: datum => datum.stars,
            },
        ],
        []
    )

    return (
        <article id='charts-container' className='box'>
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,

                    }}
                />
        </article>
    )
}

export default ChartContainer
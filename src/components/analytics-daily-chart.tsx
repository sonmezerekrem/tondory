'use client'

import {useEffect, useState} from 'react'
import {Bar, BarChart, XAxis, YAxis} from 'recharts'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {ChartContainer, ChartTooltip} from '@/components/ui/chart'
import {HugeiconsIcon} from '@hugeicons/react'
import {ChartDecreaseIcon, ChartIncreaseIcon} from '@hugeicons/core-free-icons'
import {getUserTimezone} from '@/lib/timezone'

interface DailyChartData {
    date: string
    day: string
    count: number
    fullDate: string
}

interface ChartResponse {
    chartData: DailyChartData[]
    summary: {
        totalCount: number
        trendPercentage: number
        isPositive: boolean
    }
}

const chartConfig = {
    count: {
        label: "Articles",
        color: "hsl(var(--primary))",
    },
}

export default function AnalyticsDailyChart() {
    const [data, setData] = useState<ChartResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const timezone = getUserTimezone()
                const response = await fetch(`/api/analytics/daily-chart?timezone=${timezone}`)
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error('Error fetching daily chart data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Daily Reading Activity</CardTitle>
                    <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-pulse">Loading chart...</div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!data) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Daily Reading Activity</CardTitle>
                    <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Failed to load chart data
                    </div>
                </CardContent>
            </Card>
        )
    }

    const {chartData, summary} = data

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Daily Reading Activity</CardTitle>
                    <CardDescription>
                        {new Date(chartData[0]?.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric'
                        })} - {new Date(chartData[chartData.length - 1]?.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <HugeiconsIcon
                        icon={summary.isPositive ? ChartIncreaseIcon : ChartDecreaseIcon}
                        size={16}
                        className={summary.isPositive ? "text-green-600" : "text-red-600"}
                    />
                    <span className={summary.isPositive ? "text-green-600" : "text-red-600"}>
            {summary.isPositive ? "+" : ""}{summary.trendPercentage}%
          </span>
                </div>
            </CardHeader>
            <CardContent className="overflow-hidden p-3 sm:p-6">
                <div className="w-full overflow-hidden">
                    <ChartContainer config={chartConfig} className="h-[200px] sm:h-[250px] lg:h-[300px] w-full min-w-0">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tick={{fontSize: 12}}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{fontSize: 12}}
                            tickFormatter={(value) => `${value}`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({active, payload}) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload as DailyChartData
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid gap-2">
                                                <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {data.fullDate}
                          </span>
                                                    <span className="font-bold text-muted-foreground">
                            {data.count} {data.count === 1 ? 'article' : 'articles'}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                    </ChartContainer>
                </div>
                <div className="flex items-center pt-4 text-sm text-muted-foreground">
                    <HugeiconsIcon
                        icon={summary.isPositive ? ChartIncreaseIcon : ChartDecreaseIcon}
                        size={16}
                        className="mr-2"
                    />
                    <span>
            {summary.isPositive ? "Trending up by" : "Trending down by"} {Math.abs(summary.trendPercentage)}% compared to last week
          </span>
                </div>

            </CardContent>
        </Card>
    )
}
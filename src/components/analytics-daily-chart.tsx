'use client'

import {Bar, BarChart, XAxis, YAxis} from 'recharts'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {ChartContainer, ChartTooltip} from '@/components/ui/chart'
import {ChartResponse, DailyChartData} from "@/types/chart-data";

const chartConfig = {
    count: {
        label: "Articles",
        color: "hsl(var(--primary))",
    },
}

type Props = {
    data: ChartResponse
}

export default function AnalyticsDailyChart({data}: Props) {
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

    const {chartData} = data

    return (
        <Card className="overflow-hidden p-0 border-none shadow-none rounded-none bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
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
            </CardHeader>
            <CardContent className="overflow-hidden p-0 sm:p-6">
                <div className="w-full overflow-hidden">
                    <ChartContainer config={chartConfig}
                                    className="p-0 m-0 h-[200px] w-full min-w-0">
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
                                tickMargin={0}
                                axisLine={false}
                                tick={{fontSize: 12}}
                                padding={
                                    {left: 0, right: 0}
                                }
                            />
                            <YAxis
                                hide={true}
                                tickLine={false}
                                axisLine={false}
                                tick={{fontSize: 12}}
                                tickFormatter={(value) => `${value}`}
                                tickMargin={0}
                                width={20}
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
                                                        <span
                                                            className="text-[0.70rem] uppercase text-muted-foreground">
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
                                fill="var(--chart-1)"
                                radius={[4, 4, 0, 0]}
                                className={"border"}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>

            </CardContent>
        </Card>
    )
}
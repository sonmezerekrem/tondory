export interface DailyChartData {
    date: string
    day: string
    count: number
    fullDate: string
}

export interface ChartResponse {
    chartData: DailyChartData[]
}
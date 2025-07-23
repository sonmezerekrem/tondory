import {HugeiconsIcon} from '@hugeicons/react'
import {BookmarkAdd01Icon, BookOpen01Icon, Calendar01Icon, ChartIncreaseIcon} from '@hugeicons/core-free-icons'
import DashboardStatCard from "@/components/dashboard-stat-card"
import {BlogPostStats} from "@/types/stats"
import {cookies} from "next/headers"
import AppTitle from "@/components/app-title"
import {MobileRefreshButton} from "@/components/mobile-refresh-button"
import AnalyticsDailyChart from "@/components/analytics-daily-chart"

export default async function AnalyticsPage() {
    const cookieStore = await cookies()

    const stats: BlogPostStats = await fetch(
        `${process.env.BACKEND_URL}/api/daily-stats?timezone=UTC`, {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())

    return (
        <div className="space-y-8">
            <AppTitle
                title="Analytics"
                subtitle="Insights into your reading habits and progress"
                rightElement={<MobileRefreshButton/>}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardStatCard
                    title="Total Articles"
                    subtitle="Your reading collection"
                    icon={BookOpen01Icon}
                    data={stats?.total || 0}
                />
                <DashboardStatCard
                    title="This Month"
                    subtitle="Articles read"
                    icon={Calendar01Icon}
                    data={stats?.thisMonth || 0}
                />
                <DashboardStatCard
                    title="This Week"
                    subtitle="Recent activity"
                    icon={ChartIncreaseIcon}
                    data={stats?.thisWeek || 0}
                />
                <DashboardStatCard
                    title="Bookmarks"
                    subtitle="Saved articles"
                    icon={BookmarkAdd01Icon}
                    data={stats?.bookmarks || 0}
                />
            </div>

            {/* Charts Section */}
            <div className="grid gap-6">
                {/* Daily Reading Chart */}
                <AnalyticsDailyChart/>

                {/* Additional charts can be added here */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Placeholder for future charts */}
                    <div className="bg-card rounded-lg border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">Reading Streak</h3>
                                <p className="text-sm text-muted-foreground">Your current reading streak</p>
                            </div>
                            <HugeiconsIcon icon={ChartIncreaseIcon} size={20} className="text-muted-foreground"/>
                        </div>
                        <div className="text-center py-8">
                            <div className="text-3xl font-bold text-primary mb-2">
                                {Math.floor(Math.random() * 15) + 1} days
                            </div>
                            <p className="text-sm text-muted-foreground">Keep it up!</p>
                        </div>
                    </div>

                    <div className="bg-card rounded-lg border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">Average per Day</h3>
                                <p className="text-sm text-muted-foreground">This month</p>
                            </div>
                            <HugeiconsIcon icon={ChartIncreaseIcon} size={20} className="text-muted-foreground"/>
                        </div>
                        <div className="text-center py-8">
                            <div className="text-3xl font-bold text-primary mb-2">
                                {((stats?.thisMonth || 0) / new Date().getDate()).toFixed(1)}
                            </div>
                            <p className="text-sm text-muted-foreground">articles per day</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
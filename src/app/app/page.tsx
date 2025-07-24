import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {
    ArrowRight01Icon,
    BookmarkAdd01Icon,
    BookOpen01Icon,
    Calendar01Icon,
    ChartIncreaseIcon
} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import DashboardStatCard from "@/components/dashboard-stat-card";
import DashboardRecentPost from '@/components/dashboard-recent-post'
import {User} from "@/types/user";
import {BlogPostStats} from "@/types/stats";
import DashboardAddBlogButton from "@/components/dashboard-add-blog-button";
import {cookies} from "next/headers";
import AppTitle from "@/components/app-title";
import AnalyticsDailyChart from "@/components/analytics-daily-chart";
import {ChartResponse} from "@/types/chart-data";

export default async function Page() {
    const cookieStore = await cookies()

    const user: User = await fetch(
        `${process.env.BACKEND_URL}/api/user`, {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())

    const stats: BlogPostStats = await fetch(
        `${process.env.BACKEND_URL}/api/daily-stats?timezone=UTC`, {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())

    const chartData: ChartResponse = await fetch(
        `${process.env.BACKEND_URL}/api/analytics/daily-chart?timezone=UTC`, {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())


    const getTimeGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <div className="space-y-8">
            <AppTitle title={`${getTimeGreeting()},  ${user.name || user.email?.split('@')[0] || 'Reader'}!`}
                      subtitle={"Ready to discover something new today?"}
            />


            <div className="space-y-8 grid  sm:grid-cols-3 gap-3">
                {/* Stats Grid */}
                <div className="grid grid-cols-2  gap-4 order-2 sm:order-1">
                    <DashboardStatCard title={"Total Articles"} subtitle={"Your reading collection"}
                                       icon={BookOpen01Icon}
                                       data={stats?.total || 0}/>
                    <DashboardStatCard title={"This Month"} subtitle={"Articles read"} icon={Calendar01Icon}
                                       data={stats?.thisMonth || 0}/>
                    <DashboardStatCard title={"This Week"} subtitle={"Recent activity"} icon={ChartIncreaseIcon}
                                       data={stats?.thisWeek || 0}/>
                    <DashboardStatCard title={"Bookmarks"} subtitle={"Saved articles"} icon={BookmarkAdd01Icon}
                                       data={stats?.bookmarks || 0}/>
                </div>

                {/* Daily Reading Chart */}
                <div className={"sm:col-span-2 order-1 sm:order-2 "}>
                    <AnalyticsDailyChart data={chartData}/>
                </div>
            </div>


            {/* Recent Articles Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Recent Articles</h2>
                        <p className="text-sm text-muted-foreground">Your latest reading activity</p>
                    </div>
                    <Link href="/app/articles">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            View All
                            <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="ml-1"/>
                        </Button>
                    </Link>
                </div>

                {stats?.recentPosts && stats.recentPosts.length > 0 ? (
                    <div className="flex flex-col divide-y divide-border/30 gap-2">
                        {stats.recentPosts.map((post) => (
                            <DashboardRecentPost key={post.id} post={post}/>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div
                            className="w-16 h-16 bg-secondary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HugeiconsIcon icon={BookOpen01Icon} size={32} className="text-muted-foreground"/>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No articles yet</h3>
                        <p className="text-muted-foreground mb-4">Start building your reading library by adding your
                            first article.</p>
                        <DashboardAddBlogButton/>
                    </div>
                )}
            </div>
        </div>
    )
}
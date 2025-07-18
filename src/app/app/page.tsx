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

export default async function Page() {
    const user: User = await fetch(
        `${process.env.BACKEND_URL}/api/user`, {
            cache: "no-store",
        }).then(res => res.json())

    console.log("user", user)

    const stats: BlogPostStats = await fetch(
        `${process.env.BACKEND_URL}/api/blog-posts/stats`, {
            cache: "no-store",

        }).then(res => res.json())

    console.log("stats", stats)

    const getTimeGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-2xl font-bold text-foreground">
                            {getTimeGreeting()}, {user?.email?.split('@')[0] || 'Reader'}!
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Ready to discover something new today?
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardStatCard title={"Total Articles"} subtitle={"Your reading collection"} icon={BookOpen01Icon}
                                   data={stats?.total || 0}/>
                <DashboardStatCard title={"This Month"} subtitle={"Articles read"} icon={Calendar01Icon}
                                   data={stats?.thisMonth || 0}/>
                <DashboardStatCard title={"This Week"} subtitle={"Recent activity"} icon={ChartIncreaseIcon}
                                   data={stats?.thisWeek || 0}/>
                <DashboardStatCard title={"Bookmarks"} subtitle={"Saved articles"} icon={BookmarkAdd01Icon}
                                   data={stats?.bookmarks || 0}/>
            </div>

            {/* Recent Articles Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Recent Articles</h2>
                        <p className="text-sm text-muted-foreground">Your latest reading activity</p>
                    </div>
                    <Link href="/app/blog-posts">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            View All
                            <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="ml-1"/>
                        </Button>
                    </Link>
                </div>

                {stats?.recentPosts && stats.recentPosts.length > 0 ? (
                    <div className="divide-y divide-border/30">
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
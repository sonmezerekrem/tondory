'use client'

import {useEffect, useState} from 'react'
import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {
    ArrowRight01Icon,
    BookmarkAdd01Icon,
    BookOpen01Icon,
    Calendar01Icon,
    ChartIncreaseIcon,
    PlusSignIcon
} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import {useModal} from '@/contexts/modal-context'
import DashboardStatCard from "@/components/dashboard-stat-card";
import DashboardRecentPost from '@/components/dashboard-recent-post'

interface BlogPostStats {
    total: number
    thisMonth: number
    thisWeek: number
    bookmarks: number
    recentPosts: Array<{
        id: string
        title: string
        site_name: string
        read_date: string
        image_url?: string
        url: string
    }>
}

export default function AppDashboard() {
    const [stats, setStats] = useState<BlogPostStats | null>(null)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const {openAddBlogPostModal} = useModal()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch('/api/user')
                if (userResponse.ok) {
                    const userData = await userResponse.json()
                    setUser(userData)
                }

                const statsResponse = await fetch('/api/blog-posts/stats')
                if (statsResponse.ok) {
                    const statsData = await statsResponse.json()
                    setStats(statsData)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

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

                {loading ? (
                    <div className="flex items-center justify-center">
                        <div role="status">
                            <svg aria-hidden="true"
                                 className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : stats?.recentPosts && stats.recentPosts.length > 0 ? (
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
                        <Button
                            className="bg-primary text-white hover:bg-primary/90 rounded-xl"
                            onClick={() => openAddBlogPostModal()}
                        >
                            <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2"/>
                            Add Your First Article
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
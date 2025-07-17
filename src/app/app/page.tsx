'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { DashboardSquare02Icon, BookOpen01Icon, Calendar01Icon, ChartIncreaseIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'

interface BlogPostStats {
  total: number
  thisMonth: number
  thisWeek: number
  recentPosts: Array<{
    id: string
    title: string
    site_name: string
    read_date: string
  }>
}

export default function AppDashboard() {
  const [stats, setStats] = useState<BlogPostStats | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user')
        if (userResponse.ok) {
          const userData = await userResponse.json()
          setUser(userData)
        }

        // Fetch blog post stats
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.email?.split('@')[0] || 'Reader'}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <HugeiconsIcon icon={BookOpen01Icon} size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.total === 0 ? 'No posts read yet' : 'Posts read so far'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats?.thisMonth || 0}</div>
            <p className="text-xs text-muted-foreground">
              Posts read this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <HugeiconsIcon icon={ChartIncreaseIcon} size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats?.thisWeek || 0}</div>
            <p className="text-xs text-muted-foreground">
              Posts read this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Blog Posts</CardTitle>
              <CardDescription>Your recently read blog posts</CardDescription>
            </div>
            <Link href="/app/blog-posts">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
              ))}
            </div>
          ) : stats?.recentPosts && stats.recentPosts.length > 0 ? (
            <div className="space-y-3">
              {stats.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">
                      {post.title || 'Untitled'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {post.site_name} • {formatDate(post.read_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No blog posts yet. Start by adding your first one!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
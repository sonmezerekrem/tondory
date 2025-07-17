'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { BookOpen01Icon, Calendar01Icon, ChartIncreaseIcon, PlusSignIcon, Fire03Icon, Link02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
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
    image_url?: string
    url: string
  }>
}

export default function AppDashboard() {
  const [stats, setStats] = useState<BlogPostStats | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {getTimeGreeting()}, {user?.email?.split('@')[0] || 'Reader'}!
            </h1>
            <Badge className="bg-primary/10 text-primary text-sm">
              {stats?.total || 0} Articles
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Ready to discover something new today?
          </p>
        </div>
        <Link href="/app/blog-posts">
          <Button className="bg-primary text-white hover:bg-primary/90 shadow-lg">
            <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
            Add Article
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Articles</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <HugeiconsIcon icon={BookOpen01Icon} size={16} className="text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{loading ? '...' : stats?.total || 0}</div>
            <p className="text-xs text-primary/80">
              {stats?.total === 0 ? 'Start your reading journey' : 'Keep up the great work!'}
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-accent/5 to-accent/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-accent">This Month</CardTitle>
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{loading ? '...' : stats?.thisMonth || 0}</div>
            <p className="text-xs text-accent/80">
              Articles read this month
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-info/5 to-info/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-info">This Week</CardTitle>
            <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
              <HugeiconsIcon icon={ChartIncreaseIcon} size={16} className="text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{loading ? '...' : stats?.thisWeek || 0}</div>
            <p className="text-xs text-info/80">
              Articles this week
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-success/5 to-success/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-success">Reading Streak</CardTitle>
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <HugeiconsIcon icon={Fire03Icon} size={16} className="text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">3</div>
            <p className="text-xs text-success/80">
              Days in a row
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2">
          <Card className="card-shadow border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <HugeiconsIcon icon={BookOpen01Icon} size={20} className="mr-2 text-primary" />
                    Recent Articles
                  </CardTitle>
                  <CardDescription>Your latest reading activity</CardDescription>
                </div>
                <Link href="/app/blog-posts">
                  <Button variant="outline" size="sm" className="text-primary border-primary/30 hover:bg-primary/10">
                    View All
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 rounded-xl bg-secondary/30 animate-pulse">
                      <div className="w-16 h-16 bg-secondary/60 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-secondary/60 rounded w-3/4"></div>
                        <div className="h-3 bg-secondary/60 rounded w-1/2"></div>
                        <div className="h-3 bg-secondary/60 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : stats?.recentPosts && stats.recentPosts.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentPosts.map((post) => (
                    <div key={post.id} className="flex items-start space-x-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group">
                      <div className="w-16 h-16 bg-secondary/60 rounded-lg flex items-center justify-center overflow-hidden">
                        {post.image_url ? (
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 text-foreground mb-1 group-hover:text-primary transition-colors">
                          {post.title || 'Untitled Article'}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{post.site_name}</span>
                          <span>•</span>
                          <span>{formatDate(post.read_date)}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(post.url, '_blank')}
                      >
                        <HugeiconsIcon icon={Link02Icon} size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HugeiconsIcon icon={BookOpen01Icon} size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No articles yet</h3>
                  <p className="text-muted-foreground mb-4">Start building your reading library by adding your first article.</p>
                  <Link href="/app/blog-posts">
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
                      Add Your First Article
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Insights */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="card-shadow border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/app/blog-posts">
                <Button variant="outline" className="w-full justify-start h-12 border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-all">
                  <HugeiconsIcon icon={PlusSignIcon} size={20} className="mr-3 text-primary" />
                  Add New Article
                </Button>
              </Link>
              <Link href="/app/analytics">
                <Button variant="outline" className="w-full justify-start h-12 border-accent/30 hover:bg-accent/10 hover:border-accent/60 transition-all" disabled>
                  <HugeiconsIcon icon={ChartIncreaseIcon} size={20} className="mr-3 text-accent" />
                  View Analytics
                  <Badge className="ml-auto bg-accent/10 text-accent text-xs">Soon</Badge>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Reading Insights */}
          <Card className="card-shadow border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Reading Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Articles per week</span>
                </div>
                <span className="text-sm font-bold text-primary">
                  {stats?.thisWeek || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">Favorite day</span>
                </div>
                <span className="text-sm font-bold text-accent">Sunday</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-info rounded-full"></div>
                  <span className="text-sm font-medium">Reading streak</span>
                </div>
                <span className="text-sm font-bold text-info">3 days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
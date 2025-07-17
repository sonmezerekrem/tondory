'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { BookOpen01Icon, Calendar01Icon, ChartIncreaseIcon, PlusSignIcon, Fire03Icon, Link02Icon, ArrowRight01Icon, Clock01Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { useModal } from '@/contexts/modal-context'

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
  const { openAddBlogPostModal } = useModal()

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

      {/* Stats Grid - Cardless */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Articles */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Total Articles</p>
              <p className="text-xs text-muted-foreground">Your reading collection</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {loading ? '...' : stats?.total || 0}
          </div>
        </div>

        {/* This Month */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <HugeiconsIcon icon={Calendar01Icon} size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">This Month</p>
              <p className="text-xs text-muted-foreground">Articles read</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-accent">
            {loading ? '...' : stats?.thisMonth || 0}
          </div>
        </div>

        {/* This Week */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
              <HugeiconsIcon icon={ChartIncreaseIcon} size={20} className="text-info" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">This Week</p>
              <p className="text-xs text-muted-foreground">Recent activity</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-info">
            {loading ? '...' : stats?.thisWeek || 0}
          </div>
        </div>

        {/* Reading Streak */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
              <HugeiconsIcon icon={Fire03Icon} size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Reading Streak</p>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-success">3</div>
        </div>
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
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="ml-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="py-3 border-b border-border/30 animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-secondary/30 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-secondary/30 rounded w-3/4"></div>
                    <div className="h-3 bg-secondary/30 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : stats?.recentPosts && stats.recentPosts.length > 0 ? (
          <div className="divide-y divide-border/30">
            {stats.recentPosts.map((post) => (
              <div 
                key={post.id} 
                className="py-3 hover:bg-secondary/20 transition-colors cursor-pointer group"
                onClick={() => window.open(post.url, '_blank')}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    {post.image_url ? (
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                      {post.title || 'Untitled Article'}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{post.site_name || 'Unknown Source'}</span>
                      <span>•</span>
                      <span>{formatDate(post.read_date)}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full hover:bg-secondary/80 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(post.url, '_blank')
                    }}
                  >
                    <HugeiconsIcon icon={Link02Icon} size={14} className="text-muted-foreground" />
                  </Button>
                </div>
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
            <Button 
              className="bg-primary text-white hover:bg-primary/90 rounded-xl"
              onClick={() => openAddBlogPostModal()}
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
              Add Your First Article
            </Button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            variant="ghost" 
            className="h-12 justify-start text-primary hover:bg-primary/10 border border-primary/30 hover:border-primary/60 rounded-xl transition-all"
            onClick={() => openAddBlogPostModal()}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={20} className="mr-3" />
            Add New Article
          </Button>
          
          <Link href="/app/blog-posts">
            <Button 
              variant="ghost" 
              className="w-full h-12 justify-start text-accent hover:bg-accent/10 border border-accent/30 hover:border-accent/60 rounded-xl transition-all"
            >
              <HugeiconsIcon icon={BookOpen01Icon} size={20} className="mr-3" />
              Browse Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
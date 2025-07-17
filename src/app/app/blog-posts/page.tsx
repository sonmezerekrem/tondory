'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon, Search01Icon, Grid02Icon, Menu02Icon, FilterIcon } from '@hugeicons/core-free-icons'
import { AddBlogPostModal } from '@/components/add-blog-post-modal'
import { BlogPostCard } from '@/components/blog-post-card'
import { BlogPostListItem } from '@/components/blog-post-list-item'
import { cn } from '@/lib/utils'

interface BlogPost {
  id: string
  url: string
  title: string
  description: string
  image_url: string
  site_name: string
  read_date: string
  created_at: string
  isBookmarked?: boolean
}

type ViewMode = 'grid' | 'list'

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog-posts')
      if (response.ok) {
        const data = await response.json()
        const postsWithBookmarks = data.map((post: BlogPost) => ({
          ...post,
          isBookmarked: false // TODO: Implement bookmark API
        }))
        setBlogPosts(postsWithBookmarks)
        setFilteredPosts(postsWithBookmarks)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(blogPosts)
    } else {
      const filtered = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.site_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredPosts(filtered)
    }
  }, [searchQuery, blogPosts])

  const handlePostAdded = (newPost: BlogPost) => {
    const postWithBookmark = { ...newPost, isBookmarked: false }
    setBlogPosts([postWithBookmark, ...blogPosts])
    setFilteredPosts([postWithBookmark, ...filteredPosts])
    setIsModalOpen(false)
  }

  const handleBookmarkToggle = (postId: string) => {
    const updatedPosts = blogPosts.map(post =>
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    )
    setBlogPosts(updatedPosts)
    setFilteredPosts(updatedPosts.filter(post =>
      searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.site_name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Articles</h1>
            <p className="text-sm text-muted-foreground">
              Manage your reading collection
            </p>
          </div>
          <Button 
            className="bg-primary text-white hover:bg-primary/90 rounded-xl px-6"
            onClick={() => setIsModalOpen(true)}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
            Add Article
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <HugeiconsIcon 
            icon={Search01Icon} 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-background/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-sm"
          />
        </div>

        {/* View Toggle and Results */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-secondary/30 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-3 rounded-md transition-all",
                  viewMode === 'grid' 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setViewMode('grid')}
              >
                <HugeiconsIcon icon={Grid02Icon} size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-3 rounded-md transition-all",
                  viewMode === 'list' 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setViewMode('list')}
              >
                <HugeiconsIcon icon={Menu02Icon} size={16} />
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <HugeiconsIcon icon={FilterIcon} size={16} className="mr-2" />
              Filter
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`}
            {searchQuery && ` found for "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6" 
            : "divide-y divide-border/30"
        )}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={cn(
              "animate-pulse",
              viewMode === 'grid' 
                ? "space-y-3" 
                : "py-3 flex items-start space-x-3"
            )}>
              {viewMode === 'grid' ? (
                <>
                  <div className="bg-secondary/30 aspect-[16/10] rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="bg-secondary/30 h-4 rounded"></div>
                    <div className="bg-secondary/30 h-3 w-3/4 rounded"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-secondary/30 w-16 h-16 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="bg-secondary/30 h-4 rounded"></div>
                    <div className="bg-secondary/30 h-3 w-2/3 rounded"></div>
                  </div>
                  <div className="bg-secondary/30 w-8 h-8 rounded-full flex-shrink-0"></div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-secondary/60 rounded-full flex items-center justify-center mx-auto mb-4">
            <HugeiconsIcon icon={PlusSignIcon} size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchQuery ? 'No articles found' : 'No articles yet'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? `No articles match "${searchQuery}". Try a different search term.`
              : 'Start building your reading library by adding your first article.'
            }
          </p>
          {!searchQuery && (
            <Button 
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => setIsModalOpen(true)}
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
              Add Your First Article
            </Button>
          )}
        </div>
      ) : (
        <div className={cn(
          "transition-all duration-300",
          viewMode === 'grid' 
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6" 
            : "divide-y divide-border/30"
        )}>
          {filteredPosts.map((post) => (
            viewMode === 'grid' ? (
              <BlogPostCard
                key={post.id}
                post={post}
                onBookmarkToggle={handleBookmarkToggle}
                className="animate-fade-in"
              />
            ) : (
              <BlogPostListItem
                key={post.id}
                post={post}
                onBookmarkToggle={handleBookmarkToggle}
                className="animate-fade-in"
              />
            )
          ))}
        </div>
      )}

      {/* Add Article Modal */}
      <AddBlogPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostAdded={handlePostAdded}
      />
    </div>
  )
}
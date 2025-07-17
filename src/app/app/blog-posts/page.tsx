'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon, Link02Icon, Calendar01Icon, LinkCircle02Icon } from '@hugeicons/core-free-icons'
import { AddBlogPostModal } from '@/components/add-blog-post-modal'

interface BlogPost {
  id: string
  url: string
  title: string
  description: string
  image_url: string
  site_name: string
  read_date: string
  created_at: string
}

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog-posts')
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
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

  const handlePostAdded = (newPost: BlogPost) => {
    setBlogPosts([newPost, ...blogPosts])
    setIsModalOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">
            Keep track of the blog posts you've read
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
          Add Blog Post
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : blogPosts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No blog posts yet</CardTitle>
            <CardDescription>
              Start by adding your first blog post to keep track of your reading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>
              <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
              Add Your First Blog Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">
                      {post.title || 'Untitled'}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <HugeiconsIcon icon={Calendar01Icon} size={14} className="mr-1" />
                      {formatDate(post.read_date)}
                    </div>
                    {post.site_name && (
                      <Badge variant="secondary" className="text-xs">
                        {post.site_name}
                      </Badge>
                    )}
                  </div>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded ml-3"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {post.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {post.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <HugeiconsIcon icon={Link02Icon} size={14} className="mr-1" />
                    <span className="truncate max-w-[200px]">
                      {new URL(post.url).hostname}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(post.url, '_blank')}
                  >
                    <HugeiconsIcon icon={LinkCircle02Icon} size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddBlogPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostAdded={handlePostAdded}
      />
    </div>
  )
}
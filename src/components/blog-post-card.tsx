import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { BookmarkAdd01Icon, BookmarkRemove01Icon, Link02Icon } from '@hugeicons/core-free-icons'
import { AuthorAvatar } from '@/components/author-avatar'
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

interface BlogPostCardProps {
  post: BlogPost
  onBookmarkToggle?: (postId: string) => void
  className?: string
}

export function BlogPostCard({ post, onBookmarkToggle, className }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getAuthorName = (siteName: string) => {
    // Extract a reasonable author name from site name
    if (!siteName) return 'Unknown'
    return siteName.replace(/\.com|\.org|\.net/g, '').split('.')[0]
  }

  return (
    <Card className={cn("card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden group", className)}>
      {/* Article Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <HugeiconsIcon icon={Link02Icon} size={32} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all"
          onClick={() => onBookmarkToggle?.(post.id)}
        >
          <HugeiconsIcon 
            icon={post.isBookmarked ? BookmarkRemove01Icon : BookmarkAdd01Icon} 
            size={16} 
            className={cn(
              "transition-colors",
              post.isBookmarked ? "text-accent" : "text-muted-foreground"
            )}
          />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {post.title || 'Untitled Article'}
        </h3>

        {/* Author and Date */}
        <div className="flex items-center space-x-3">
          <AuthorAvatar name={getAuthorName(post.site_name)} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {getAuthorName(post.site_name)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(post.read_date)}
            </p>
          </div>
          {post.site_name && (
            <Badge variant="secondary" className="text-xs">
              {post.site_name}
            </Badge>
          )}
        </div>

        {/* Open Link Button */}
        <Button
          variant="outline"
          className="w-full justify-center h-9 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all"
          onClick={() => window.open(post.url, '_blank')}
        >
          <HugeiconsIcon icon={Link02Icon} size={16} className="mr-2" />
          Read Article
        </Button>
      </CardContent>
    </Card>
  )
}
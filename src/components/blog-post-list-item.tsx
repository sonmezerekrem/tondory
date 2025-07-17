import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { BookmarkAdd01Icon, BookmarkRemove01Icon, Link02Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons'
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

interface BlogPostListItemProps {
  post: BlogPost
  onBookmarkToggle?: (postId: string) => void
  className?: string
}

export function BlogPostListItem({ post, onBookmarkToggle, className }: BlogPostListItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getAuthorName = (siteName: string) => {
    if (!siteName) return 'Unknown'
    return siteName.replace(/\.com|\.org|\.net/g, '').split('.')[0]
  }

  return (
    <div className={cn(
      "p-2 rounded-xl bg-card/50 hover:bg-card/80 border border-border/40 hover:border-border/60 transition-all duration-300 group",
      className
    )}>
      <div className="flex items-start space-x-4">
        {/* Article Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden">
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <HugeiconsIcon icon={Link02Icon} size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-base sm:text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {post.title || 'Untitled Article'}
          </h3>

          {/* Description - Hidden on mobile */}
          {post.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">
              {post.description}
            </p>
          )}

          {/* Author and Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AuthorAvatar name={getAuthorName(post.site_name)} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {getAuthorName(post.site_name)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(post.read_date)}
                </p>
              </div>
            </div>

            {/* Site Badge - Hidden on mobile */}
            {post.site_name && (
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                {post.site_name}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center space-y-2">
          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 rounded-full hover:bg-secondary/80 transition-all"
            onClick={() => onBookmarkToggle?.(post.id)}
          >
            <HugeiconsIcon 
              icon={post.isBookmarked ? BookmarkRemove01Icon : BookmarkAdd01Icon} 
              size={16} 
              className={cn(
                "transition-colors",
                post.isBookmarked ? "text-accent" : "text-muted-foreground hover:text-foreground"
              )}
            />
          </Button>

          {/* More Options */}
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 rounded-full hover:bg-secondary/80 transition-all opacity-0 group-hover:opacity-100"
            onClick={() => window.open(post.url, '_blank')}
          >
            <HugeiconsIcon icon={Link02Icon} size={14} className="text-muted-foreground hover:text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}
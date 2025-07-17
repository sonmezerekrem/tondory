import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { BookmarkAdd01Icon, BookmarkRemove01Icon, Link02Icon } from '@hugeicons/core-free-icons'
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

  return (
    <div 
      className={cn("group cursor-pointer", className)}
      onClick={() => window.open(post.url, '_blank')}
    >
      {/* Article Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-3">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-xl">
            <HugeiconsIcon icon={Link02Icon} size={32} className="text-muted-foreground" />
          </div>
        )}
        
        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all"
          onClick={(e) => {
            e.stopPropagation()
            onBookmarkToggle?.(post.id)
          }}
        >
          <HugeiconsIcon 
            icon={post.isBookmarked ? BookmarkRemove01Icon : BookmarkAdd01Icon} 
            size={14} 
            className={cn(
              "transition-colors",
              post.isBookmarked ? "text-accent" : "text-muted-foreground"
            )}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="font-semibold text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-tight">
          {post.title || 'Untitled Article'}
        </h3>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.site_name || 'Unknown Source'}</span>
          <span>{formatDate(post.read_date)}</span>
        </div>
      </div>
    </div>
  )
}
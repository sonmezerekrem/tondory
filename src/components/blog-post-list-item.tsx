'use client'

import {HugeiconsIcon} from '@hugeicons/react'
import {Link02Icon} from '@hugeicons/core-free-icons'
import {cn} from '@/lib/utils'
import {BlogPost} from "@/types/blog-post";
import ArticleBookmarkButton from "@/components/article-bookmark-button";

interface BlogPostListItemProps {
    post: BlogPost
    className?: string
}

export function BlogPostListItem({post, className}: BlogPostListItemProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <div
            className={cn("group cursor-pointer py-3 border-b border-border/30 last:border-b-0 hover:bg-secondary/20 transition-colors", className)}
            onClick={() => window.open(post.url, '_blank')}
        >
            <div className="flex items-start space-x-3">
                {/* Article Image */}
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                        {post.image_url ? (
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-lg">
                                <HugeiconsIcon icon={Link02Icon} size={20} className="text-muted-foreground"/>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                    {/* Title */}
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                        {post.title || 'Untitled Article'}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{post.site_name || 'Unknown Source'}</span>
                        <span>•</span>
                        <span>{formatDate(post.read_date)}</span>
                    </div>
                </div>

                {/* Bookmark Button */}
                <ArticleBookmarkButton post={post} view={'list'}/>
            </div>
        </div>
    )
}
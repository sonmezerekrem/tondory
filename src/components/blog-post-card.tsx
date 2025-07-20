'use client'

import {HugeiconsIcon} from '@hugeicons/react'
import {Link02Icon} from '@hugeicons/core-free-icons'
import {cn} from '@/lib/utils'
import {BlogPost} from "@/types/blog-post";
import ArticleBookmarkButton from "@/components/article-bookmark-button";
import ArticleActionsMenu from "@/components/article-actions-menu";


interface BlogPostCardProps {
    post: BlogPost
    className?: string
}

export function BlogPostCard({post, className}: BlogPostCardProps) {
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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-xl">
                        <HugeiconsIcon icon={Link02Icon} size={32} className="text-muted-foreground"/>
                    </div>
                )}

                {/* Action Buttons */}
                <div className={"flex flex-row gap-10"}>
                    <ArticleBookmarkButton post={post} view={'grid'}/>
                    <ArticleActionsMenu post={post} view={'grid'}/>
                </div>


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
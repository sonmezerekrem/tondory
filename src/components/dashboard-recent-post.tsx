'use client'

import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {BookOpen01Icon, Link02Icon} from '@hugeicons/core-free-icons'
import {BlogPost} from '@/types/blog-post'
import Link from 'next/link'

type Props = {
    post: BlogPost
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
}

export default function DashboardRecentPost({post}: Props) {
    return (

        <Link
            href={post.url} target={'_blank'}
            key={post.id}
            className="py-3 hover:bg-secondary/20 transition-colors cursor-pointer group"
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
                        <div
                            className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <HugeiconsIcon icon={BookOpen01Icon} size={20}
                                           className="text-muted-foreground"/>
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
            </div>
        </Link>
    )
}
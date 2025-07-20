"use client"

import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {Bookmark02Icon, BookmarkCheck02Icon} from '@hugeicons/core-free-icons'
import {cn} from '@/lib/utils'
import {BlogPost} from "@/types/blog-post";
import {useState} from 'react'

type Props = {
    post: BlogPost
    view: 'grid' | 'list'
}


export default function ArticleBookmarkButton({post, view}: Props) {
    const [bookmarked, setBookmarked] = useState(post.isBookmarked || false)

    const handleBookmarkToggle = async (postId: string) => {
        try {
            const response = await fetch('/api/bookmarks/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({blog_post_id: postId}),
            })

            if (response.ok) {
                setBookmarked(!bookmarked)
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error)
        }
    }

    return (
        view == 'grid' ? (
            <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-10 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-all"
                onClick={(e) => {
                    e.stopPropagation()
                    handleBookmarkToggle(post.id)
                }}
            >
                <HugeiconsIcon
                    icon={bookmarked ? BookmarkCheck02Icon : Bookmark02Icon}
                    size={14}
                    className={cn(
                        "transition-colors",
                        bookmarked ? "text-primary" : "text-muted-foreground"
                    )}
                />
            </Button>
            )
            :
            (
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full hover:bg-secondary/80 transition-all flex-shrink-0"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleBookmarkToggle(post.id)
                    }}
                >
                    <HugeiconsIcon
                        icon={bookmarked ? BookmarkCheck02Icon : Bookmark02Icon}
                        size={14}
                        className={cn(
                            "transition-colors",
                            bookmarked ? "text-primary" : "text-muted-foreground"
                        )}
                    />
                </Button>
            )

    )
}
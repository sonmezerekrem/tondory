import {HugeiconsIcon} from '@hugeicons/react'
import {PlusSignIcon} from '@hugeicons/core-free-icons'
import {BlogPostCard} from '@/components/blog-post-card'
import {BlogPostListItem} from '@/components/blog-post-list-item'
import {cn} from '@/lib/utils'
import {BlogPost} from "@/types/blog-post";
import {cookies} from "next/headers";
import {BlogPostsResponse} from "@/types/responses";
import ArticlePagination from "@/components/article-pagination";

type PageProps = {
    page: number;
    size: number;
    view: 'list' | 'grid';
    search: string;
}

export default async function ArticleList({page, size, view, search}: PageProps) {
    const cookieStore = await cookies()

    const response: BlogPostsResponse = await fetch(
        `${process.env.BACKEND_URL}/api/blog-posts?page=${page}&size=${size}&search=${search}`, {
            headers: {
                Cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        }).then(res => res.json())

    const blogPosts: BlogPost[] = response.data || []
    const pagination = response.pagination || {}

    return (
        <>
            {blogPosts.length === 0 ? (
                <div className="text-center py-16">
                    <div
                        className="w-16 h-16 bg-secondary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HugeiconsIcon icon={PlusSignIcon} size={32} className="text-muted-foreground"/>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                        {search ? 'No articles found' : 'No articles yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {search
                            ? `No articles match "${search}". Try a different search term.`
                            : 'Start building your reading library by adding your first article.'
                        }
                    </p>
                </div>
            ) : (
                <div className={cn(
                    "transition-all duration-300",
                    view === 'grid'
                        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
                        : "divide-y divide-border/30"
                )}>
                    {blogPosts.map((post) => (
                        view === 'grid' ? (
                            <BlogPostCard
                                key={post.id}
                                post={post}
                                className="animate-fade-in"
                            />
                        ) : (
                            <BlogPostListItem
                                key={post.id}
                                post={post}
                                className="animate-fade-in"
                            />
                        )
                    ))}
                </div>
            )}

            {/* Pagination */}
            {blogPosts.length > 0 && pagination.total_page > 1 && (
                <ArticlePagination pagination={pagination}/>
            )}
        </>
    )
}
import {HugeiconsIcon} from '@hugeicons/react'
import {PlusSignIcon} from '@hugeicons/core-free-icons'
import {BlogPostCard} from '@/components/blog-post-card'
import {BlogPostListItem} from '@/components/blog-post-list-item'
import {cn} from '@/lib/utils'
import {BlogPost} from "@/types/blog-post";
import {cookies} from "next/headers";
import ArticlesAddButton from "@/components/articles-add-button";
import ArticleSearchBox from "@/components/article-search-box";
import ArticleViewModeChange from "@/components/article-view-mode-change";

type PageProps = {
    page?: string;
    size?: string;
    view?: 'list' | 'grid';
    search?: string;
}

export default async function Page(props: { searchParams: Promise<PageProps> }) {
    const cookieStore = await cookies()
    const {page, size, view, search} = await props.searchParams
    const currentPage = Number(page) || 1
    const pageSize = Number(size) || 100
    const searchStr = search || ""
    const viewMode = view || 'grid'

    const blogPosts: BlogPost[] = await fetch(
        `${process.env.BACKEND_URL}/api/blog-posts?page=${currentPage}&size=${pageSize}&search=${searchStr}`, {
            headers: {
                Cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        }).then(res => res.json())

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
                    <ArticlesAddButton/>
                </div>

                {/* Search */}
                <ArticleSearchBox/>

                {/* View Toggle and Results */}
                <ArticleViewModeChange mode={viewMode}/>
            </div>

            {/* Content */}
            {blogPosts.length === 0 ? (
                <div className="text-center py-16">
                    <div
                        className="w-16 h-16 bg-secondary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HugeiconsIcon icon={PlusSignIcon} size={32} className="text-muted-foreground"/>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                        {searchStr ? 'No articles found' : 'No articles yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {searchStr
                            ? `No articles match "${searchStr}". Try a different search term.`
                            : 'Start building your reading library by adding your first article.'
                        }
                    </p>
                </div>
            ) : (
                <div className={cn(
                    "transition-all duration-300",
                    viewMode === 'grid'
                        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
                        : "divide-y divide-border/30"
                )}>
                    {blogPosts.map((post) => (
                        viewMode === 'grid' ? (
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

        </div>
    )
}
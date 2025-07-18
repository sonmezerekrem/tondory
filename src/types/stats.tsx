import {BlogPost} from "@/types/blog-post";

type BlogPostStats = {
    total: number
    thisMonth: number
    thisWeek: number
    bookmarks: number
    recentPosts: Array<BlogPost>
}

export type {BlogPostStats};
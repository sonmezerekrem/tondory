import {PaginationInfo} from "@/types/pagination-info";
import {BlogPost} from "@/types/blog-post";

export interface BlogPostsResponse {
    pagination: PaginationInfo;
    data: BlogPost[];
}
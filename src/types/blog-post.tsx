type BlogPost = {
    id: string
    title: string
    site_name: string
    read_date: string
    image_url?: string
    url: string
    description: string
    isBookmarked?: boolean
}

export type { BlogPost }
export interface DailyStats {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  blog_count: number
  daily_date: string
}

export interface DailyStatsResponse {
  total: number
  thisMonth: number
  thisWeek: number
  bookmarks: number
  recentPosts: Array<{
    id: string
    title: string
    site_name: string
    read_date: string
    image_url: string
    url: string
  }>
}
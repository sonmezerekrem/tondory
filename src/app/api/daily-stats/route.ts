import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStartOfMonthInTimezone, getStartOfWeekInTimezone } from '@/lib/timezone'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get timezone from query params or default to UTC
    const { searchParams } = new URL(request.url)
    const timezone = searchParams.get('timezone') || 'UTC'

    // Get total count from daily_stats (much faster than counting blog_posts)
    const { data: totalData } = await supabase
      .from('daily_stats')
      .select('blog_count')
      .eq('user_id', user.id)

    const totalCount = totalData?.reduce((sum, row) => sum + row.blog_count, 0) || 0

    // Get this month's count (timezone-aware)
    const startOfMonthStr = getStartOfMonthInTimezone(timezone)
    const { data: monthData } = await supabase
      .from('daily_stats')
      .select('blog_count')
      .eq('user_id', user.id)
      .gte('daily_date', startOfMonthStr)

    const thisMonthCount = monthData?.reduce((sum, row) => sum + row.blog_count, 0) || 0

    // Get this week's count (timezone-aware)
    const startOfWeekStr = getStartOfWeekInTimezone(timezone)
    const { data: weekData } = await supabase
      .from('daily_stats')
      .select('blog_count')
      .eq('user_id', user.id)
      .gte('daily_date', startOfWeekStr)

    const thisWeekCount = weekData?.reduce((sum, row) => sum + row.blog_count, 0) || 0

    // Get recent posts (still from blog_posts for detailed info)
    const { data: recentPosts } = await supabase
      .from('blog_posts')
      .select('id, title, site_name, read_date, image_url, url')
      .eq('user_id', user.id)
      .order('read_date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(5)

    // Get bookmarks count
    const { count: bookmarksCount } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    return NextResponse.json({
      total: totalCount,
      thisMonth: thisMonthCount,
      thisWeek: thisWeekCount,
      bookmarks: bookmarksCount || 0,
      recentPosts: recentPosts || [],
    })
  } catch (error) {
    console.error('Daily stats API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
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

    // Get total count
    const { count: totalCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    // Get this month's count (timezone-aware)
    const startOfMonthStr = getStartOfMonthInTimezone(timezone)
    const { count: thisMonthCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('read_date', startOfMonthStr)

    // Get this week's count (timezone-aware)
    const startOfWeekStr = getStartOfWeekInTimezone(timezone)
    const { count: thisWeekCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('read_date', startOfWeekStr)

    // Get recent posts (last 5)
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
      total: totalCount || 0,
      thisMonth: thisMonthCount || 0,
      thisWeek: thisWeekCount || 0,
      bookmarks: bookmarksCount || 0,
      recentPosts: recentPosts || [],
    })
  } catch (error) {
    console.error('Blog posts stats API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
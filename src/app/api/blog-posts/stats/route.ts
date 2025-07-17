import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total count
    const { count: totalCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    // Get this month's count
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const { count: thisMonthCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('read_date', startOfMonth.toISOString().split('T')[0])

    // Get this week's count
    const startOfWeek = new Date()
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    const { count: thisWeekCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('read_date', startOfWeek.toISOString().split('T')[0])

    // Get recent posts (last 5)
    const { data: recentPosts } = await supabase
      .from('blog_posts')
      .select('id, title, site_name, read_date, image_url')
      .eq('user_id', user.id)
      .order('read_date', { ascending: false })
      .limit(5)

    return NextResponse.json({
      total: totalCount || 0,
      thisMonth: thisMonthCount || 0,
      thisWeek: thisWeekCount || 0,
      recentPosts: recentPosts || [],
    })
  } catch (error) {
    console.error('Blog posts stats API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
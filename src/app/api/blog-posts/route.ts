import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const size = parseInt(searchParams.get('size') || '10')
    const search = searchParams.get('search') || ''
    
    // Calculate offset for pagination
    const offset = (page - 1) * size

    // Build query
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        bookmarks(id)
      `)
      .eq('user_id', user.id)

    // Add search filter if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,site_name.ilike.%${search}%`)
    }

    // Add pagination and ordering
    query = query
      .order('read_date', { ascending: false })
      .range(offset, offset + size - 1)

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data to include isBookmarked
    const transformedData = data.map(post => ({
      ...post,
      isBookmarked: post.bookmarks && post.bookmarks.length > 0,
      bookmarks: undefined // Remove bookmarks array from response
    }))

    // Get total count for pagination
    let countQuery = supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (search) {
      countQuery = countQuery.or(`title.ilike.%${search}%,description.ilike.%${search}%,site_name.ilike.%${search}%`)
    }

    const { count } = await countQuery

    return NextResponse.json({
      data: transformedData,
      pagination: {
        total_count: count || 0,
        current_size: transformedData.length,
        current_page: page,
        total_page: Math.ceil((count || 0) / size),
        page_size: size,
      }
    })
  } catch (error) {
    console.error('Blog posts API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { url, title, description, image_url, site_name, read_date } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          user_id: user.id,
          url,
          title,
          description,
          image_url,
          site_name,
          read_date: read_date || new Date().toISOString().split('T')[0],
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Blog posts API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
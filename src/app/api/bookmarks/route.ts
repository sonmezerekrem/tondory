import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/bookmarks - Get all bookmarks for current user
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
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
      .from('bookmarks')
      .select(`
        id,
        created_at,
        blog_posts:blog_post_id (
          id,
          url,
          title,
          description,
          image_url,
          site_name,
          read_date,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', user.id)

    // Add search filter if provided
    if (search) {
      query = query.or(`blog_posts.title.ilike.%${search}%,blog_posts.description.ilike.%${search}%,blog_posts.site_name.ilike.%${search}%`)
    }

    // Add pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + size - 1)

    const { data: bookmarks, error } = await query

    if (error) {
      console.error('Error fetching bookmarks:', error)
      return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 })
    }

    // Transform the data to match the expected format
    const transformedBookmarks = bookmarks?.map(bookmark => ({
      ...bookmark.blog_posts,
      isBookmarked: true, // All results are bookmarked by definition
      bookmark_id: bookmark.id,
      bookmarked_at: bookmark.created_at
    })) || []

    // Get total count for pagination
    let countQuery = supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (search) {
      countQuery = countQuery.or(`blog_posts.title.ilike.%${search}%,blog_posts.description.ilike.%${search}%,blog_posts.site_name.ilike.%${search}%`)
    }

    const { count } = await countQuery

    return NextResponse.json({
      data: transformedBookmarks,
      pagination: {
        page,
        size,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / size)
      }
    })
  } catch (error) {
    console.error('Error in GET /api/bookmarks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/bookmarks - Add a bookmark
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { blog_post_id } = await request.json()

    if (!blog_post_id) {
      return NextResponse.json({ error: 'blog_post_id is required' }, { status: 400 })
    }

    // Check if post exists and belongs to user
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('id', blog_post_id)
      .eq('user_id', user.id)
      .single()

    if (postError || !post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Add bookmark
    const { data: bookmark, error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: user.id,
        blog_post_id: blog_post_id
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'Post already bookmarked' }, { status: 409 })
      }
      console.error('Error creating bookmark:', error)
      return NextResponse.json({ error: 'Failed to create bookmark' }, { status: 500 })
    }

    return NextResponse.json(bookmark, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/bookmarks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
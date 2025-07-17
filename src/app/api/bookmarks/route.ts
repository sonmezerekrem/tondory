import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/bookmarks - Get all bookmarks for current user
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get bookmarked posts using direct JOIN
    const { data: bookmarks, error } = await supabase
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
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching bookmarks:', error)
      return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 })
    }

    // Transform the data to match the expected format
    const transformedBookmarks = bookmarks?.map(bookmark => ({
      bookmark_id: bookmark.id,
      bookmarked_at: bookmark.created_at,
      id: bookmark.blog_posts?.id,
      url: bookmark.blog_posts?.url,
      title: bookmark.blog_posts?.title,
      description: bookmark.blog_posts?.description,
      image_url: bookmark.blog_posts?.image_url,
      site_name: bookmark.blog_posts?.site_name,
      read_date: bookmark.blog_posts?.read_date,
      created_at: bookmark.blog_posts?.created_at,
      updated_at: bookmark.blog_posts?.updated_at
    })) || []

    return NextResponse.json(transformedBookmarks)
  } catch (error) {
    console.error('Error in GET /api/bookmarks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/bookmarks - Add a bookmark
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
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
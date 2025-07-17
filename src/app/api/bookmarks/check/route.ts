import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/bookmarks/check - Check if posts are bookmarked
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { blog_post_ids } = await request.json()

    if (!blog_post_ids || !Array.isArray(blog_post_ids)) {
      return NextResponse.json({ error: 'blog_post_ids array is required' }, { status: 400 })
    }

    // Get bookmarks for the specified posts
    const { data: bookmarks, error } = await supabase
      .from('bookmarks')
      .select('blog_post_id')
      .eq('user_id', user.id)
      .in('blog_post_id', blog_post_ids)

    if (error) {
      console.error('Error checking bookmarks:', error)
      return NextResponse.json({ error: 'Failed to check bookmarks' }, { status: 500 })
    }

    // Create a map of post_id -> isBookmarked
    const bookmarkMap = blog_post_ids.reduce((acc, postId) => {
      acc[postId] = bookmarks.some(bookmark => bookmark.blog_post_id === postId)
      return acc
    }, {} as Record<string, boolean>)

    return NextResponse.json(bookmarkMap)
  } catch (error) {
    console.error('Error in POST /api/bookmarks/check:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/bookmarks/toggle - Toggle bookmark status for a blog post
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

    // Use the toggle_bookmark function
    const { data: result, error } = await supabase
      .rpc('toggle_bookmark', { post_id: blog_post_id })

    if (error) {
      console.error('Error toggling bookmark:', error)
      return NextResponse.json({ error: 'Failed to toggle bookmark' }, { status: 500 })
    }

    return NextResponse.json({ 
      isBookmarked: result,
      message: result ? 'Bookmark added' : 'Bookmark removed'
    })
  } catch (error) {
    console.error('Error in POST /api/bookmarks/toggle:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
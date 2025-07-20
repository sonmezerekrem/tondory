import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Blog post ID is required' }, { status: 400 })
    }

    // First, check if the blog post exists and belongs to the user
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, user_id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Delete associated bookmarks first
    const { error: bookmarkError } = await supabase
      .from('bookmarks')
      .delete()
      .eq('blog_post_id', id)
      .eq('user_id', user.id)

    if (bookmarkError) {
      console.error('Error deleting bookmarks:', bookmarkError)
      return NextResponse.json({ error: 'Failed to delete associated bookmarks' }, { status: 500 })
    }

    // Delete the blog post
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Error deleting blog post:', deleteError)
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Delete blog post API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
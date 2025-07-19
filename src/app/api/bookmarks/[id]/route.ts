import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/bookmarks/[id] - Remove a bookmark by bookmark ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context
  const resolvedParams = await params
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bookmarkId = resolvedParams.id

    // Delete bookmark (RLS will ensure user can only delete their own)
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', bookmarkId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting bookmark:', error)
      return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Bookmark deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/bookmarks/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
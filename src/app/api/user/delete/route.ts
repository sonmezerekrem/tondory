import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = user.id

    // Delete user data in the correct order (respecting foreign key constraints)
    
    // 1. Delete bookmarks
    const { error: bookmarksError } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)

    if (bookmarksError) {
      console.error('Error deleting bookmarks:', bookmarksError)
      return NextResponse.json({ error: 'Failed to delete user bookmarks' }, { status: 500 })
    }

    // 2. Delete blog posts
    const { error: postsError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('user_id', userId)

    if (postsError) {
      console.error('Error deleting blog posts:', postsError)
      return NextResponse.json({ error: 'Failed to delete user blog posts' }, { status: 500 })
    }

    // 3. Delete the user account from auth
    // Note: This requires admin privileges. In production, you might need to use a service role key
    // For now, we'll attempt the deletion but continue if it fails
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)
    
    if (authError) {
      console.warn('Could not delete auth user (may require admin privileges):', authError)
      // We still sign out the user even if we can't delete the auth record
      await supabase.auth.signOut()
      return NextResponse.json({ 
        message: 'User data deleted and signed out. Note: Auth record may still exist.',
        warning: 'Auth deletion requires admin privileges'
      })
    }

    // 4. Sign out the user (this should happen automatically after account deletion, but just in case)
    await supabase.auth.signOut()

    return NextResponse.json({ 
      message: 'Account and all associated data deleted successfully' 
    })

  } catch (error) {
    console.error('Error in DELETE /api/user/delete:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
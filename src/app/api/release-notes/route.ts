import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Fetch release notes with their items
    const { data: releaseNotes, error } = await supabase
      .from('release_notes')
      .select(`
        id,
        version,
        release_date,
        is_latest,
        is_initial_release,
        release_note_items (
          id,
          type,
          title,
          description
        )
      `)
      .order('release_date', { ascending: false })

    if (error) {
      console.error('Error fetching release notes:', error)
      return NextResponse.json({ error: 'Failed to fetch release notes' }, { status: 500 })
    }

    // Transform the data to group items by type
    const transformedData = releaseNotes?.map(release => ({
      id: release.id,
      version: release.version,
      releaseDate: release.release_date,
      isLatest: release.is_latest,
      isInitialRelease: release.is_initial_release,
      features: release.release_note_items?.filter(item => item.type === 'feature') || [],
      improvements: release.release_note_items?.filter(item => item.type === 'improvement') || [],
      bugFixes: release.release_note_items?.filter(item => item.type === 'bug_fix') || []
    })) || []

    return NextResponse.json({ 
      success: true, 
      data: transformedData 
    })
  } catch (error) {
    console.error('Error in release notes API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
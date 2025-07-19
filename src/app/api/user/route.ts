import {NextResponse} from 'next/server'
import {createClient} from '@/lib/supabase/server'

export async function GET() {
    try {
        const supabase = await createClient()
        const {data: {user}} = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.display_name,
            created_at: user.created_at,
        })
    } catch (error) {
        console.error('User API error:', error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}
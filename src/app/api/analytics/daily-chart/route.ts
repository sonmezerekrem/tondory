import {NextRequest, NextResponse} from 'next/server'
import {createClient} from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient()
        const {data: {user}} = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})
        }

        // Get timezone from query params or default to UTC
        const {searchParams} = new URL(request.url)
        const timezone = searchParams.get('timezone') || 'UTC'

        // Calculate date range for last 7 days
        const today = new Date()
        const last7Days = []

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(today.getDate() - i)
            last7Days.push(date.toISOString().split('T')[0])
        }

        // Get daily stats for the last 7 days
        const {data: dailyStatsData} = await supabase
            .from('daily_stats')
            .select('daily_date, blog_count')
            .eq('user_id', user.id)
            .in('daily_date', last7Days)
            .order('daily_date', {ascending: true})

        // Create a map for easier lookup
        const statsMap = new Map()
        dailyStatsData?.forEach(stat => {
            statsMap.set(stat.daily_date, stat.blog_count)
        })

        // Build complete data array with 0 for missing days
        const chartData = last7Days.map(date => {
            const dateObj = new Date(date)
            const dayName = dateObj.toLocaleDateString('en-US', {weekday: 'short'})

            return {
                date,
                day: dayName,
                count: statsMap.get(date) || 0,
                fullDate: dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                })
            }
        })
        return NextResponse.json({
            chartData,
        })
    } catch (error) {
        console.error('Daily chart API error:', error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    console.log('Debug API: Starting debug route')
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('Debug API: Environment check', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlStartsWith: supabaseUrl?.substring(0, 20) + '...',
      keyStartsWith: supabaseAnonKey?.substring(0, 20) + '...'
    })

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Missing Supabase environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey
      }, { status: 500 })
    }

    // Test Supabase client creation
    const supabase = await createClient()
    console.log('Debug API: Supabase client created successfully')
    
    // Test auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    console.log('Debug API: Auth check result', {
      hasUser: !!user,
      userId: user?.id,
      userEmail: user?.email,
      authError: authError?.message
    })

    return NextResponse.json({ 
      success: true,
      environment: {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey,
        urlDomain: supabaseUrl ? new URL(supabaseUrl).hostname : null
      },
      auth: {
        hasUser: !!user,
        userId: user?.id,
        userEmail: user?.email,
        error: authError?.message
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json({ 
      error: 'Debug API failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
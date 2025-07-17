import { NextRequest, NextResponse } from 'next/server'
import ogs from 'open-graph-scraper'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    // Fetch OpenGraph data
    const { error, result } = await ogs({ url })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch OpenGraph data' }, { status: 500 })
    }

    // Extract relevant data
    const ogData = {
      title: result.ogTitle || result.twitterTitle || result.dcTitle || '',
      description: result.ogDescription || result.twitterDescription || result.dcDescription || '',
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '',
      siteName: result.ogSiteName || result.twitterSite || '',
      url: result.ogUrl || url,
    }

    return NextResponse.json(ogData)
  } catch (error) {
    console.error('OpenGraph API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
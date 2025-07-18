import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {Bug01Icon, CheckmarkCircle02Icon, PlusSignIcon, ZapIcon} from '@hugeicons/core-free-icons'
import Footer from "@/components/footer";
import Header from "@/components/header";
import GradientBackgroundWrapper from "@/components/gradient-background-wrapper";
import { ReleaseNote, ReleaseNotesResponse } from '@/types/release-notes'

async function getReleaseNotes(): Promise<ReleaseNote[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/release-notes`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch release notes')
    }
    
    const data: ReleaseNotesResponse = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching release notes:', error)
    return []
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function ReleaseNotesPage() {
    const releaseNotes = await getReleaseNotes()
    return (
        <GradientBackgroundWrapper>
            {/* Header */}
            <Header/>

            {/* Hero Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="max-w-4xl mx-auto text-center animate-fade-in">
                    <div className="mb-6">
                        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                            Product Updates
                        </Badge>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Release <span
                        className="mr-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Notes
              </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Stay updated with the latest features, improvements, and bug fixes in Tondory.
                    </p>
                </div>
            </section>

            {/* Release Notes */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {releaseNotes.length === 0 ? (
                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardContent className="p-8 text-center">
                                <p className="text-muted-foreground">No release notes available at the moment.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        releaseNotes.map((release) => (
                            <Card key={release.id} className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl font-bold">Version {release.version}</CardTitle>
                                        {release.isLatest && (
                                            <Badge className="bg-primary/10 text-primary border-primary/20">
                                                Latest
                                            </Badge>
                                        )}
                                        {release.isInitialRelease && (
                                            <Badge className="bg-success/10 text-success border-success/20">
                                                Initial Release
                                            </Badge>
                                        )}
                                    </div>
                                    <CardDescription className="text-muted-foreground">
                                        Released on {formatDate(release.releaseDate)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {release.features.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                <HugeiconsIcon icon={PlusSignIcon} size={20} className="text-success mr-2"/>
                                                {release.isInitialRelease ? 'Initial Features' : 'New Features'}
                                            </h3>
                                            <ul className="space-y-2">
                                                {release.features.map((feature) => (
                                                    <li key={feature.id} className="flex items-start">
                                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                                        <span className="text-muted-foreground">{feature.description || feature.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {release.improvements.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                <HugeiconsIcon icon={ZapIcon} size={20} className="text-accent mr-2"/>
                                                Improvements
                                            </h3>
                                            <ul className="space-y-2">
                                                {release.improvements.map((improvement) => (
                                                    <li key={improvement.id} className="flex items-start">
                                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                                       className="text-accent mr-2 mt-0.5 flex-shrink-0"/>
                                                        <span className="text-muted-foreground">{improvement.description || improvement.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {release.bugFixes.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                                <HugeiconsIcon icon={Bug01Icon} size={20} className="text-destructive mr-2"/>
                                                Bug Fixes
                                            </h3>
                                            <ul className="space-y-2">
                                                {release.bugFixes.map((bugFix) => (
                                                    <li key={bugFix.id} className="flex items-start">
                                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                                       className="text-destructive mr-2 mt-0.5 flex-shrink-0"/>
                                                        <span className="text-muted-foreground">{bugFix.description || bugFix.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </section>

            {/* Footer */}
            <Footer/>
        </GradientBackgroundWrapper>
    )
}
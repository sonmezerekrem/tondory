import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {Bug01Icon, CheckmarkCircle02Icon, PlusSignIcon, ZapIcon} from '@hugeicons/core-free-icons'
import Footer from "@/components/footer";
import Header from "@/components/header";
import GradientBackgroundWrapper from "@/components/gradient-background-wrapper";

export default function ReleaseNotesPage() {
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

                    {/* Version 1.2.0 */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Version 1.2.0</CardTitle>
                                <Badge className="bg-primary/10 text-primary border-primary/20">
                                    Latest
                                </Badge>
                            </div>
                            <CardDescription className="text-muted-foreground">
                                Released on December 15, 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <HugeiconsIcon icon={PlusSignIcon} size={20} className="text-success mr-2"/>
                                    New Features
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Dark mode support with beautiful theme switching</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Enhanced search functionality with pagination</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Profile management with display name editing</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span
                                            className="text-muted-foreground">Improved bookmark management system</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <HugeiconsIcon icon={ZapIcon} size={20} className="text-accent mr-2"/>
                                    Improvements
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-accent mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Redesigned UI with SwiftPay design system</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-accent mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Better mobile responsiveness and navigation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-accent mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Performance optimizations for faster loading</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <HugeiconsIcon icon={Bug01Icon} size={20} className="text-destructive mr-2"/>
                                    Bug Fixes
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-destructive mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Fixed hydration errors on client components</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-destructive mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Resolved cookie handling issues in server components</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-destructive mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Fixed image loading issues in article previews</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Version 1.1.0 */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Version 1.1.0</CardTitle>
                            </div>
                            <CardDescription className="text-muted-foreground">
                                Released on November 28, 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <HugeiconsIcon icon={PlusSignIcon} size={20} className="text-success mr-2"/>
                                    New Features
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Dashboard analytics with reading statistics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span
                                            className="text-muted-foreground">Article grid and list view options</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Bookmark functionality for favorite articles</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <HugeiconsIcon icon={ZapIcon} size={20} className="text-accent mr-2"/>
                                    Improvements
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-accent mr-2 mt-0.5 flex-shrink-0"/>
                                        <span
                                            className="text-muted-foreground">Enhanced user authentication flow</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-accent mr-2 mt-0.5 flex-shrink-0"/>
                                        <span
                                            className="text-muted-foreground">Better error handling and user feedback</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Version 1.0.0 */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Version 1.0.0</CardTitle>
                                <Badge className="bg-success/10 text-success border-success/20">
                                    Initial Release
                                </Badge>
                            </div>
                            <CardDescription className="text-muted-foreground">
                                Released on November 10, 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <HugeiconsIcon icon={PlusSignIcon} size={20} className="text-success mr-2"/>
                                    Initial Features
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span
                                            className="text-muted-foreground">User registration and authentication</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span className="text-muted-foreground">Article URL saving and metadata extraction</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span
                                            className="text-muted-foreground">Basic dashboard with article listing</span>
                                    </li>
                                    <li className="flex items-start">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                       className="text-success mr-2 mt-0.5 flex-shrink-0"/>
                                        <span
                                            className="text-muted-foreground">Responsive design for mobile and desktop</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <Footer/>
        </GradientBackgroundWrapper>
    )
}
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {
    ArrowRight01Icon,
    BoatIcon,
    BookOpen01Icon,
    ChartIncreaseIcon,
    CheckmarkCircle02Icon,
    DashboardSquare02Icon,
    User02Icon
} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Gradient Grid Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "white",
                    backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(14,165,233,0.15) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)
          `,
                    backgroundSize: "40px 40px, 40px 40px, 100% 100%",
                }}
            />

            {/* Dark mode version */}
            <div
                className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
                style={{
                    background: "#0f172a",
                    backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(56,189,248,0.1) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)
          `,
                    backgroundSize: "40px 40px, 40px 40px, 100% 100%",
                }}
            />

            {/* Content wrapper */}
            <div className="relative z-10">
                {/* Header */}
               <Header/>

                {/* Hero Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <div className="mb-6">
                            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                                Premium Article & Blog Tracker
                            </Badge>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Keep Track of Your
                            <span
                                className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Reading Journey
            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            Discover, save, and organize the blog posts you love. Build your personal library of
                            knowledge with beautiful previews and smart organization.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/auth/register">
                                <Button size="lg"
                                        className="bg-primary text-white hover:bg-primary/90 shadow-lg h-12 px-8">
                                    <HugeiconsIcon icon={User02Icon} size={20} className="mr-2"/>
                                    Start Reading
                                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2"/>
                                </Button>
                            </Link>
                            <Link href="/auth/login">
                                <Button variant="outline" size="lg"
                                        className="h-12 px-8 border-2 hover:bg-secondary/80">
                                    Sign In
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mb-16">
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">1K+</div>
                                <div className="text-sm text-muted-foreground">Articles Saved</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">50+</div>
                                <div className="text-sm text-muted-foreground">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">99%</div>
                                <div className="text-sm text-muted-foreground">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Everything You Need to
                                <span className="block text-primary">Organize Your Reading</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Powerful features designed to help you save, organize, and revisit your favorite
                                articles.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            <Card
                                className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                        <HugeiconsIcon icon={BookOpen01Icon} size={24} className="text-primary"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Smart Bookmarking</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Automatically fetch article metadata, images, and descriptions. Just paste the
                                        URL and we&#39;ll handle the rest.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card
                                className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <div
                                        className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                                        <HugeiconsIcon icon={DashboardSquare02Icon} size={24} className="text-accent"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Beautiful Dashboard</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Get insights into your reading habits with a clean, organized dashboard that
                                        shows your progress and statistics.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card
                                className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <div
                                        className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center mb-4">
                                        <HugeiconsIcon icon={ChartIncreaseIcon} size={24} className="text-info"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Reading Analytics</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Track your reading progress, discover patterns, and see how your knowledge grows
                                        over time.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card
                                className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <div
                                        className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={24} className="text-success"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Easy Organization</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Organize your articles by date, source, or topic. Find what you&#39;re looking
                                        for quickly and easily.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card
                                className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <div
                                        className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-4">
                                        <HugeiconsIcon icon={BookOpen01Icon} size={24} className="text-warning"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Mobile Friendly</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Access your reading library from anywhere. Fully responsive design that works on
                                        all devices.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card
                                className="card-shadow hover:card-shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                        <HugeiconsIcon icon={User02Icon} size={24} className="text-primary"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Personal & Secure</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Your reading data is private and secure. Only you can access your personal
                                        library of articles.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <Card
                            className="card-shadow-lg border-0 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
                            <CardContent className="p-8 sm:p-12">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                    Ready to Start Your
                                    <span className="block text-primary">Reading Journey?</span>
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                                    Join thousands of readers who are already organizing their knowledge with Tondory.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/auth/register">
                                        <Button size="lg"
                                                className="bg-primary text-white hover:bg-primary/90 shadow-lg h-12 px-8">
                                            Get Started for Free
                                            <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2"/>
                                        </Button>
                                    </Link>
                                    <Link href="/auth/login">
                                        <Button variant="outline" size="lg" className="h-12 px-8 border-2">
                                            Sign In
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Footer */}
                <Footer/>
            </div>
        </div>
    )
}
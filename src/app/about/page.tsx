import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {
    ArrowRight01Icon,
    BoatIcon,
    CheckmarkCircle02Icon,
    FavouriteIcon,
    Target03Icon,
    ZapIcon
} from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function AboutPage() {
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
                <header className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <HugeiconsIcon icon={BoatIcon} size={24} className="text-white"/>
                            </div>
                            <Link href="/">
                                <h1 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">Tondory</h1>
                            </Link>
                        </div>

                        {/* Centered Menu */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                Home
                            </Link>
                            <Link href="/about" className="text-foreground font-medium">
                                About
                            </Link>
                            <Link href="/release-notes"
                                  className="text-muted-foreground hover:text-foreground transition-colors">
                                Release Notes
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <Link href="/auth/login">
                                <Button variant="ghost" className="text-foreground hover:text-primary">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button className="bg-primary text-white hover:bg-primary/90 shadow-lg">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <div className="mb-6">
                            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                                Our Story
                            </Badge>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            About
                            <span
                                className="ml-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tondory
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            Empowering readers to organize, discover, and revisit their favorite articles with ease.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardContent className="p-8 sm:p-12">
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <HugeiconsIcon icon={Target03Icon} size={32} className="text-primary"/>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                        To create a beautiful, intuitive platform that helps knowledge seekers save,
                                        organize, and rediscover the articles that matter most to them. We believe that
                                        great content deserves a great home.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide everything we do at Tondory.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="text-center">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <HugeiconsIcon icon={ZapIcon} size={24} className="text-primary"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Simplicity</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        We believe powerful tools should be simple to use. Every feature is designed
                                        with clarity and ease of use in mind.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="text-center">
                                    <div
                                        className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <HugeiconsIcon icon={FavouriteIcon} size={24} className="text-accent"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Privacy</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Your reading habits and saved articles are private. We don&#39;t sell your data
                                        or share it with third parties.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                                <CardHeader className="text-center">
                                    <div
                                        className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={24} className="text-success"/>
                                    </div>
                                    <CardTitle className="text-xl font-semibold">Quality</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        We&#39;re committed to building a reliable, fast, and beautiful product that
                                        enhances your reading experience.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardContent className="p-8 sm:p-12">
                                <h2 className="text-3xl font-bold mb-6 text-center">The Story Behind Tondory</h2>
                                <div className="prose prose-lg max-w-none text-muted-foreground">
                                    <p className="mb-6">
                                        Tondory was born from a simple frustration: losing track of amazing articles we
                                        wanted to read later.
                                        We all have those moments when we find a great blog post or article, bookmark
                                        it, and then never find it again.
                                    </p>
                                    <p className="mb-6">
                                        What started as a personal project to solve this problem has evolved into a
                                        comprehensive platform for
                                        knowledge management. We wanted to create something that not only saves articles
                                        but makes them beautiful
                                        and easy to rediscover.
                                    </p>
                                    <p className="mb-6">
                                        Today, Tondory helps readers organize their digital library with automatic
                                        metadata extraction,
                                        intelligent categorization, and a clean, distraction-free interface that puts
                                        your content first.
                                    </p>
                                    <p>
                                        We&#39;re just getting started. Our roadmap includes features like collaborative
                                        collections,
                                        AI-powered content recommendations, and advanced analytics to help you
                                        understand your reading patterns.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Features Highlight */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Tondory?</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Here&#39;s what makes Tondory different from other bookmarking tools.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                   className="text-success mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold mb-1">Automatic Metadata</h3>
                                        <p className="text-muted-foreground text-sm">
                                            We automatically extract titles, descriptions, and images from any article
                                            URL.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                   className="text-success mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold mb-1">Beautiful Interface</h3>
                                        <p className="text-muted-foreground text-sm">
                                            A clean, modern design that makes browsing your saved articles a pleasure.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                   className="text-success mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold mb-1">Smart Organization</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Organize by date, source, or topic with powerful search and filtering.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                   className="text-success mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold mb-1">Reading Analytics</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Track your reading habits and discover patterns in your interests.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                   className="text-success mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold mb-1">Mobile First</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Access your library anywhere with our responsive design and mobile apps.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20}
                                                   className="text-success mt-1 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold mb-1">Privacy Focused</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Your data stays private and secure. We don&#39;t track or sell your
                                            information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <Card
                            className="card-shadow-lg border-0 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
                            <CardContent className="p-8 sm:p-12">
                                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                    Ready to Start Your <span className="mr-3 text-primary">Reading Journey?</span>
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
                <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/60">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <HugeiconsIcon icon={BoatIcon} size={16} className="text-white"/>
                            </div>
                            <span className="text-xl font-bold text-foreground">Tondory</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2024 Tondory. Built with Next.js and Supabase.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}
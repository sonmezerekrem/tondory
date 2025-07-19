import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {ArrowRight01Icon, SecurityIcon, DatabaseIcon, UserIcon, SettingsIcon} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import Footer from "@/components/footer";
import Header from "@/components/header";
import GradientBackgroundWrapper from "@/components/gradient-background-wrapper";

export default function PrivacyPage() {
    return (
        <GradientBackgroundWrapper>
            {/* Header */}
            <Header/>

            {/* Hero Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="max-w-4xl mx-auto text-center animate-fade-in">
                    <div className="mb-6">
                        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                            Your Privacy Matters
                        </Badge>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Privacy
                        <span
                            className="ml-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Policy
                            </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Transparency about how we collect, use, and protect your personal information.
                    </p>

                    <div className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8 sm:p-12">
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <HugeiconsIcon icon={SecurityIcon} size={32} className="text-primary"/>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Privacy-First Approach</h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    At Tondory, we believe your reading habits and saved articles are private. 
                                    This policy explains how we collect, use, and protect your information when you use our service.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Privacy Principles */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Privacy Principles</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            The core principles that guide how we handle your data.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div
                                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <HugeiconsIcon icon={DatabaseIcon} size={24} className="text-primary"/>
                                </div>
                                <CardTitle className="text-lg font-semibold">Data Minimization</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">
                                    We only collect data that is necessary for the service to function.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div
                                    className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <HugeiconsIcon icon={SecurityIcon} size={24} className="text-accent"/>
                                </div>
                                <CardTitle className="text-lg font-semibold">Secure Storage</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">
                                    Your data is encrypted and stored securely using industry standards.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div
                                    className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <HugeiconsIcon icon={UserIcon} size={24} className="text-success"/>
                                </div>
                                <CardTitle className="text-lg font-semibold">User Control</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">
                                    You have full control over your data and can delete it at any time.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div
                                    className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <HugeiconsIcon icon={SettingsIcon} size={24} className="text-orange-500"/>
                                </div>
                                <CardTitle className="text-lg font-semibold">No Tracking</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">
                                    We don&apos;t use third-party trackers or sell your data to advertisers.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Detailed Information */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* Information We Collect */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">Information We Collect</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Account Information:</h4>
                                    <p>Email address and password (encrypted) when you create an account.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Content Data:</h4>
                                    <p>URLs, titles, descriptions, and images of articles you save to your library.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Usage Information:</h4>
                                    <p>Basic analytics about how you use the service to improve functionality (anonymized).</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* How We Use Information */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">How We Use Your Information</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Service Delivery:</h4>
                                    <p>To provide and maintain your personal article library and reading tracker.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Communication:</h4>
                                    <p>To send you important service updates, security alerts, and support messages.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Improvement:</h4>
                                    <p>To analyze usage patterns (anonymized) to improve our service and user experience.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Storage */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">Data Storage & Security</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Secure Infrastructure:</h4>
                                    <p>Your data is stored on Supabase, a secure cloud platform with enterprise-grade security.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Encryption:</h4>
                                    <p>All data is encrypted in transit and at rest using industry-standard encryption protocols.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Access Control:</h4>
                                    <p>Only you can access your personal library. We implement strict access controls and authentication.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Sharing */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">Information Sharing</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="font-semibold text-foreground">We do not sell, trade, or rent your personal information to third parties.</p>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Service Providers:</h4>
                                    <p>We only share data with trusted service providers (like Supabase for hosting) who are bound by strict confidentiality agreements.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Legal Requirements:</h4>
                                    <p>We may disclose information if required by law, but will notify you unless prohibited by legal process.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Your Rights */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">Your Rights & Control</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Access & Export:</h4>
                                    <p>You can access and export all your data at any time through your account settings.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Deletion:</h4>
                                    <p>You can delete individual articles or your entire account and all associated data.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Correction:</h4>
                                    <p>You can update or correct any personal information in your account at any time.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                            <div className="text-muted-foreground">
                                <p className="mb-4">
                                    If you have any questions about this Privacy Policy or how we handle your data, 
                                    please contact us at:
                                </p>
                                <p className="font-semibold text-foreground">
                                    Email: privacy@tondory.com
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <Card
                        className="card-shadow-lg border-0 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
                        <CardContent className="p-8 sm:p-12">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                Start Reading <span className="mr-3 text-primary">Privately</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                                Join Tondory and organize your articles with complete privacy and control.
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
        </GradientBackgroundWrapper>
    )
}
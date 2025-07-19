import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {ArrowRight01Icon, LegalDocument01Icon, CheckmarkCircle02Icon, Alert01Icon} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import Footer from "@/components/footer";
import Header from "@/components/header";
import GradientBackgroundWrapper from "@/components/gradient-background-wrapper";

export default function TermsPage() {
    return (
        <GradientBackgroundWrapper>
            {/* Header */}
            <Header/>

            {/* Hero Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="max-w-4xl mx-auto text-center animate-fade-in">
                    <div className="mb-6">
                        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                            Legal Terms
                        </Badge>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Terms of
                        <span
                            className="ml-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Service
                            </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        The terms and conditions that govern your use of Tondory&apos;s services and platform.
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
                                    <HugeiconsIcon icon={LegalDocument01Icon} size={32} className="text-primary"/>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Agreement Overview</h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    By using Tondory, you agree to these terms of service. Please read them carefully 
                                    as they contain important information about your rights and obligations when using our platform.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Key Terms */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Key Terms</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Important highlights from our terms of service.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div
                                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={24} className="text-primary"/>
                                </div>
                                <CardTitle className="text-lg font-semibold">Free Service</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">
                                    Tondory is provided free of charge for personal use.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div
                                    className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <HugeiconsIcon icon={Alert01Icon} size={24} className="text-accent"/>
                                </div>
                                <CardTitle className="text-lg font-semibold">Acceptable Use</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">
                                    Use Tondory responsibly and in accordance with applicable laws.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div
                                    className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <HugeiconsIcon icon={LegalDocument01Icon} size={24} className="text-success"/>
                                </div>
                                <CardTitle className="text-lg font-semibold">Your Content</CardTitle>
                                <CardDescription className="text-muted-foreground text-sm">
                                    You retain ownership of all content you save to Tondory.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Detailed Terms */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* Acceptance of Terms */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    By accessing or using Tondory (&quot;the Service&quot;), you agree to be bound by these Terms of Service 
                                    (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access the Service.
                                </p>
                                <p>
                                    These Terms apply to all visitors, users, and others who access or use the Service.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description of Service */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">2. Description of Service</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Tondory is a blog reading tracker that allows users to save, organize, and manage 
                                    articles and blog posts from around the web.
                                </p>
                                <p>
                                    The Service includes features such as article bookmarking, metadata extraction, 
                                    reading analytics, and content organization tools.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Accounts */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">3. User Accounts</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Account Creation:</h4>
                                    <p>You must provide accurate and complete information when creating an account.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Account Security:</h4>
                                    <p>You are responsible for maintaining the security of your account and password.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Account Termination:</h4>
                                    <p>You may delete your account at any time through the settings page.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Acceptable Use */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="font-semibold text-foreground">You agree NOT to use the Service to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Infringe on intellectual property rights of others</li>
                                    <li>Transmit malicious code or attempt to hack the Service</li>
                                    <li>Spam or send unsolicited communications</li>
                                    <li>Use the Service for commercial purposes without permission</li>
                                    <li>Attempt to reverse engineer or copy the Service</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content and Privacy */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">5. Content and Privacy</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Your Content:</h4>
                                    <p>You retain all rights to the URLs, articles, and content you save to Tondory.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Privacy:</h4>
                                    <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Content Removal:</h4>
                                    <p>You may delete your content at any time. We may remove content that violates these Terms.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Service Availability */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">6. Service Availability</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    We strive to maintain high availability, but the Service is provided &quot;as is&quot; without 
                                    guarantees of uptime or performance.
                                </p>
                                <p>
                                    We reserve the right to modify, suspend, or discontinue the Service at any time 
                                    with reasonable notice.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Limitation of Liability */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">7. Limitation of Liability</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    To the maximum extent permitted by law, Tondory shall not be liable for any indirect, 
                                    incidental, special, consequential, or punitive damages.
                                </p>
                                <p>
                                    Our total liability for any claims relating to the Service shall not exceed the 
                                    amount paid by you (if any) for using the Service.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Changes to Terms */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">8. Changes to Terms</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    We reserve the right to modify these Terms at any time. We will notify users of 
                                    significant changes via email or through the Service.
                                </p>
                                <p>
                                    Continued use of the Service after changes constitutes acceptance of the new Terms.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">9. Contact Information</h3>
                            <div className="text-muted-foreground">
                                <p className="mb-4">
                                    If you have any questions about these Terms of Service, please contact us at:
                                </p>
                                <p className="font-semibold text-foreground">
                                    Email: legal@tondory.com
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
                                Ready to Start <span className="mr-3 text-primary">Reading?</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                                Join Tondory and start organizing your articles with confidence, knowing your rights are protected.
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
'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {createClient} from '@/lib/supabase/client'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {ArrowRight01Icon, BoatIcon, Loading02Icon, SquareLock02Icon, UserIcon} from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [checking, setChecking] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    // Check if user is already logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                router.push('/app')
                return
            }
            setChecking(false)
        }
        checkAuth()
    }, [router, supabase.auth])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError(error.message)
            } else {
                router.push('/app')
                router.refresh()
            }
        } catch {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    // Show loading while checking auth
    if (checking) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center">
                <HugeiconsIcon icon={Loading02Icon} size={32} className="mr-2 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
            {/* Header */}
            <header className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <HugeiconsIcon icon={BoatIcon} size={24} className="text-white"/>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">Tondory</h1>
                    </Link>
                    <Link href="/auth/register">
                        <Button variant="ghost" className="text-foreground hover:text-primary">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            Welcome Back
                        </Badge>
                        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
                        <p className="text-muted-foreground">
                            Continue your reading journey with Tondory
                        </p>
                    </div>

                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-xl font-semibold">Welcome Back</CardTitle>
                            <CardDescription>
                                Enter your credentials to access your reading library
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={UserIcon}
                                            size={20}
                                            className="absolute left-3 top-3 text-muted-foreground"
                                        />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <HugeiconsIcon
                                            icon={SquareLock02Icon}
                                            size={20}
                                            className="absolute left-3 top-3 text-muted-foreground"
                                        />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div
                                        className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-primary text-white hover:bg-primary/90 shadow-lg font-medium"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div
                                                className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2"/>
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="text-center pt-4 border-t border-border/60">
                                <p className="text-sm text-muted-foreground">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/auth/register"
                                          className="text-primary hover:text-primary/80 font-medium">
                                        Sign up for free
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center mt-8">
                        <p className="text-xs text-muted-foreground">
                            By signing in, you agree to our{' '}
                            <Link href="/terms" className="text-primary hover:text-primary/80">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="/privacy" className="text-primary hover:text-primary/80">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
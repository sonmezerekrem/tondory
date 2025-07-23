'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {createClient} from '@/lib/supabase/client'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {ArrowRight01Icon, BoatIcon, GoogleIcon, SquareLock02Icon, UserIcon} from '@hugeicons/core-free-icons'
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
            const {data: {session}} = await supabase.auth.getSession()
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

    const handleGoogleLogin = async () => {
        setLoading(true)
        setError('')

        try {
            const {error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                setError(error.message)
                setLoading(false)
            }
        } catch {
            setError('An unexpected error occurred')
            setLoading(false)
        }
    }

    // Show loading while checking auth
    if (checking) {
        return (
            <div className="flex h-screen justify-center items-center">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-muted animate-spin fill-primary"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
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
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 border-border/60 bg-background/50 hover:bg-background/80"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                            >
                                <HugeiconsIcon icon={GoogleIcon} size={20} className="mr-2"/>
                                Sign in with Google
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/60"/>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

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
'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {createClient} from '@/lib/supabase/client'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Badge} from '@/components/ui/badge'
import {HugeiconsIcon} from '@hugeicons/react'
import {
    ArrowRight01Icon,
    BoatIcon,
    CheckmarkCircle02Icon,
    Mail01Icon,
    SquareLock02Icon,
    UserIcon
} from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            setLoading(false)
            return
        }

        try {
            const {error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: displayName.trim() || undefined
                    }
                }
            })

            if (error) {
                setError(error.message)
            } else {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/auth/login')
                }, 3000)
            }
        } catch {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
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
                    <Link href="/auth/login">
                        <Button variant="ghost" className="text-foreground hover:text-primary">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                            Join Tondory
                        </Badge>
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-muted-foreground">
                            Start your reading journey with Tondory today
                        </p>
                    </div>

                    <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-xl font-semibold">Get Started</CardTitle>
                            <CardDescription>
                                Create your account to start organizing your reading
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {success ? (
                                <div className="text-center py-8 space-y-4 animate-fade-in">
                                    <div
                                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={32}
                                                       className="text-green-600"/>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-green-800">Account Created!</h3>
                                        <p className="text-sm text-green-600">
                                            Please check your email for verification instructions.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Redirecting to sign in...
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="displayName" className="text-sm font-medium">
                                            Display Name
                                        </Label>
                                        <div className="relative">
                                            <HugeiconsIcon
                                                icon={UserIcon}
                                                size={20}
                                                className="absolute left-3 top-3 text-muted-foreground"
                                            />
                                            <Input
                                                id="displayName"
                                                type="text"
                                                placeholder="Enter your display name (optional)"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <HugeiconsIcon
                                                icon={Mail01Icon}
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
                                                placeholder="Create a password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-10 h-12 bg-background/50 border-border/60 focus:border-primary focus:ring-primary/20"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <HugeiconsIcon
                                                icon={SquareLock02Icon}
                                                size={20}
                                                className="absolute left-3 top-3 text-muted-foreground"
                                            />
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirm your password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account
                                                <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2"/>
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}

                            {!success && (
                                <div className="text-center pt-4 border-t border-border/60">
                                    <p className="text-sm text-muted-foreground">
                                        Already have an account?{' '}
                                        <Link href="/auth/login"
                                              className="text-primary hover:text-primary/80 font-medium">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="text-center mt-8">
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                            By creating an account, you agree to our{' '}
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
import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {BoatIcon} from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function Header() {
    return (

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
                    <Link href="/about"
                          className="text-muted-foreground hover:text-foreground transition-colors">
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

    )
}
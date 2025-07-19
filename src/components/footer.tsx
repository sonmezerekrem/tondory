import {HugeiconsIcon} from '@hugeicons/react'
import {BoatIcon} from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/60 mt-16">
            <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <HugeiconsIcon icon={BoatIcon} size={16} className="text-white"/>
                    </div>
                    <span className="text-xl font-bold text-foreground">Tondory</span>
                </div>
                
                {/* Footer Links */}
                <div className="flex items-center justify-center space-x-6 mb-4 text-sm">
                    <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                        About
                    </Link>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/release-notes" className="text-muted-foreground hover:text-foreground transition-colors">
                        Release Notes
                    </Link>
                </div>
                
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Tondory. Built with Next.js and Supabase.
                </p>
            </div>
        </footer>
    )
}
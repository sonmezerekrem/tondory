'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import { BookOpen01Icon, Search01Icon, Menu01Icon, Logout01Icon, User02Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'

interface AppHeaderProps {
  user: any
}

export function AppHeader({ user }: AppHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border/60 sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </Button>
            
            <Link href="/app" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:block">Tondory</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <HugeiconsIcon 
                icon={Search01Icon} 
                size={18} 
                className="absolute left-3 top-2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 bg-secondary/50 border-border/60 focus:border-primary focus:ring-primary/20 rounded-xl"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button for Mobile */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <HugeiconsIcon icon={Search01Icon} size={20} />
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <HugeiconsIcon icon={User02Icon} size={16} className="text-primary" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground">
                    {user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-muted-foreground">Reader</p>
                </div>
              </div>
              
              <form action="/auth/logout" method="post">
                <Button variant="ghost" size="sm" type="submit" className="text-muted-foreground hover:text-foreground">
                  <HugeiconsIcon icon={Logout01Icon} size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border/60">
          <div className="px-4 py-3">
            <div className="relative">
              <HugeiconsIcon 
                icon={Search01Icon} 
                size={20} 
                className="absolute left-3 top-3 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 bg-secondary/50 border-border/60 focus:border-primary focus:ring-primary/20 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
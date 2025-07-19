'use client'

import {Input} from '@/components/ui/input'
import {HugeiconsIcon} from '@hugeicons/react'
import {BoatIcon, Search01Icon, User02Icon} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import {ModeToggle} from '@/components/mode-toggle'
import {SearchResultsModal} from '@/components/search-results-modal'
import {useSearchModal} from '@/contexts/search-context'

interface AppHeaderProps {
    user: any
}

export function AppHeader({user}: AppHeaderProps) {
    const { isSearchModalOpen, openSearchModal, closeSearchModal } = useSearchModal()

    return (
        <header
            className="hidden lg:block bg-background border-b border-border/60 sticky top-0 z-50 backdrop-blur-sm bg-background/80">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center space-x-4">


                        <Link href="/app" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <HugeiconsIcon icon={BoatIcon} size={20} className="text-white"/>
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
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                            />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                className="pl-10 pr-20 bg-secondary/50 border-border/60 hover:border-primary/50 focus:border-primary focus:ring-primary/20 rounded-xl cursor-pointer transition-colors"
                                readOnly
                                onClick={openSearchModal}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground bg-secondary/80 px-2 py-1 rounded border border-border/60">
                                ⌘K
                            </div>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Dark Mode Toggle */}
                        <ModeToggle/>

                        {/* User Menu */}
                        <div className="flex items-center space-x-3">
                            <div className="hidden sm:flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <HugeiconsIcon icon={User02Icon} size={16} className="text-primary"/>
                                </div>
                                <div className="hidden lg:block">
                                    <p className="text-sm font-medium text-foreground">
                                        {user.user_metadata?.display_name || user.email?.split('@')[0]}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email?.split('@')[0]}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
            {/* Search Modal */}
            <SearchResultsModal 
                open={isSearchModalOpen} 
                onOpenChange={(open) => open ? openSearchModal() : closeSearchModal()} 
            />
        </header>
    )
}
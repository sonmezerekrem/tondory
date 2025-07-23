'use client'

import {HugeiconsIcon} from '@hugeicons/react'
import {
    AddCircleIcon,
    Bookmark02Icon,
    BookOpen01Icon,
    ChartIncreaseIcon,
    DashboardSquare02Icon
} from '@hugeicons/core-free-icons'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from '@/lib/utils'
import {useModal} from '@/contexts/modal-context'

const navigation = [
    {
        name: 'Home',
        href: '/app',
        icon: DashboardSquare02Icon,
        exact: true
    },
    {
        name: 'Articles',
        href: '/app/articles',
        icon: BookOpen01Icon
    },
    {
        name: 'Add',
        href: '/app/articles',
        icon: AddCircleIcon,
        isAction: true
    },
    {
        name: 'Bookmarks',
        href: '/app/bookmarks',
        icon: Bookmark02Icon
    },
    {
        name: 'Analytics',
        href: '/app/analytics',
        icon: ChartIncreaseIcon
    },
]

export function MobileBottomNav() {
    const pathname = usePathname()
    const {openAddBlogPostModal} = useModal()

    return (
        <nav
            className="lg:hidden fixed bottom-0 pb-3 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border/60">
            <div className="flex items-center justify-around px-4 py-2 safe-area-pb">
                {navigation.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href)

                    if (item.isAction) {
                        return (
                            <div key={item.name} className="flex-1">
                                <button
                                    onClick={() => openAddBlogPostModal()}
                                    className={cn(
                                        "flex flex-col items-center space-y-1 h-auto py-2 w-full transition-colors",
                                        "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <HugeiconsIcon
                                        icon={item.icon}
                                        size={24}
                                        className={cn(
                                            "transition-colors",
                                            "text-muted-foreground"
                                        )}
                                    />
                                    <span className={cn(
                                        "text-xs font-medium transition-colors",
                                        "text-muted-foreground"
                                    )}>
                                      {item.name}
                                    </span>
                                </button>
                            </div>
                        )
                    }

                    return (
                        <Link key={item.name}
                              href={item.href} className="flex-1">
                            <button
                                className={cn(
                                    "flex flex-col items-center space-y-1 h-auto py-2 w-full transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <HugeiconsIcon
                                    icon={item.icon}
                                    size={24}
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                />
                                <span className={cn(
                                    "text-xs font-medium transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}>
                  {item.name}
                </span>
                            </button>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
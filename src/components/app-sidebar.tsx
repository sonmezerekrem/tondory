'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { DashboardSquare02Icon, BookOpen01Icon, Settings02Icon, PlusSignIcon, ChartIncreaseIcon, BookmarkAdd01Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Dashboard',
    href: '/app',
    icon: DashboardSquare02Icon,
    exact: true
  },
  {
    name: 'Blog Posts',
    href: '/app/blog-posts',
    icon: BookOpen01Icon,
  },
  {
    name: 'Analytics',
    href: '/app/analytics',
    icon: ChartIncreaseIcon,
    disabled: true,
    badge: "Coming Soon"
  },
  {
    name: 'Bookmarks',
    href: '/app/bookmarks',
    icon: BookmarkAdd01Icon,
    disabled: true,
    badge: "Coming Soon"
  },
  {
    name: 'Settings',
    href: '/app/settings',
    icon: Settings02Icon
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 lg:top-16 z-40 h-screen lg:h-[calc(100vh-4rem)] bg-background border-r border-border/60 transition-all duration-300 hidden lg:block",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)

              return (
                <Link key={item.name} href={item.disabled ? "#" : item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 font-medium transition-colors relative",
                      isActive
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
                      item.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={item.disabled}
                  >
                    <HugeiconsIcon icon={item.icon} size={20} className="mr-3" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
                        {item.badge && (
                          <Badge className="ml-2 bg-accent/10 text-accent text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full" />
                    )}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Collapse Button */}
          <div className="p-4 border-t border-border/60">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <HugeiconsIcon
                icon={isCollapsed ? DashboardSquare02Icon : DashboardSquare02Icon}
                size={16}
              />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity">
        <aside className="fixed left-0 top-0 lg:top-16 z-40 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-background border-r border-border/60 transform -translate-x-full transition-transform">
          <div className="flex flex-col h-full">
            {/* Quick Actions */}
            <div className="p-4 border-b border-border/60">
              <Link href="/app/blog-posts">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 shadow-sm justify-start"
                  size="sm"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
                  Add Article
                </Button>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href)

                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-10 font-medium transition-colors relative",
                        isActive
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={item.disabled}
                    >
                      <HugeiconsIcon icon={item.icon} size={20} className="mr-3" />
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge className="ml-2 bg-accent/10 text-accent text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full" />
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>
      </div>
    </>
  )
}
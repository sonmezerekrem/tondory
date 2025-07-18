'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { DashboardSquare02Icon, BookOpen01Icon, Settings02Icon, PlusSignIcon, ChartIncreaseIcon, BookmarkAdd01Icon, ArrowRight01Icon, ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useModal } from '@/contexts/modal-context'

const navigation = [
  {
    name: 'Dashboard',
    href: '/app',
    icon: DashboardSquare02Icon,
    exact: true
  },
  {
    name: 'Articles',
    href: '/app/articles',
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
  const { openAddBlogPostModal } = useModal()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 lg:top-16 z-40 h-screen lg:h-[calc(100vh-4rem)] bg-background border-r border-border/30 transition-all duration-300 hidden lg:block",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Quick Action */}
          <div className="p-4">
            <Button
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl h-10 min-w-10 transition-all"
              onClick={() => openAddBlogPostModal()}
            >
              <HugeiconsIcon icon={PlusSignIcon} size={16} className={cn("text-white", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && "Add Article"}
            </Button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 ${isCollapsed ? "px-2" : "px-4"} pb-4 space-y-2`}>
            {navigation.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)

              return (
                <Link key={item.name} href={item.disabled ? "#" : item.href}>
                  <div className={cn(
                    "group relative cursor-pointer transition-all duration-200",
                    item.disabled && "opacity-50 cursor-not-allowed"
                  )}>
                    <div className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}>
                      <div className={cn(
                        "w-10 h-10 min-w-10 rounded-lg flex items-center justify-center transition-all",
                        isActive
                          ? "bg-primary/20"
                          : "bg-secondary/30 group-hover:bg-secondary/60"
                      )}>
                        <HugeiconsIcon 
                          icon={item.icon} 
                          size={20} 
                          className={cn(
                            "transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                      </div>
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{item.name}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Collapse Button */}
          {/* <div className="p-4 border-t border-border/30">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center h-10 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <HugeiconsIcon
                icon={isCollapsed ? ArrowRight01Icon : ArrowLeft01Icon}
                size={16}
              />
            </Button>
          </div> */}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity">
        <aside className="fixed left-0 top-0 lg:top-16 z-40 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-background border-r border-border/30 transform -translate-x-full transition-transform">
          <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className="p-6 border-b border-border/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <HugeiconsIcon icon={BookOpen01Icon} size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Tondory</h2>
                  <p className="text-xs text-muted-foreground">Article Tracker</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4">
              <Button
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl h-10"
                onClick={() => openAddBlogPostModal()}
              >
                <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
                Add Article
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 pb-4 space-y-2">
              {navigation.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href)

                return (
                  <Link key={item.name} href={item.disabled ? "#" : item.href}>
                    <div className={cn(
                      "group relative cursor-pointer transition-all duration-200",
                      item.disabled && "opacity-50 cursor-not-allowed"
                    )}>
                      <div className={cn(
                        "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}>
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                          isActive
                            ? "bg-primary/20"
                            : "bg-secondary/30 group-hover:bg-secondary/60"
                        )}>
                          <HugeiconsIcon 
                            icon={item.icon} 
                            size={20} 
                            className={cn(
                              "transition-colors",
                              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{item.name}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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
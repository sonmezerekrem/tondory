'use client'

import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { DashboardSquare02Icon,BookmarkAdd01Icon, BookOpen01Icon, Settings02Icon, PlusSignIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useModal } from '@/contexts/modal-context'

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
    icon: PlusSignIcon,
    isAction: true
  },
    { 
    name: 'Bookmarks', 
    href: '/app/bookmarks', 
    icon: BookmarkAdd01Icon
  },
  { 
    name: 'Settings', 
    href: '/app/settings', 
    icon: Settings02Icon,
    disabled: false
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { openAddBlogPostModal } = useModal()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border/60">
      <div className="flex items-center justify-around px-4 py-2 safe-area-pb">
        {navigation.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href)
          
          if (item.isAction) {
            return (
              <Button
                key={item.name}
                size="sm"
                className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                onClick={() => openAddBlogPostModal()}
              >
                <HugeiconsIcon icon={item.icon} size={36} className="text-white" />
              </Button>
            )
          }
          
          return (
            <Link key={item.name} 
            href={item.disabled ? "#" : item.href} className="flex-1">
              <Button
              disabled= {item.disabled}
                variant="ghost"
                className={cn(
                  "flex flex-col items-center space-y-1 h-auto py-2 w-full transition-colors",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <HugeiconsIcon 
                  icon={item.icon} 
                  size={20} 
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
            
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
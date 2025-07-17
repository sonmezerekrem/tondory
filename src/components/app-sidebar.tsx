import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { DashboardSquare02Icon, Task01Icon, Settings02Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/app', icon: DashboardSquare02Icon },
  { name: 'Tasks', href: '/app/tasks', icon: Task01Icon },
  { name: 'Settings', href: '/app/settings', icon: Settings02Icon },
]

export function AppSidebar() {
  return (
    <Card className="w-64 h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
      <div className="p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  "text-left"
                )}
              >
                <HugeiconsIcon icon={item.icon} size={16} className="mr-2" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </Card>
  )
}
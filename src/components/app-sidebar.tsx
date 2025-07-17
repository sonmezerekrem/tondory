import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DashboardSquare02, Task01, Settings02 } from '@hugeicons/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/app', icon: DashboardSquare02 },
  { name: 'Tasks', href: '/app/tasks', icon: Task01 },
  { name: 'Settings', href: '/app/settings', icon: Settings02 },
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
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </Card>
  )
}
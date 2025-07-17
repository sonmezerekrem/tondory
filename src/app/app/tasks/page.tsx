import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay organized
          </p>
        </div>
        <Button>
          <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2" />
          New Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>All your tasks in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No tasks yet. Create your first task to get started!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
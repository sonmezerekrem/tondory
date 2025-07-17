import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            This feature is coming soon! For now, you can manage your blog posts.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Task management functionality will be available in a future update</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">Task management is not yet implemented.</p>
            <Link href="/app/blog-posts">
              <Button variant="outline">
                Go to Blog Posts
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
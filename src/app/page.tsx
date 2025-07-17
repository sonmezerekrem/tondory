import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon, DashboardSquare02Icon, UserIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Tondory
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your personal dashboard application for managing tasks, tracking progress, and staying organized.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/login">
              <Button size="lg" className="flex items-center gap-2">
                <HugeiconsIcon icon={UserIcon} size={20} />
                Sign In
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <HugeiconsIcon icon={DashboardSquare02Icon} size={32} className="text-primary mb-2" />
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                  Get an overview of your tasks and progress at a glance
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <HugeiconsIcon icon={DashboardSquare02Icon} size={32} className="text-primary mb-2" />
                <CardTitle>Task Management</CardTitle>
                <CardDescription>
                  Create, organize, and track your tasks efficiently
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <HugeiconsIcon icon={DashboardSquare02Icon} size={32} className="text-primary mb-2" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your productivity and achievements over time
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
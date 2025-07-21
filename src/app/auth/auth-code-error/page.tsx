'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert02Icon, BoatIcon } from '@hugeicons/core-free-icons'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <HugeiconsIcon icon={BoatIcon} size={24} className="text-white"/>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Tondory</h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <Card className="card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HugeiconsIcon icon={Alert02Icon} size={32} className="text-red-600"/>
              </div>
              <CardTitle className="text-xl font-semibold">Authentication Error</CardTitle>
              <CardDescription>
                Sorry, we couldn&apos;t complete your authentication request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-sm text-muted-foreground">
                This could be due to:
              </p>
              <ul className="text-sm text-muted-foreground text-left space-y-2">
                <li>• The authentication code was invalid or expired</li>
                <li>• The request was cancelled</li>
                <li>• A temporary server error occurred</li>
              </ul>
              
              <div className="pt-4 space-y-3">
                <Button asChild className="w-full">
                  <Link href="/auth/login">
                    Try Again
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    Go Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
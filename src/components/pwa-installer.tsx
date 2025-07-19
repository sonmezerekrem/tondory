'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isInWebApp = 'standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true
    
    if (isStandalone || isInWebApp) {
      setIsInstalled(true)
      return
    }

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    const dismissedTime = localStorage.getItem('pwa-install-dismissed-time')
    
    // Reset dismissal after 7 days
    if (dismissed && dismissedTime) {
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
      if (parseInt(dismissedTime) < sevenDaysAgo) {
        localStorage.removeItem('pwa-install-dismissed')
        localStorage.removeItem('pwa-install-dismissed-time')
      } else {
        return
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired')
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after 3 seconds instead of 30
      setTimeout(() => {
        setIsVisible(true)
      }, 3000)
    }

    const handleAppInstalled = () => {
      console.log('App installed')
      setIsInstalled(true)
      setIsVisible(false)
      setDeferredPrompt(null)
      localStorage.removeItem('pwa-install-dismissed')
      localStorage.removeItem('pwa-install-dismissed-time')
    }

    const handleForceInstall = () => {
      console.log('Force install triggered')
      if (deferredPrompt) {
        setIsVisible(true)
      } else {
        // Show a fallback install instruction
        setIsVisible(true)
        console.log('No deferred prompt available - showing fallback')
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('force-pwa-install', handleForceInstall)

    // Debug: Log current state
    console.log('PWA Installer: Setup complete', {
      isStandalone,
      isInWebApp,
      dismissed,
      userAgent: navigator.userAgent
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('force-pwa-install', handleForceInstall)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      
      setDeferredPrompt(null)
      setIsVisible(false)
    } catch (error) {
      console.error('Error during app installation:', error)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
    localStorage.setItem('pwa-install-dismissed-time', Date.now().toString())
  }

  if (isInstalled || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-background border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm">Install Tondory</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">
          Install Tondory for a better experience with offline access and quick launch.
        </p>
        
        <div className="flex space-x-2">
          {deferredPrompt ? (
            <Button onClick={handleInstall} size="sm" className="flex-1">
              Install App
            </Button>
          ) : (
            <div className="flex-1 text-xs text-muted-foreground">
              <p className="mb-2">To install manually:</p>
              <p>• Chrome: Menu → Install Tondory</p>
              <p>• Mobile: Add to Home Screen</p>
            </div>
          )}
          <Button variant="outline" onClick={handleDismiss} size="sm">
            {deferredPrompt ? "Not now" : "Got it"}
          </Button>
        </div>
      </div>
    </div>
  )
}
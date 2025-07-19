'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Check if we're in development and skip service worker
      if (process.env.NODE_ENV === 'development') {
        console.log('Service Worker skipped in development')
        return
      }

      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration)
          
          // Force update check
          registration.update()
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available - auto reload for now to fix issues
                  console.log('New service worker version available, reloading...')
                  window.location.reload()
                }
              })
            }
          })

          // Handle service worker errors
          registration.addEventListener('error', (error) => {
            console.error('Service Worker error:', error)
          })
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
          // If service worker fails, continue without it
        })

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('Cache updated:', event.data.payload)
        }
      })

      // Handle service worker controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker controller changed, reloading...')
        window.location.reload()
      })
    }
  }, [])

  return null
}
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Sun02Icon, Moon02Icon, ComputerIcon } from '@hugeicons/core-free-icons'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Theme</span>
        <div className="h-9 w-32 bg-secondary/20 rounded animate-pulse" />
      </div>
    )
  }

  const themes = [
    { value: 'light', label: 'Light', icon: Sun02Icon },
    { value: 'dark', label: 'Dark', icon: Moon02Icon },
    { value: 'system', label: 'System', icon: ComputerIcon },
  ]

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-sm font-medium text-foreground">Theme</span>
        <p className="text-xs text-muted-foreground">Choose your preferred color scheme</p>
      </div>
      <div className="flex rounded-md border border-border bg-background">
        {themes.map((themeOption) => (
          <Button
            key={themeOption.value}
            variant={theme === themeOption.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme(themeOption.value)}
            className={`h-9 px-3 rounded-none first:rounded-l-md last:rounded-r-md ${
              theme === themeOption.value 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'hover:bg-secondary/80'
            }`}
          >
            <HugeiconsIcon icon={themeOption.icon} size={14} className="mr-1.5" />
            <span className="text-xs">{themeOption.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HugeiconsIcon } from '@hugeicons/react'
import { Edit02Icon, CheckmarkCircle02Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Props = {
  user: {
    id: string
    email?: string
    user_metadata?: {
      display_name?: string
    }
  }
}

export default function ProfileEditForm({ user }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState(user.user_metadata?.display_name || '')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: displayName
        }
      })

      if (error) {
        setMessage('Error updating profile: ' + error.message)
      } else {
        setMessage('Profile updated successfully!')
        setIsEditing(false)
        // Refresh the page to show updated data
        window.location.reload()
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setDisplayName(user.user_metadata?.display_name || '')
    setIsEditing(false)
    setMessage('')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-1">
        <Label htmlFor="display-name" className="text-sm font-medium text-foreground">
          Display Name
        </Label>
        {isEditing ? (
          <div className="space-y-3">
            <Input
              id="display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="max-w-md"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                size="sm"
                className="flex items-center space-x-2"
              >
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
                <span>{isLoading ? 'Saving...' : 'Save'}</span>
              </Button>
              <Button
                onClick={handleCancel}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
                <span>Cancel</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              {user.user_metadata?.display_name || 'No display name set'}
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <HugeiconsIcon icon={Edit02Icon} size={14} />
            </Button>
          </div>
        )}
      </div>
      
      {message && (
        <div className={`text-sm p-3 rounded-md ${
          message.includes('Error') || message.includes('error') 
            ? 'bg-destructive/10 text-destructive border border-destructive/20' 
            : 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}
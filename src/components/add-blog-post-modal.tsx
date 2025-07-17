'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link02Icon, Calendar01Icon, Loading02Icon, Image01Icon } from '@hugeicons/core-free-icons'

interface BlogPost {
  id: string
  url: string
  title: string
  description: string
  image_url: string
  site_name: string
  read_date: string
  created_at: string
}

interface OpenGraphData {
  title: string
  description: string
  image: string
  siteName: string
  url: string
}

interface AddBlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  onPostAdded: (post: BlogPost) => void
}

export function AddBlogPostModal({ isOpen, onClose, onPostAdded }: AddBlogPostModalProps) {
  const [url, setUrl] = useState('')
  const [readDate, setReadDate] = useState(new Date().toISOString().split('T')[0])
  const [ogData, setOgData] = useState<OpenGraphData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setOgData(null)
    setError('')
  }

  const fetchOpenGraph = async () => {
    if (!url.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/opengraph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch OpenGraph data')
      }

      const data = await response.json()
      setOgData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metadata')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!url.trim()) {
      setError('URL is required')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const response = await fetch('/api/blog-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          title: ogData?.title || '',
          description: ogData?.description || '',
          image_url: ogData?.image || '',
          site_name: ogData?.siteName || '',
          read_date: readDate,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save blog post')
      }

      const newPost = await response.json()
      onPostAdded(newPost)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post')
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    setUrl('')
    setReadDate(new Date().toISOString().split('T')[0])
    setOgData(null)
    setError('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] gap-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-bold">Add Article</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter the URL of an article you've read and we'll fetch the details for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* URL Input */}
          <div className="space-y-3">
            <Label htmlFor="url" className="text-sm font-medium">Article URL</Label>
            <div className="relative">
              <HugeiconsIcon 
                icon={Link02Icon} 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={handleUrlChange}
                className="pl-10 h-12 bg-background/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-sm"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={fetchOpenGraph}
              disabled={!url.trim() || isLoading}
              className="w-full h-10 text-primary hover:bg-primary/10 border border-primary/30 hover:border-primary/60 rounded-xl transition-all"
            >
              {isLoading ? (
                <>
                  <HugeiconsIcon icon={Loading02Icon} size={16} className="mr-2 animate-spin" />
                  Fetching metadata...
                </>
              ) : (
                'Fetch Metadata'
              )}
            </Button>
          </div>

          {/* Date Input */}
          <div className="space-y-3">
            <Label htmlFor="readDate" className="text-sm font-medium">Read Date</Label>
            <div className="relative">
              <HugeiconsIcon 
                icon={Calendar01Icon} 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                id="readDate"
                type="date"
                value={readDate}
                onChange={(e) => setReadDate(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Preview - Cardless Design */}
          {ogData && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Preview</h4>
              <div className="p-4 bg-secondary/20 rounded-xl border border-border/30">
                <div className="flex items-start space-x-3">
                  {ogData.image && (
                    <div className="flex-shrink-0">
                      <img
                        src={ogData.image}
                        alt={ogData.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h5 className="font-semibold text-sm line-clamp-2 text-foreground">
                      {ogData.title || 'Untitled Article'}
                    </h5>
                    {ogData.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {ogData.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {ogData.siteName && <span>{ogData.siteName}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleClose}
            className="px-6 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!url.trim() || isSaving}
            className="bg-primary text-white hover:bg-primary/90 px-6 rounded-xl"
          >
            {isSaving ? (
              <>
                <HugeiconsIcon icon={Loading02Icon} size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Article'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
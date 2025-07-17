'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Blog Post</DialogTitle>
          <DialogDescription>
            Enter the URL of a blog post you've read and we'll fetch the details for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <div className="relative">
              <HugeiconsIcon icon={Link02Icon} size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/blog-post"
                value={url}
                onChange={handleUrlChange}
                className="pl-10"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={fetchOpenGraph}
              disabled={!url.trim() || isLoading}
              className="w-full"
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

          <div className="space-y-2">
            <Label htmlFor="readDate">Read Date</Label>
            <div className="relative">
              <HugeiconsIcon icon={Calendar01Icon} size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <Input
                id="readDate"
                type="date"
                value={readDate}
                onChange={(e) => setReadDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {ogData && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2">
                      {ogData.title || 'Untitled'}
                    </h4>
                    {ogData.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {ogData.description}
                      </p>
                    )}
                    {ogData.siteName && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {ogData.siteName}
                      </p>
                    )}
                  </div>
                  {ogData.image && (
                    <img
                      src={ogData.image}
                      alt={ogData.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!url.trim() || isSaving}
          >
            {isSaving ? (
              <>
                <HugeiconsIcon icon={Loading02Icon} size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Blog Post'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
'use client'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon, MoreVerticalIcon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types/blog-post'
import { cn } from '@/lib/utils'

interface ArticleActionsMenuProps {
  post: BlogPost
  view: 'grid' | 'list'
  className?: string
}

export default function ArticleActionsMenu({ post, view, className }: ArticleActionsMenuProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (isDeleting) return
    
    setIsDeleting(true)
    setDropdownOpen(false)
    
    try {
      const response = await fetch(`/api/blog-posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete article')
      }

      toast.success('Article deleted successfully')
      router.refresh()
    } catch (error) {
      console.error('Error deleting article:', error)
      toast.error('Failed to delete article')
    } finally {
      setIsDeleting(false)
    }
  }

  const buttonSize = view === 'grid' ? 'sm' : 'sm'
  const iconSize = view === 'grid' ? 16 : 14

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={buttonSize}
            className={cn(
              "text-muted-foreground hover:text-foreground transition-all",
              view === 'grid' 
                ? "absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                : "flex-shrink-0",
              className
            )}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <HugeiconsIcon icon={MoreVerticalIcon} size={iconSize} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDelete()
            }}
            disabled={isDeleting}
          >
            <HugeiconsIcon icon={Delete02Icon} size={14} className="mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete Article'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon, Loading02Icon, FileNotFoundIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { BlogPost } from '@/types/blog-post'
import { useSearch } from '@/hooks/use-search'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResultsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchResultsModal({ open, onOpenChange }: SearchResultsModalProps) {
  const { query, results, loading, error, hasSearched, setQuery, clearSearch } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  // Clear search when modal closes
  useEffect(() => {
    if (!open) {
      clearSearch()
    }
  }, [open, clearSearch])

  const handleResultClick = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Search Articles</DialogTitle>
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              size={18}
              className="absolute left-3 top-3 text-muted-foreground"
            />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base border-0 border-b border-border/60 rounded-none focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <HugeiconsIcon icon={Loading02Icon} size={24} className="text-muted-foreground animate-spin" />
              <span className="ml-2 text-muted-foreground">Searching...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center py-8 text-center">
              <div>
                <HugeiconsIcon icon={FileNotFoundIcon} size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Something went wrong</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {/* No Results */}
          {hasSearched && !loading && !error && results.length === 0 && query.length >= 2 && (
            <div className="flex items-center justify-center py-8 text-center">
              <div>
                <HugeiconsIcon icon={FileNotFoundIcon} size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No articles found</p>
                <p className="text-sm text-muted-foreground">Try a different search term</p>
              </div>
            </div>
          )}

          {/* Search Instructions */}
          {!hasSearched && query.length === 0 && (
            <div className="flex items-center justify-center py-8 text-center">
              <div>
                <HugeiconsIcon icon={Search01Icon} size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Start typing to search articles</p>
                <p className="text-sm text-muted-foreground">Search by title, description, or URL</p>
              </div>
            </div>
          )}

          {/* Query too short */}
          {query.length > 0 && query.length < 2 && (
            <div className="flex items-center justify-center py-8 text-center">
              <div>
                <HugeiconsIcon icon={Search01Icon} size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Type at least 2 characters</p>
              </div>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Found {results.length} article{results.length === 1 ? '' : 's'}
              </p>
              
              {results.map((article) => (
                <SearchResultItem
                  key={article.id}
                  article={article}
                  query={query}
                  onClick={handleResultClick}
                />
              ))}
              
              {results.length === 10 && (
                <div className="pt-4 border-t border-border/60">
                  <Link
                    href={`/app/articles?search=${encodeURIComponent(query)}`}
                    onClick={handleResultClick}
                    className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View all results
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface SearchResultItemProps {
  article: BlogPost
  query: string
  onClick: () => void
}

function SearchResultItem({ article, query, onClick }: SearchResultItemProps) {
  // Highlight search term in text
  const highlightText = (text: string, query: string) => {
    if (!query || query.length < 2) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary rounded px-0.5">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="block p-3 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 group"
    >
      <div className="flex gap-3">
        {/* Article Image */}
        {article.image_url && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
            <Image
              src={article.image_url}
              alt={article.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        )}
        
        {/* Article Content */}
        <div className="flex-1 min-w-0">
          <h5 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {highlightText(article.title, query)}
          </h5>
          
          {article.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {highlightText(article.description, query)}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="truncate">
              {new URL(article.url).hostname}
            </span>
            {article.isBookmarked && (
              <span className="text-primary">• Bookmarked</span>
            )}
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-muted-foreground" />
        </div>
      </div>
    </Link>
  )
}
'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface SearchContextType {
  isSearchModalOpen: boolean
  openSearchModal: () => void
  closeSearchModal: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const openSearchModal = useCallback(() => {
    setIsSearchModalOpen(true)
  }, [])

  const closeSearchModal = useCallback(() => {
    setIsSearchModalOpen(false)
  }, [])

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search modal with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearchModal()
      }
      
      // Close search modal with Escape
      if (e.key === 'Escape' && isSearchModalOpen) {
        closeSearchModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openSearchModal, closeSearchModal, isSearchModalOpen])

  return (
    <SearchContext.Provider value={{ isSearchModalOpen, openSearchModal, closeSearchModal }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchModal() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearchModal must be used within a SearchProvider')
  }
  return context
}
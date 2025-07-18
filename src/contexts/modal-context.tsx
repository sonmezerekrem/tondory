'use client'

import React, { createContext, useContext, useState } from 'react'
import {BlogPost} from "@/types/blog-post";


interface ModalContextType {
  isAddBlogPostModalOpen: boolean
  openAddBlogPostModal: (onPostAdded?: (post: BlogPost) => void) => void
  closeAddBlogPostModal: () => void
  onPostAdded?: (post: BlogPost) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isAddBlogPostModalOpen, setIsAddBlogPostModalOpen] = useState(false)
  const [onPostAdded, setOnPostAdded] = useState<((post: BlogPost) => void) | undefined>()

  const openAddBlogPostModal = (onPostAddedCallback?: (post: BlogPost) => void) => {
    setOnPostAdded(() => onPostAddedCallback)
    setIsAddBlogPostModalOpen(true)
  }

  const closeAddBlogPostModal = () => {
    setIsAddBlogPostModalOpen(false)
    setOnPostAdded(undefined)
  }

  return (
    <ModalContext.Provider value={{
      isAddBlogPostModalOpen,
      openAddBlogPostModal,
      closeAddBlogPostModal,
      onPostAdded
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
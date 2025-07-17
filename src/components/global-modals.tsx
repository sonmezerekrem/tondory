'use client'

import { AddBlogPostModal } from '@/components/add-blog-post-modal'
import { useModal } from '@/contexts/modal-context'

export function GlobalModals() {
  const { isAddBlogPostModalOpen, closeAddBlogPostModal, onPostAdded } = useModal()

  const handlePostAdded = (newPost: any) => {
    if (onPostAdded) {
      onPostAdded(newPost)
    }
    closeAddBlogPostModal()
    
    // If no specific callback was provided, refresh the page
    if (!onPostAdded) {
      window.location.reload()
    }
  }

  return (
    <>
      <AddBlogPostModal
        isOpen={isAddBlogPostModalOpen}
        onClose={closeAddBlogPostModal}
        onPostAdded={handlePostAdded}
      />
    </>
  )
}
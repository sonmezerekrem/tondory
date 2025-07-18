'use client'

import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {PlusSignIcon} from '@hugeicons/core-free-icons'
import {useModal} from '@/contexts/modal-context'


export default function ArticlesAddButton() {
    const {openAddBlogPostModal} = useModal()


    return (
        <Button
            className="bg-primary text-white hover:bg-primary/90 rounded-xl px-6"
            onClick={() => openAddBlogPostModal()}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} className="mr-2"/>
            Add Article
        </Button>

    )
}
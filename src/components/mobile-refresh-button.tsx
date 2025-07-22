'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {RepeatIcon} from '@hugeicons/core-free-icons'
import {useRouter} from 'next/navigation'
import LoadingSpinner from "@/components/loading-spinner";

export function MobileRefreshButton() {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const router = useRouter()

    const handleRefresh = async () => {
        setIsRefreshing(true)

        try {
            // Force refresh the current page
            router.refresh()

            // Add a small delay to show the loading state
            setTimeout(() => {
                setIsRefreshing(false)
            }, 1000)
        } catch (error) {
            console.error('Error refreshing:', error)
            setIsRefreshing(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="md:hidden h-8 w-8 p-0"
        >
            {
                isRefreshing ?
                    <LoadingSpinner/>
                    :
                    <HugeiconsIcon
                        icon={RepeatIcon}
                        size={16}
                        className={isRefreshing ? "animate-spin" : ""}
                    />
            }

            <span className="sr-only">Refresh</span>
        </Button>
    )
}
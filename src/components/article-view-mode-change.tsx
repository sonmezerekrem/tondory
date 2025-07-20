'use client'
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {HugeiconsIcon} from "@hugeicons/react";
import {Grid02Icon, Menu02Icon} from "@hugeicons/core-free-icons";
import {cn} from "@/lib/utils";

interface ViewModeProps {
    mode: 'list' | 'grid';
}

export default function ArticleViewModeChange({mode}: ViewModeProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleClick = (newMode: 'list' | 'grid') => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('view', newMode)
        router.push(`?${params.toString()}`)
    }

    return (

        <div className="flex items-center bg-secondary/30 rounded-lg p-1 gap-1">
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "h-8 px-3 rounded-xl transition-all",
                    mode === 'grid'
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground"
                )}
                onClick={() => handleClick('grid')}
            >
                <HugeiconsIcon icon={Grid02Icon} size={16}/>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "h-8 px-3 rounded-xl transition-all",
                    mode === 'list'
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground"
                )}
                onClick={() => handleClick('list')}
            >
                <HugeiconsIcon icon={Menu02Icon} size={16}/>
            </Button>
        </div>
    )
}
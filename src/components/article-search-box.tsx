'use client'
import {useRouter, useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input";
import {useEffect, useRef, useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {Search01Icon} from "@hugeicons/core-free-icons";

export default function ArticleSearchBox() {
    const [search, setSearch] = useState<string>("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const searchValue = searchParams.get("search") || ""
        setSearch(searchValue)
    }, [])

    const handleInputChange = (newSearch: string) => {
        setSearch(newSearch)
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }

        debounceTimeout.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('search', newSearch)
            router.push(`?${params.toString()}`)
        }, 500)
    }

    return (
        <div className="relative flex-1">
            <HugeiconsIcon
                icon={Search01Icon}
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={e => handleInputChange(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-sm"
            />
        </div>
    )
}
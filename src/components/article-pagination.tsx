'use client'
import {useRouter, useSearchParams} from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {PaginationInfo} from "@/types/pagination-info";

interface Props {
    pagination: PaginationInfo
}

export default function ArticlePagination({pagination}: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        params.set('size', pagination.page_size.toString())
        router.push(`?${params.toString()}`)
    }

    // Function to get visible pages based on screen size
    const getVisiblePages = () => {
        const totalPages = pagination.total_page
        const maxVisiblePages = 5 // Show max 5 pages on desktop
        const maxVisiblePagesMobile = 3 // Show max 3 pages on mobile

        // For mobile, show fewer pages
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        const maxPages = isMobile ? maxVisiblePagesMobile : maxVisiblePages

        let startPage = Math.max(1, pagination.current_page - Math.floor(maxPages / 2))
        const endPage = Math.min(totalPages, startPage + maxPages - 1)

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxPages) {
            startPage = Math.max(1, endPage - maxPages + 1)
        }

        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i)
    }

    const visiblePages = getVisiblePages()
    const showFirstPage = !visiblePages.includes(1)
    const showLastPage = !visiblePages.includes(pagination.total_page)
    const showStartEllipsis = showFirstPage && visiblePages[0] > 2
    const showEndEllipsis = showLastPage && visiblePages[visiblePages.length - 1] < pagination.total_page - 1

    return (
        <div className="mt-6 flex justify-center">
            <Pagination className="w-full max-w-fit">
                <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {/* Previous button */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (pagination.current_page > 1) handlePageChange(pagination.current_page - 1)
                            }}
                            className={`${pagination.current_page <= 1 ? 'pointer-events-none opacity-50' : ''} text-xs sm:text-sm px-2 sm:px-3`}
                        />
                    </PaginationItem>

                    {/* First page */}
                    {showFirstPage && (
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(1)
                                }}
                                isActive={pagination.current_page === 1}
                                className="text-xs sm:text-sm px-2 sm:px-3 min-w-[32px] sm:min-w-[40px]"
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Start ellipsis */}
                    {showStartEllipsis && (
                        <PaginationItem className="hidden sm:block">
                            <PaginationEllipsis className="text-xs sm:text-sm"/>
                        </PaginationItem>
                    )}

                    {/* Visible pages */}
                    {visiblePages.map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(page)
                                }}
                                isActive={page === pagination.current_page}
                                className="text-xs sm:text-sm px-2 sm:px-3 min-w-[32px] sm:min-w-[40px]"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* End ellipsis */}
                    {showEndEllipsis && (
                        <PaginationItem className="hidden sm:block">
                            <PaginationEllipsis className="text-xs sm:text-sm"/>
                        </PaginationItem>
                    )}

                    {/* Last page */}
                    {showLastPage && pagination.total_page > 1 && (
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(pagination.total_page)
                                }}
                                isActive={pagination.current_page === pagination.total_page}
                                className="text-xs sm:text-sm px-2 sm:px-3 min-w-[32px] sm:min-w-[40px]"
                            >
                                {pagination.total_page}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Next button */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (pagination.current_page < pagination.total_page) handlePageChange(pagination.current_page + 1)
                            }}
                            className={`${pagination.current_page >= pagination.total_page ? 'pointer-events-none opacity-50' : ''} text-xs sm:text-sm px-2 sm:px-3`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
import ArticleSearchBox from "@/components/article-search-box";
import ArticleViewModeChange from "@/components/article-view-mode-change";
import ArticleList from "@/components/article-list";
import AppTitle from "@/components/app-title";

type PageProps = {
    page?: string;
    size?: string;
    view?: 'list' | 'grid';
    search?: string;
}

export default async function Page(props: { searchParams: Promise<PageProps> }) {
    const {page, size, view, search} = await props.searchParams
    const currentPage = Number(page) || 1
    const pageSize = Number(size) || 100
    const searchStr = search || ""
    const viewMode = view || 'grid'

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-4">
                <AppTitle title={"Bookmarks"}
                          subtitle={"Your saved articles for later reading"}
                />

                <div className={"flex gap-2 items-center"}>
                    {/* Search */}
                    <ArticleSearchBox/>
                    {/* View Toggle and Results */}
                    <ArticleViewModeChange mode={viewMode}/>
                </div>
            </div>

            {/* Content */}
            <ArticleList page={currentPage} size={pageSize} view={viewMode} search={searchStr} endpoint={"bookmarks"}/>

        </div>
    )
}
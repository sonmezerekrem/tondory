import {createClient} from '@/lib/supabase/server'
import {redirect} from 'next/navigation'
import {AppSidebar} from '@/components/app-sidebar'
import {AppHeader} from '@/components/app-header'
import {MobileBottomNav} from '@/components/mobile-bottom-nav'
import {ModalProvider} from '@/contexts/modal-context'
import {GlobalModals} from '@/components/global-modals'
import {SearchProvider} from '@/contexts/search-context'

export default async function AppLayout({children,}: { children: React.ReactNode }) {
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    return (
        <ModalProvider>
            <SearchProvider>
                <div className="min-h-screen bg-background">
                    <AppHeader user={user}/>
                    <div className="flex">
                        <AppSidebar/>
                        <main className="flex-1 lg:ml-64">
                            <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 pt-4 lg:pt-8">
                                {children}
                            </div>
                        </main>
                    </div>
                    <MobileBottomNav/>
                    <GlobalModals/>
                </div>
            </SearchProvider>
        </ModalProvider>
    )
}
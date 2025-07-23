import {Button} from '@/components/ui/button'
import {HugeiconsIcon} from '@hugeicons/react'
import {InformationCircleIcon, Logout01Icon, Settings02Icon, User02Icon} from '@hugeicons/core-free-icons'
import {createClient} from '@/lib/supabase/server'
import ProfileEditForm from '@/components/profile-edit-form'
import {ThemeToggle} from '@/components/theme-toggle'
import {DeleteAccountDialog} from '@/components/delete-account-dialog'
import packageJson from '../../../../package.json'
import AppTitle from "@/components/app-title";

export default async function SettingsPage() {
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    return (
        <div className="space-y-8">
            <AppTitle title={"Settings"} subtitle={" Manage your account settings and preferences"}/>

            {/* Account Section */}
            <div className="space-y-6 pt-4 border-t">
                <div className="flex items-center space-x-3">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Account Information</h2>
                        <p className="text-sm text-muted-foreground">Your account details and preferences</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <ProfileEditForm user={user}/>

                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-foreground">Email Address</label>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-foreground">User ID</label>
                        <div
                            className="text-xs text-muted-foreground font-mono bg-secondary/30 rounded px-2 py-1 w-fit">
                            {user?.id}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-foreground">Member Since</label>
                        <div className="text-sm text-muted-foreground">
                            {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : 'N/A'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Preferences Section */}
            <div className="space-y-6 pt-4 border-t">
                <div className="flex items-center space-x-3">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
                        <p className="text-sm text-muted-foreground">Customize your reading experience</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="">
                        <ThemeToggle/>
                    </div>
                </div>
            </div>

            {/* Account Actions Section */}
            <div className="space-y-6 pt-4 border-t border-border/60">
                <div>
                    <h2 className="text-lg font-semibold text-foreground">Account Actions</h2>
                    <p className="text-sm text-muted-foreground">Manage your session and account</p>
                </div>

                <div className="space-y-4">
                    <form action="/auth/logout" method="post">
                        <Button
                            variant="outline"
                            type="submit"
                            className="w-full sm:w-auto border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/60 transition-all"
                        >
                            <HugeiconsIcon icon={Logout01Icon} size={16} className="mr-2"/>
                            Sign Out
                        </Button>
                    </form>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-6 pt-4 border-t border-destructive/20">
                <div>
                    <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
                    <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <div
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div>
                            <h5 className="font-semibold text-foreground">Delete Account</h5>
                            <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                        </div>
                        <DeleteAccountDialog/>
                    </div>
                </div>
            </div>

            {/* Version Information */}
            <div className="space-y-6 pt-4 border-t border-border/60">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                        <HugeiconsIcon icon={InformationCircleIcon} size={20} className="text-muted-foreground"/>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">App Information</h2>
                        <p className="text-sm text-muted-foreground">Version and build details</p>
                    </div>
                </div>

                <div className="pl-13 space-y-4">
                    <div className="flex flex-col space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">Version</span>
                            <span className="text-sm text-muted-foreground font-mono bg-secondary/30 rounded px-2 py-1">
                  v{packageJson.version}
                </span>
                        </div>
                        {/*<div className="flex justify-between items-center">*/}
                        {/*  <span className="text-sm font-medium text-foreground">Application</span>*/}
                        {/*  <span className="text-sm text-muted-foreground">*/}
                        {/*    {packageJson.name}*/}
                        {/*  </span>*/}
                        {/*</div>*/}
                        {/*<div className="flex justify-between items-center">*/}
                        {/*  <span className="text-sm font-medium text-foreground">Build Date</span>*/}
                        {/*  <span className="text-sm text-muted-foreground">*/}
                        {/*    {new Date().toLocaleDateString('en-US', {*/}
                        {/*      year: 'numeric',*/}
                        {/*      month: 'long',*/}
                        {/*      day: 'numeric'*/}
                        {/*    })}*/}
                        {/*  </span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
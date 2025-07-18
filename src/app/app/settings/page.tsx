import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Logout01Icon, User02Icon, Settings02Icon } from '@hugeicons/core-free-icons'
import { createClient } from '@/lib/supabase/server'
import ProfileEditForm from '@/components/profile-edit-form'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Account Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <HugeiconsIcon icon={User02Icon} size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Account Information</h2>
            <p className="text-sm text-muted-foreground">Your account details and preferences</p>
          </div>
        </div>

        <div className="space-y-4 pl-13">
          <ProfileEditForm user={user} />
          
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-foreground">User ID</label>
            <div className="text-xs text-muted-foreground font-mono bg-secondary/30 rounded px-2 py-1 w-fit">
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
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <HugeiconsIcon icon={Settings02Icon} size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your reading experience</p>
          </div>
        </div>

        <div className="pl-13">
          <div className="text-sm text-muted-foreground bg-secondary/20 rounded-lg p-4 border border-border/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Preference settings will be available in future updates.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="space-y-6 pt-4 border-t border-border/60">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Account Actions</h2>
          <p className="text-sm text-muted-foreground">Manage your session</p>
        </div>

        <form action="/auth/logout" method="post">
          <Button 
            variant="outline" 
            type="submit" 
            className="w-full sm:w-auto border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/60 transition-all"
          >
            <HugeiconsIcon icon={Logout01Icon} size={16} className="mr-2" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}
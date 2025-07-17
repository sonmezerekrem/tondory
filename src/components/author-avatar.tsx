import { cn } from '@/lib/utils'

interface AuthorAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AuthorAvatar({ name, size = 'sm', className }: AuthorAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  }

  return (
    <div className={cn(
      "rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary",
      sizeClasses[size],
      className
    )}>
      {getInitials(name)}
    </div>
  )
}
/**
 * Get the current date in a specific timezone as YYYY-MM-DD string
 */
export function getCurrentDateInTimezone(timezone: string): string {
  const now = new Date()
  const localDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
  const year = localDate.getFullYear()
  const month = String(localDate.getMonth() + 1).padStart(2, '0')
  const day = String(localDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get the start of the month in a specific timezone as YYYY-MM-DD string
 */
export function getStartOfMonthInTimezone(timezone: string): string {
  const now = new Date()
  const localDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
  const year = localDate.getFullYear()
  const month = localDate.getMonth()
  const startOfMonth = new Date(year, month, 1)
  return startOfMonth.toISOString().split('T')[0]
}

/**
 * Get the start of the week (Sunday) in a specific timezone as YYYY-MM-DD string
 */
export function getStartOfWeekInTimezone(timezone: string): string {
  const now = new Date()
  const localDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
  const startOfWeek = new Date(localDate)
  startOfWeek.setDate(localDate.getDate() - localDate.getDay())
  return startOfWeek.toISOString().split('T')[0]
}

/**
 * Get the user's browser timezone
 */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'UTC'
  }
}

/**
 * Get current date in user's local timezone for form inputs
 */
export function getCurrentLocalDateString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
export interface ReleaseNoteItem {
  id: string
  type: 'feature' | 'improvement' | 'bug_fix'
  title: string
  description?: string
}

export interface ReleaseNote {
  id: string
  version: string
  releaseDate: string
  isLatest: boolean
  isInitialRelease: boolean
  features: ReleaseNoteItem[]
  improvements: ReleaseNoteItem[]
  bugFixes: ReleaseNoteItem[]
}

export interface ReleaseNotesResponse {
  success: boolean
  data: ReleaseNote[]
}
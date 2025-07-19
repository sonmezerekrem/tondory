'use client'

import { useState, useEffect, useCallback } from 'react'
import { BlogPost } from '@/types/blog-post'
import { BlogPostsResponse } from '@/types/responses'

interface UseSearchOptions {
  debounceMs?: number
  minLength?: number
}

interface SearchState {
  query: string
  results: BlogPost[]
  loading: boolean
  error: string | null
  hasSearched: boolean
}

export function useSearch(options: UseSearchOptions = {}) {
  const { debounceMs = 300, minLength = 2 } = options
  
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    loading: false,
    error: null,
    hasSearched: false
  })

  const search = useCallback(async (query: string) => {
    if (!query || query.length < minLength) {
      setState(prev => ({
        ...prev,
        query,
        results: [],
        loading: false,
        error: null,
        hasSearched: false
      }))
      return
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(
        `/api/blog-posts?search=${encodeURIComponent(query)}&size=10`,
        {
          credentials: 'include',
          cache: 'no-store'
        }
      )

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data: BlogPostsResponse = await response.json()
      
      setState(prev => ({
        ...prev,
        query,
        results: data.data || [],
        loading: false,
        hasSearched: true
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Search failed',
        hasSearched: true
      }))
    }
  }, [minLength])

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(state.query)
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [state.query, search, debounceMs])

  const setQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, query }))
  }, [])

  const clearSearch = useCallback(() => {
    setState({
      query: '',
      results: [],
      loading: false,
      error: null,
      hasSearched: false
    })
  }, [])

  return {
    ...state,
    setQuery,
    clearSearch,
    search: (query: string) => {
      setState(prev => ({ ...prev, query }))
    }
  }
}
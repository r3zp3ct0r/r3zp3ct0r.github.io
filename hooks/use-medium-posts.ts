"use client"

import { useState, useEffect, useCallback } from 'react'
import { XMLParser } from 'fast-xml-parser'

export interface MediumPost {
  title: string
  link: string
  pubDate: string
  description: string
  content: string
  thumbnail?: string
  categories: string[]
  readTime?: string
}

interface UseMediumPostsOptions {
  page?: number
  limit?: number
  searchQuery?: string
  category?: string
  autoFetch?: boolean
}

// Cache untuk menyimpan data Medium
let mediumCache: {
  data: MediumPost[]
  timestamp: number
} | null = null

const CACHE_DURATION = 30 * 60 * 1000 // 30 menit

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseAttributeValue: true,
})

async function fetchMediumFeed(): Promise<MediumPost[]> {
  // Cek cache terlebih dahulu
  if (mediumCache && Date.now() - mediumCache.timestamp < CACHE_DURATION) {
    return mediumCache.data
  }

  try {
    // Coba beberapa CORS proxy sebagai fallback
    const mediumRssUrl = 'https://medium.com/feed/@vn0xaa'
    const proxies = [
      'https://api.allorigins.win/raw?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://thingproxy.freeboard.io/fetch/'
    ]
    
    let response: Response | null = null
    let lastError: Error | null = null
    
    for (const proxy of proxies) {
      try {
        response = await fetch(proxy + encodeURIComponent(mediumRssUrl), {
          headers: {
            'Accept': 'application/rss+xml, application/xml, text/xml',
          }
        })
        
        if (response.ok) {
          break
        }
      } catch (err) {
        lastError = err as Error
        continue
      }
    }
    
    if (!response || !response.ok) {
      throw lastError || new Error(`HTTP error! status: ${response?.status}`)
    }

    const xmlText = await response.text()
    const parsedData = parser.parse(xmlText)
    
    const posts: MediumPost[] = parsedData.rss.channel.item.map((item: any) => {
      // Extract thumbnail from content
      const contentMatch = item['content:encoded'] || item.description || ''
      const thumbnailMatch = contentMatch.match(/<img[^>]+src="([^"]+)"/i)
      const thumbnail = thumbnailMatch ? thumbnailMatch[1] : undefined

      // Extract categories
      const categories = item.category ? 
        (Array.isArray(item.category) ? item.category : [item.category]) : []

      // Extract read time from content
      const readTimeMatch = contentMatch.match(/(\d+)\s*min\s*read/i)
      const readTime = readTimeMatch ? `${readTimeMatch[1]} min read` : undefined

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        description: item.description || '',
        content: item['content:encoded'] || item.description || '',
        thumbnail,
        categories,
        readTime
      }
    })

    // Update cache
    mediumCache = {
      data: posts,
      timestamp: Date.now()
    }

    return posts
  } catch (error) {
    console.error('Error fetching Medium feed:', error)
    
    // Fallback data untuk testing jika RSS feed tidak bisa diakses
    const fallbackPosts: MediumPost[] = [
      {
        title: "Sample Medium Post 1",
        link: "https://medium.com/@vn0xaa/sample-post-1",
        pubDate: new Date().toISOString(),
        description: "This is a sample Medium post for testing purposes.",
        content: "This is a sample Medium post for testing purposes.",
        thumbnail: "https://via.placeholder.com/400x200?text=Medium+Post+1",
        categories: ["Technology", "Programming"],
        readTime: "5 min read"
      },
      {
        title: "Sample Medium Post 2",
        link: "https://medium.com/@vn0xaa/sample-post-2",
        pubDate: new Date(Date.now() - 86400000).toISOString(),
        description: "Another sample Medium post for testing purposes.",
        content: "Another sample Medium post for testing purposes.",
        thumbnail: "https://via.placeholder.com/400x200?text=Medium+Post+2",
        categories: ["Cybersecurity", "CTF"],
        readTime: "3 min read"
      }
    ]
    
    console.warn('Using fallback data due to RSS feed error')
    return fallbackPosts
  }
}

export function useMediumPosts(options: UseMediumPostsOptions = {}) {
  const {
    page = 1,
    limit = 10,
    searchQuery = '',
    category = '',
    autoFetch = true
  } = options

  const [posts, setPosts] = useState<MediumPost[]>([])
  const [allPosts, setAllPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchAllPosts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const posts = await fetchMediumFeed()
      setAllPosts(posts)
      setTotal(posts.length)
      
      // Apply pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedPosts = posts.slice(startIndex, endIndex)
      setPosts(paginatedPosts)
      setTotalPages(Math.ceil(posts.length / limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setPosts([])
      setAllPosts([])
      setTotal(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  const searchPosts = useCallback(async (query: string) => {
    setLoading(true)
    setError(null)

    try {
      const posts = await fetchMediumFeed()
      const searchResults = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      )
      
      setAllPosts(searchResults)
      setTotal(searchResults.length)
      
      // Apply pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedPosts = searchResults.slice(startIndex, endIndex)
      setPosts(paginatedPosts)
      setTotalPages(Math.ceil(searchResults.length / limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setPosts([])
      setAllPosts([])
      setTotal(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  const getCategories = useCallback(async (): Promise<string[]> => {
    try {
      const posts = await fetchMediumFeed()
      return [...new Set(posts.flatMap(post => post.categories))]
    } catch (err) {
      console.error('Error fetching categories:', err)
      return []
    }
  }, [])

  const getPostsByCategory = useCallback(async (categoryName: string) => {
    setLoading(true)
    setError(null)

    try {
      const posts = await fetchMediumFeed()
      const categoryPosts = posts.filter(post => 
        post.categories.some(cat => 
          cat.toLowerCase().includes(categoryName.toLowerCase())
        )
      )
      
      setAllPosts(categoryPosts)
      setTotal(categoryPosts.length)
      
      // Apply pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedPosts = categoryPosts.slice(startIndex, endIndex)
      setPosts(paginatedPosts)
      setTotalPages(Math.ceil(categoryPosts.length / limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setPosts([])
      setAllPosts([])
      setTotal(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  const fetchPosts = useCallback(async () => {
    if (searchQuery) {
      await searchPosts(searchQuery)
    } else if (category) {
      await getPostsByCategory(category)
    } else {
      await fetchAllPosts()
    }
  }, [searchQuery, category, fetchAllPosts, searchPosts, getPostsByCategory])

  useEffect(() => {
    if (autoFetch) {
      fetchPosts()
    }
  }, [fetchPosts, autoFetch])

  return {
    posts,
    loading,
    error,
    total,
    totalPages,
    fetchPosts,
    fetchAllPosts,
    searchPosts,
    getCategories,
    getPostsByCategory,
    refetch: fetchPosts
  }
}

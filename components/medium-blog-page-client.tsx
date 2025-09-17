"use client"

import { useState, useEffect } from "react"
import { useMediumPosts } from "@/hooks/use-medium-posts"
import { MediumPostCard } from "./medium-post-card"
import { MediumBlogStats } from "@/components/medium-blog-stats"
import { MediumBlogCategories } from "@/components/medium-blog-categories"
import { SearchBar } from "@/components/search-bar"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export default function MediumBlogPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchMode, setIsSearchMode] = useState(false)

  const {
    posts,
    loading,
    error,
    total,
    totalPages,
    fetchPosts,
    searchPosts,
    getPostsByCategory,
    refetch
  } = useMediumPosts({
    page: currentPage,
    limit: 12,
    searchQuery: isSearchMode ? searchQuery : "",
    category: selectedCategory,
    autoFetch: !isSearchMode
  })

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setIsSearchMode(true)
    setCurrentPage(1)
    if (query.trim()) {
      await searchPosts(query)
    } else {
      await fetchPosts()
    }
  }

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category)
    setIsSearchMode(false)
    setSearchQuery("")
    setCurrentPage(1)
    
    if (category) {
      await getPostsByCategory(category)
    } else {
      await fetchPosts()
    }
  }

  const handleRefresh = async () => {
    setCurrentPage(1)
    setIsSearchMode(false)
    setSearchQuery("")
    setSelectedCategory("")
    await refetch()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (!isSearchMode && !selectedCategory) {
      fetchPosts()
    }
  }, [currentPage, fetchPosts, isSearchMode, selectedCategory])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Artikel dan tulisan terbaru dari Medium. Klik untuk membaca lengkap di Medium.
        </p>
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <MediumBlogStats />
      </div>

      {/* Search and Categories */}
      <div className="space-y-6 mb-8">
        <div className="max-w-md mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Medium posts..."
            className="w-full"
          />
        </div>
        
        <MediumBlogCategories
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Error State */}
      {error && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="ml-2"
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner />
          <p className="text-sm text-muted-foreground mt-4">Loading posts...</p>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && !error && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {isSearchMode || selectedCategory 
                  ? "No posts found matching your criteria." 
                  : "No posts available at the moment."
                }
              </p>
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="mt-4"
              >
                Refresh
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {posts.length} of {total} posts
                  {isSearchMode && ` for "${searchQuery}"`}
                  {selectedCategory && ` in "${selectedCategory}"`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post, index) => (
                  <MediumPostCard key={`${post.link}-${index}`} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          disabled={loading}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Footer Link */}
      <div className="text-center mt-12 pt-8 border-t">
        <p className="text-muted-foreground">
          Follow me on{" "}
          <a
            href={siteConfig.medium.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Medium
          </a>{" "}
          for more content
        </p>
      </div>
    </div>
  )
}



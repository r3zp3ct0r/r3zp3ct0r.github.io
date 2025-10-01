"use client"

import { usePosts } from "@/hooks/use-posts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface BlogCategoriesProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function BlogCategories({ selectedCategory, onSelectCategory }: BlogCategoriesProps) {
  const { posts } = usePosts()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  // Get unique categories and their counts
  const categories = posts.reduce((acc, post) => {
    post.categories?.forEach(category => {
      acc[category] = (acc[category] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  // Get subcategories from posts
  const subcategories = posts.reduce((acc, post) => {
    if (post.subcategories) {
      Object.entries(post.subcategories).forEach(([parentCategory, subcats]) => {
        if (!acc[parentCategory]) {
          acc[parentCategory] = new Set()
        }
        subcats.forEach(subcat => {
          acc[parentCategory].add(subcat)
        })
      })
    }
    return acc
  }, {} as Record<string, Set<string>>)

  // Convert Set to Array and get counts
  const subcategoriesWithCounts = Object.entries(subcategories).reduce((acc, [parentCategory, subcats]) => {
    acc[parentCategory] = Array.from(subcats).map(subcat => {
      const count = posts.filter(post => 
        post.subcategories?.[parentCategory]?.includes(subcat)
      ).length
      return { name: subcat, count }
    })
    return acc
  }, {} as Record<string, Array<{name: string, count: number}>>)

  const toggleExpanded = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="mt-4 space-y-2">
          <Button
            variant={selectedCategory === null ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelectCategory(null)}
          >
            All Categories
            <span className="ml-auto text-muted-foreground">
              {posts.length}
            </span>
          </Button>
          {Object.entries(categories)
            .sort(([a], [b]) => {
              // Event CTF always comes first
              if (a === "Event CTF") return -1
              if (b === "Event CTF") return 1
              return a.localeCompare(b)
            })
            .map(([category, count]) => {
              const hasSubcategories = subcategoriesWithCounts[category] && subcategoriesWithCounts[category].length > 0
              const isExpanded = expandedCategories.has(category)
              
              return (
                <div key={category}>
                  <div className="flex items-center">
                    {hasSubcategories && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                        onClick={() => toggleExpanded(category)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    <Link 
                      href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                      className="flex-1"
                    >
                      <Button
                        variant={selectedCategory === category ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => onSelectCategory(category)}
                      >
                        {category}
                        <span className="ml-auto text-muted-foreground">
                          {count}
                        </span>
                      </Button>
                    </Link>
                  </div>
                  
                  {hasSubcategories && isExpanded && (
                    <div className="ml-6 mt-2 space-y-1">
                      {subcategoriesWithCounts[category].map((subcat) => (
                        <Link 
                          key={subcat.name}
                          href={`/categories/${encodeURIComponent(subcat.name.toLowerCase())}`}
                          className="block"
                        >
                          <Button
                            variant={selectedCategory === subcat.name ? "secondary" : "ghost"}
                            className="w-full justify-start text-sm"
                            onClick={() => onSelectCategory(subcat.name)}
                          >
                            {subcat.name}
                            <span className="ml-auto text-muted-foreground">
                              {subcat.count}
                            </span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
} 
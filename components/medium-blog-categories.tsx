"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useMediumPosts } from "@/hooks/use-medium-posts"
import { useEffect, useState } from "react"

interface MediumBlogCategoriesProps {
  onCategorySelect: (category: string) => void
  selectedCategory: string
}

export function MediumBlogCategories({ onCategorySelect, selectedCategory }: MediumBlogCategoriesProps) {
  const { getCategories } = useMediumPosts()
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const cats = await getCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [getCategories])

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-muted rounded animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect("")}
        >
          All Posts
        </Button>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}



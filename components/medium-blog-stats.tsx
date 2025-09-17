"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, Tag } from "lucide-react"
import { useMediumPosts } from "@/hooks/use-medium-posts"
import { useEffect, useState } from "react"

export function MediumBlogStats() {
  const { fetchAllPosts, posts, loading, getCategories } = useMediumPosts({ autoFetch: false })
  const [categories, setCategories] = useState<string[]>([])
  const [totalReadTime, setTotalReadTime] = useState(0)

  useEffect(() => {
    fetchAllPosts()
  }, [fetchAllPosts])

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories()
      setCategories(cats)
    }
    loadCategories()
  }, [getCategories])

  useEffect(() => {
    if (posts.length > 0) {
      // Calculate total read time
      const totalMinutes = posts.reduce((total, post) => {
        if (post.readTime) {
          const match = post.readTime.match(/(\d+)\s*min/i)
          if (match) {
            return total + parseInt(match[1])
          }
        }
        return total
      }, 0)
      setTotalReadTime(totalMinutes)
    }
  }, [posts])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Categories",
      value: categories.length,
      icon: Tag,
      color: "text-green-600"
    },
    {
      title: "Total Read Time",
      value: `${totalReadTime} min`,
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "This Year",
      value: posts.filter(post => {
        const postDate = new Date(post.pubDate)
        const currentYear = new Date().getFullYear()
        return postDate.getFullYear() === currentYear
      }).length,
      icon: Calendar,
      color: "text-purple-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

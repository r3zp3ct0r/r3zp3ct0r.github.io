"use client"

import Link from "next/link"
import { ExternalLink, Clock, Tag } from "lucide-react"

import type { MediumPost } from "@/hooks/use-medium-posts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "@/components/fallback-image"

interface MediumPostCardProps {
  post: MediumPost
}

export function MediumPostCard({ post }: MediumPostCardProps) {
  const isExternalImage = post.thumbnail?.startsWith("http")
  const imageSrc = post.thumbnail && isExternalImage ? post.thumbnail : post.thumbnail || "/placeholder.svg?height=192&width=384"

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {post.thumbnail && (
        <div className="relative w-full h-48">
          <FallbackImage
            src={imageSrc}
            alt={post.title}
            fill
            className="object-cover"
            fallbackSrc="/placeholder.svg?height=192&width=384"
          />
        </div>
      )}

      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            {post.categories.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3 w-3" /> {cat}
              </Badge>
            ))}
            {post.categories.length > 3 && (
              <Badge variant="outline">+{post.categories.length - 3}</Badge>
            )}
          </div>
        )}

        {post.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between">
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {post.readTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          )}
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
            Read on Medium <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}



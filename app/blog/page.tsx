import { generateBlogMetadata, BlogStructuredData } from "@/components/seo"
import { Suspense, lazy } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import BlogPageClient from "@/components/blog-page-client"

export const metadata = {
  ...generateBlogMetadata(),
  title: "WriteUp - CTF Solutions & Security Research",
  description: "WriteUp dan solusi CTF, penelitian keamanan, dan analisis vulnerability dari berbagai kompetisi cybersecurity.",
  openGraph: {
    title: "WriteUp - CTF Solutions & Security Research",
    description: "WriteUp dan solusi CTF, penelitian keamanan, dan analisis vulnerability dari berbagai kompetisi cybersecurity.",
  },
}

export default function BlogPage() {
  return (
    <>
      <BlogStructuredData />
      <Suspense fallback={
        <div className="container px-4 py-12 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner />
            <p className="text-sm text-muted-foreground mt-4">Loading blog...</p>
          </div>
        </div>
      }>
        <BlogPageClient />
      </Suspense>
    </>
  )
}

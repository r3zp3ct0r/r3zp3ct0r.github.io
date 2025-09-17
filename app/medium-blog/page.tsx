import { Suspense, lazy } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Medium Posts",
  description: "Artikel dan tulisan terbaru dari Medium. Klik untuk membaca lengkap di Medium.",
  openGraph: {
    title: "Blog - Medium Posts",
    description: "Artikel dan tulisan terbaru dari Medium. Klik untuk membaca lengkap di Medium.",
  },
}

const MediumBlogPageClient = lazy(() => import("@/components/medium-blog-page-client"))

export default function MediumBlogPage() {
  return (
    <Suspense fallback={
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner />
          <p className="text-sm text-muted-foreground mt-4">Loading blog...</p>
        </div>
      </div>
    }>
      <MediumBlogPageClient />
    </Suspense>
  )
}



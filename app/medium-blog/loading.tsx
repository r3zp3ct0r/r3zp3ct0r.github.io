import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner />
        <p className="text-sm text-muted-foreground mt-4">Loading Medium blog...</p>
      </div>
    </div>
  )
}



"use client"

import { memo, useMemo, Suspense, lazy, useEffect } from "react"
import Link from "next/link"
import { usePosts } from "@/hooks/use-posts"
import PostCard from "@/components/post-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { FallbackImage } from "@/components/fallback-image"

// Lazy load heavy sections for better initial page load
const HeroSection = lazy(() => import("@/components/hero-section").then(m => ({ default: m.HeroSection })))
const ProjectsSection = lazy(() => import("@/components/projects-section").then(m => ({ default: m.ProjectsSection })))
const SkillsSection = lazy(() => import("@/components/skills-section").then(m => ({ default: m.SkillsSection })))
const CTFSection = lazy(() => import("@/components/ctf-section").then(m => ({ default: m.CTFSection })))
const ExperienceSection = lazy(() => import("@/components/experience-section").then(m => ({ default: m.ExperienceSection })))

// Memoized About section component
const AboutSection = memo(() => (
      <div className="container px-4 py-16 mx-auto max-w-7xl" id="about">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">About Me</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg">
            I'm a passionate cybersecurity enthusiast and web developer based in Indonesia. I specialize in both offensive and defensive security, 
            embracing the Purple Team approach that combines Red Team and Blue Team methodologies.
            </p>
            <p className="text-lg">
              I specialize in Penetration Testing, Web Application Security, CTF competitions, and Web Development.
              I'm passionate about Cybersecurity and always eager to learn new technologies in both security and development.
            </p>
            <p className="text-lg">
              I enjoy reading, learning new things, participating in CTF events, building web applications, and sharing knowledge through my blog posts.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Passionate Purple Team specialist with expertise in penetration testing, CTF competitions, web development, and secure development practices. 
              I love sharing knowledge and experiences through my blogs. Check out my latest{" "}
              <Link href={"/blog"} className="text-primary hover:underline">
                WriteUps
              </Link>
              {" "}for CTF solutions and security research, or visit my{" "}
              <Link href={"/medium-blog"} className="text-primary hover:underline">
                Medium blog
              </Link>
              {" "}for more articles and insights.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-primary/20">
              <FallbackImage
                src="https://avatars.githubusercontent.com/u/87894083"
                alt="Mizar"
                width={256}
                height={256}
                className="object-cover rounded-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
))

AboutSection.displayName = 'AboutSection'

// Memoized Blog section component
const BlogSection = memo(({ posts, loading }: { posts: any[], loading: boolean }) => (
      <div className="container px-4 py-16 mx-auto max-w-7xl" id="blog">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Latest WriteUps</h2>
          <div className="flex gap-4">
            <Link href="/blog" className="text-primary hover:underline">
              View all WriteUps →
            </Link>
            <Link href="/medium-blog" className="text-primary hover:underline">
              Medium Blog →
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found. Add markdown files to the /posts directory.</p>
          </div>
        )}
      </div>
))

BlogSection.displayName = 'BlogSection'

// Loading fallback component
const SectionFallback = memo(() => (
  <div className="flex items-center justify-center py-16">
    <LoadingSpinner />
  </div>
))

SectionFallback.displayName = 'SectionFallback'

function HomePageClient() {
  const { posts, loading } = usePosts()

  // Memoize latest posts to prevent unnecessary re-renders
  const latestPosts = useMemo(() => posts.slice(0, 3), [posts])

  useEffect(() => {
    // Handle scroll to hash on page load
    const hash = window.location.hash
    if (hash) {
      // Wait a bit for the content to render
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          const headerOffset = 80 // Account for sticky header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 500) // Longer delay for home page as sections are lazy loaded
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Suspense fallback={<SectionFallback />}>
        <HeroSection />
      </Suspense>

      <AboutSection />

      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CTFSection />
      </Suspense>

      <BlogSection posts={latestPosts} loading={loading} />
    </div>
  )
}

export default memo(HomePageClient)

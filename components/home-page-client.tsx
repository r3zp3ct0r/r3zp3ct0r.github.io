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
const NotableAchievementsSection = lazy(() => import("@/components/notable-achievements-section").then(m => ({ default: m.NotableAchievementsSection })))

// Memoized About section component
const AboutSection = memo(() => (
      <div className="container px-4 py-16 mx-auto max-w-7xl" id="about">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">About Me</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg">
I am a Red Team Specialist and Security Researcher focused on offensive security with an ethical hacking approach. Based in Indonesia, I have a deep passion for discovering system vulnerabilities, developing custom penetration testing tools, and competing in international CTF competitions.
            </p>
            <p className="text-lg">
With a proven track record of discovering 7+ critical vulnerabilities including RCE exploitation and Admin Bypass in real-world systems, I combine theoretical knowledge with hands-on penetration testing experience. My specializations include Web Application Security, Vulnerability Research, Custom Tool Development, and Advanced Exploitation Techniques.
            </p>
            <p className="text-lg">
I believe that the best security comes from understanding the attacker's mindset. Through a Red Team approach, I help organizations understand the real-world threat landscape and strengthen their defensive posture. Every vulnerability discovered is an opportunity to build more secure systems.
            </p>
            <p className="text-lg">
Beyond penetration testing, I am actively involved in security research, open-source tool development, and knowledge sharing through CTF {" "}
              <Link href={"/blog"} className="text-primary hover:underline">
                WriteUps
              </Link>{" "} and security {" "}              <Link href={"/medium-blog"} className="text-primary hover:underline">
                Blog
              </Link>{" "}. I also maintain a fundamental understanding of Blue Team operations to provide a more comprehensive perspective in security assessments.
            </p>
            {/* <p className="text-lg text-muted-foreground leading-relaxed">
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
            </p> */}
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

      <Suspense fallback={<SectionFallback />}>
        <NotableAchievementsSection />
      </Suspense>

      <BlogSection posts={latestPosts} loading={loading} />
    </div>
  )
}

export default memo(HomePageClient)

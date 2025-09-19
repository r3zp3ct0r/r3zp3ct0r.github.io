import { Metadata } from "next"
import { HomepageStructuredData } from "@/components/seo"
import HomePageClient from "@/components/home-page-client"

// Environment variables with fallbacks
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mizar1337.github.io"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const fullUrl = `${baseUrl}${basePath}`

export const metadata: Metadata = {
  title: "Mizar - Red Team Specialist | Penetration Tester | Security Researcher",
  description: "Personal website of Mizar, a Red Team specialist, CTF Player, Web Developer, and cybersecurity enthusiast from Indonesia.",
  keywords: ["cybersecurity", "red team", "CTF", "capture the flag", "web developer", "penetration testing", "Blue Team", 
    "blue team", "red team", "security research", "Indonesia", "Mizar"],
  authors: [{ name: "Mizar", url: fullUrl }],
  creator: "Mizar",
  publisher: "Mizar",
  alternates: {
    canonical: fullUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: fullUrl,
    siteName: "Mizar",
    title: "Mizar - Red Team Specialist | Penetration Tester | Security Researcher",
    description: "Personal website of Mizar, a Red Team specialist, CTF Player, Web Developer, and cybersecurity enthusiast from Indonesia.",
    images: [
      {
        url: `${fullUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mizar - Red Team Specialist | Cybersecurity & Web Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mizar",
    creator: "@mizar",
    title: "Mizar - Red Team Specialist | Penetration Tester | Security ResearcherPurple Team Specialist | Cybersecurity & Web Developer",
    description: "Personal website of Mizar, a Red Team specialist, CTF Player, Web Developer, and cybersecurity enthusiast from Indonesia.",
    images: [`${fullUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HomePage() {
  return (
    <>
      <HomepageStructuredData />
      <HomePageClient />
    </>
  )
}

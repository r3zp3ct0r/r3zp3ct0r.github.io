import { Metadata } from "next"
import type { Post } from "@/lib/posts-client"

interface SEOProps {
  post: Post
  baseUrl?: string
}

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://mizar1337.github.io') + (process.env.NEXT_PUBLIC_BASE_PATH || '')
export function generatePostMetadata({ post }: SEOProps): Metadata {
  const postUrl = `${baseUrl}/posts/${post.slug}`
  const imageUrl = post.coverImage?.startsWith('http') 
    ? post.coverImage 
    : `${baseUrl}${post.coverImage || '/og-image.jpg'}`

  // Create a clean description from excerpt
  const description = post.excerpt
    .replace(/[#*_`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
    .substring(0, 160)

  // Generate keywords from categories and title
  const keywords = [
    ...post.categories,
    'cybersecurity',
    'CTF',
    'writeup',
    'security research',
    'Mizar Ismu Arief'
  ].join(', ')

  return {
    title: post.title,
    description,
    keywords,
    authors: [{ name: post.owner?.name || 'Mizar Ismu Arief' }],
    creator: post.owner?.name || 'Mizar Ismu Arief',
    publisher: 'Mizar Ismu Arief',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description,
      siteName: 'Mizar Ismu Arief Blog',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.owner?.name || 'Mizar Ismu Arief'],
      tags: [...post.categories],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      creator: '@mzrismuarf',
      images: [imageUrl],
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
    other: {
      'article:author': post.owner?.name || 'Mizar Ismu Arief',
      'article:published_time': post.createdAt,
      'article:modified_time': post.updatedAt,
      'article:section': post.categories[0] || 'Technology',
      'article:tag': post.categories.join(','),
    },
  }
}

export function generateBlogMetadata(): Metadata {
  return {
    title: "Blog | Cybersecurity Research & CTF Writeups",
    description: "Explore cybersecurity research, CTF writeups, vulnerability analysis, and security tutorials by Mizar Ismu Arief. Learn about web security, penetration testing, and ethical hacking.",
    keywords: "cybersecurity blog, CTF writeups, security research, penetration testing, web security, vulnerability analysis, ethical hacking, bug bounty, infosec",
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: 'website',
      url: `${baseUrl}/blog`,
      title: "Blog | Cybersecurity Research & CTF Writeups",
      description: "Explore cybersecurity research, CTF writeups, vulnerability analysis, and security tutorials by Mizar Ismu Arief.",
      siteName: 'Mizar Ismu Arief Blog',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Mizar Ismu Arief Blog",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Blog | Cybersecurity Research & CTF Writeups",
      description: "Explore cybersecurity research, CTF writeups, vulnerability analysis, and security tutorials.",
      creator: '@mzrismuarf',
      images: [`${baseUrl}/og-image.jpg`],
    },
  }
}

export function generateNotesMetadata(): Metadata {
  return {
    title: "Notes | Technical Notes & Research",
    description: "Browse technical notes, research findings, and documentation on various topics including cybersecurity, programming, and system architecture.",
    keywords: "technical notes, research notes, documentation, cybersecurity notes, programming notes, system architecture, CTF notes, security research, Mizar Ismu Arief",
    authors: [{ name: "Mizar Ismu Arief" }],
    creator: "Mizar Ismu Arief",
    publisher: "Mizar Ismu Arief",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/notes`,
    },
    openGraph: {
      type: 'website',
      url: `${baseUrl}/notes`,
      title: "Notes | Technical Notes & Research",
      description: "Browse technical notes, research findings, and documentation on various topics including cybersecurity, programming, and system architecture.",
      siteName: 'Mizar Ismu Arief Notes',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Mizar Ismu Arief Notes",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Notes | Technical Notes & Research",
      description: "Browse technical notes, research findings, and documentation on various topics.",
      creator: '@mzrismuarf',
      images: [`${baseUrl}/og-image.jpg`],
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
}

// Enhanced JSON-LD Structured Data Component
export function PostStructuredData({ post }: SEOProps) {
  const postUrl = `${baseUrl}/posts/${post.slug}`
  const imageUrl = post.coverImage?.startsWith('http') 
    ? post.coverImage 
    : `${baseUrl}${post.coverImage || '/og-image.jpg'}`

  // Calculate reading time
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  // Main Article structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": postUrl,
    headline: post.title,
    description: post.excerpt?.replace(/[#*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim(),
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
      caption: post.title
    },
    url: postUrl,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: post.owner?.name || "Mizar Ismu Arief",
      url: baseUrl,
      image: {
        "@type": "ImageObject",
        url: post.owner?.avatar_url || `${baseUrl}/avatar.jpg`,
        caption: post.owner?.name || "Mizar Ismu Arief"
      },
      sameAs: [
        "https://twitter.com/mzrismuarf",
        "https://github.com/mzrismuarf",
        "https://www.linkedin.com/in/mizarismu/"
      ],
      jobTitle: "Cybersecurity Researcher",
      worksFor: {
        "@type": "Organization",
        name: "Independent"
      }
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Mizar Ismu Arief Blog",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512
      },
      sameAs: [
        "https://twitter.com/mzrismuarf",
        "https://github.com/mzrismuarf"
      ]
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
      url: postUrl,
      name: post.title,
      description: post.excerpt,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Mizar Ismu Arief Blog"
      }
    },
    keywords: post.categories?.join(", "),
    wordCount: post.content ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).length : 0,
    timeRequired: `PT${post.content ? estimateReadingTime(post.content) : 5}M`,
    articleSection: post.categories?.[0] || "Technology",
    articleBody: post.content?.replace(/<[^>]*>/g, '').substring(0, 500) + "...",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    genre: ["Technology", "Cybersecurity", "Tutorial"],
    about: post.categories?.map(category => ({
      "@type": "Thing",
      name: category,
      sameAs: `${baseUrl}/categories/${encodeURIComponent(category.toLowerCase())}`
    })),
    mentions: post.categories?.map(category => ({
      "@type": "Thing",
      name: category
    })),
    potentialAction: [
      {
        "@type": "ReadAction",
        target: postUrl
      },
      {
        "@type": "ShareAction",
        target: postUrl,
        agent: {
          "@type": "Person",
          name: "Reader"
        }
      }
    ]
  }

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Mizar Ismu Arief Blog",
    description: "Cybersecurity research, CTF writeups, vulnerability analysis, and security tutorials",
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "en-US"
  }

  // Person structured data
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Mizar Ismu Arief",
    givenName: "Mizar",
    familyName: "Ismu Arief",
    url: baseUrl,
    image: {
      "@type": "ImageObject",
      url: post.owner?.avatar_url || `${baseUrl}/avatar.jpg`,
      caption: "Mizar Ismu Arief"
    },
    sameAs: [
      "https://twitter.com/mzrismuarf",
      "https://github.com/mzrismuarf",
      "https://www.linkedin.com/in/mizarismu/"
    ],
    jobTitle: "Cybersecurity Researcher",
    description: "Cybersecurity researcher specializing in CTF challenges, vulnerability analysis, and security tutorials",
    knowsAbout: [
      "Cybersecurity",
      "Penetration Testing",
      "Web Security",
      "CTF Challenges",
      "Vulnerability Analysis",
      "Ethical Hacking"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Independent"
    },
    alumniOf: {
      "@type": "Organization",
      name: "University"
    }
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.categories?.[0] || "Article",
        item: post.categories?.[0] ? `${baseUrl}/categories/${encodeURIComponent(post.categories[0].toLowerCase())}` : `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: postUrl
      }
    ]
  }

  // FAQ structured data (if the post contains FAQ-like content)
  const faqStructuredData = post.content?.includes('?') ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is this article about?",
        acceptedAnswer: {
          "@type": "Answer",
          text: post.excerpt || post.title
        }
      },
      {
        "@type": "Question",
        name: "Who wrote this article?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `This article was written by ${post.owner?.name || "Mizar Ismu Arief"}, a cybersecurity researcher.`
        }
      }
    ]
  } : null

  // Combine all structured data
  const combinedStructuredData = [
    articleStructuredData,
    websiteStructuredData,
    personStructuredData,
    breadcrumbStructuredData,
    ...(faqStructuredData ? [faqStructuredData] : [])
  ]

  return (
    <>
      {combinedStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
        />
      ))}
    </>
  )
}

// Enhanced Blog Section Structured Data
export function BlogStructuredData() {
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    url: `${baseUrl}/blog`,
    name: "Mizar Ismu Arief Blog",
    description: "Cybersecurity research, CTF writeups, vulnerability analysis, and security tutorials",
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Mizar Ismu Arief",
      url: baseUrl,
      sameAs: [
        "https://twitter.com/mzrismuarf",
        "https://github.com/mzrismuarf",
        "https://www.linkedin.com/in/mizarismu/"
      ]
    },
    inLanguage: "en-US",
    genre: ["Technology", "Cybersecurity", "Education"],
    keywords: "cybersecurity, CTF, writeups, security research, penetration testing, vulnerability analysis",
    about: [
      {
        "@type": "Thing",
        name: "Cybersecurity",
        sameAs: "https://en.wikipedia.org/wiki/Computer_security"
      },
      {
        "@type": "Thing", 
        name: "Capture The Flag",
        sameAs: "https://en.wikipedia.org/wiki/Capture_the_flag_(cybersecurity)"
      }
    ],
    potentialAction: [
      {
        "@type": "ReadAction",
        target: `${baseUrl}/blog`
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ]
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Mizar Ismu Arief Blog",
    description: "Cybersecurity research, CTF writeups, vulnerability analysis, and security tutorials",
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "en-US"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData, null, 2) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData, null, 2) }}
      />
    </>
  )
}

// Homepage Structured Data Component
export function HomepageStructuredData() {
  // Person schema for Mizar Ismu Arief
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Mizar Ismu Arief",
    givenName: "Mizar",
    familyName: "Ismu Arief",
    url: baseUrl,
    image: {
      "@type": "ImageObject",
      url: "https://avatars.githubusercontent.com/u/87894083",
      caption: "Mizar Ismu Arief - Cybersecurity Researcher"
    },
    sameAs: [
      "https://twitter.com/mzrismuarf",
      "https://github.com/mzrismuarf",
      "https://www.linkedin.com/in/mizarismu/"
    ],
    jobTitle: "Cybersecurity Researcher",
    description: "Cybersecurity enthusiast and CTF player specializing in penetration testing, vulnerability analysis, and security research",
    knowsAbout: [
      "Cybersecurity",
      "Penetration Testing",
      "Web Security",
      "CTF Challenges",
      "Vulnerability Analysis",
      "Ethical Hacking",
      "Linux Security",
      "Security Research"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Independent Researcher"
    },
    memberOf: [
      {
        "@type": "Organization",
        name: "TCP1P",
        url: "https://github.com/TCP1P"
      },
      {
        "@type": "Organization", 
        name: "Project Sekai CTF",
        url: "https://github.com/project-sekai-ctf"
      }
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denpasar",
      addressRegion: "Bali",
      addressCountry: "Indonesia"
    },
    nationality: {
      "@type": "Country",
      name: "Indonesia"
    }
  }

  // Website schema
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Mizar Ismu Arief - Cybersecurity Researcher",
    description: "Personal website of Mizar Ismu Arief, a cybersecurity researcher, CTF player, and security enthusiast from Indonesia",
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ReadAction",
        target: `${baseUrl}/blog`
      }
    ]
  }

  // Organization schema for professional identity
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Mizar Ismu Arief",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512
    },
    image: {
      "@type": "ImageObject",
      url: "https://avatars.githubusercontent.com/u/87894083",
      caption: "Mizar Ismu Arief"
    },
    description: "Cybersecurity research and CTF writeups by Mizar Ismu Arief",
    founder: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    sameAs: [
      "https://twitter.com/mzrismuarf",
      "https://github.com/mzrismuarf",
      "https://www.linkedin.com/in/mizarismu/"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Professional",
      availableLanguage: ["English", "Indonesian"]
    }
  }

  // Professional Service schema
  const professionalServiceStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: "Cybersecurity Research & Consulting",
    description: "Cybersecurity research, penetration testing, vulnerability analysis, and CTF challenge creation services",
    provider: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia"
    },
    serviceType: [
      "Cybersecurity Research",
      "Penetration Testing",
      "Vulnerability Analysis",
      "CTF Challenge Creation",
      "Security Consulting"
    ],
    url: baseUrl
  }

  // Blog schema
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    url: `${baseUrl}/blog`,
    name: "Mizar Ismu Arief Blog",
    description: "Cybersecurity research, CTF writeups, vulnerability analysis, and security tutorials",
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    inLanguage: "en-US",
    genre: ["Technology", "Cybersecurity", "Education"],
    keywords: "cybersecurity, CTF, writeups, security research, penetration testing, vulnerability analysis",
    about: [
      {
        "@type": "Thing",
        name: "Cybersecurity",
        sameAs: "https://en.wikipedia.org/wiki/Computer_security"
      },
      {
        "@type": "Thing",
        name: "Capture The Flag",
        sameAs: "https://en.wikipedia.org/wiki/Capture_the_flag_(cybersecurity)"
      }
    ],
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`
    }
  }

  // Breadcrumb for homepage
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl
      }
    ]
  }

  // Combine all structured data
  const combinedStructuredData = [
    personStructuredData,
    websiteStructuredData,
    organizationStructuredData,
    professionalServiceStructuredData,
    blogStructuredData,
    breadcrumbStructuredData
  ]

  return (
    <>
      {combinedStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
        />
      ))}
    </>
  )
}

export function NotesStructuredData() {
  const notesStructuredData = {
    "@context": "https://schema.org",
    "@type": "Collection",
    "@id": `${baseUrl}/notes#collection`,
    url: `${baseUrl}/notes`,
    name: "Mizar Ismu Arief Technical Notes",
    description: "Collection of technical notes, research findings, and documentation",
    creator: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Mizar Ismu Arief",
      url: baseUrl,
      sameAs: [
        "https://twitter.com/mzrismuarf",
        "https://github.com/mzrismuarf",
        "https://www.linkedin.com/in/mizarismu/"
      ]
    },
    inLanguage: "en-US",
    genre: ["Technology", "Research", "Documentation"],
    keywords: "technical notes, research notes, documentation, cybersecurity, programming",
    about: [
      {
        "@type": "Thing",
        name: "Technical Documentation",
        sameAs: "https://en.wikipedia.org/wiki/Technical_documentation"
      },
      {
        "@type": "Thing",
        name: "Research Notes",
        sameAs: "https://en.wikipedia.org/wiki/Research"
      }
    ],
    potentialAction: [
      {
        "@type": "ReadAction",
        target: `${baseUrl}/notes`
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(notesStructuredData),
      }}
    />
  )
}

export function NoteStructuredData({ slug }: { slug: string }) {
  const noteUrl = `${baseUrl}/notes/${slug}`
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": noteUrl,
    headline: `Technical Note: ${slug}`,
    url: noteUrl,
    datePublished: new Date().toISOString(),
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Mizar Ismu Arief",
      url: baseUrl,
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/avatar.jpg`,
        caption: "Mizar Ismu Arief"
      },
      sameAs: [
        "https://twitter.com/mzrismuarf",
        "https://github.com/mzrismuarf",
        "https://www.linkedin.com/in/mizarismu/"
      ],
      jobTitle: "Cybersecurity Researcher"
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Mizar Ismu Arief Notes",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512
      },
      sameAs: [
        "https://twitter.com/mzrismuarf",
        "https://github.com/mzrismuarf",
        "https://www.linkedin.com/in/mizarismu/"
      ]
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": noteUrl,
      url: noteUrl,
      name: `Technical Note: ${slug}`,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Mizar Ismu Arief Notes"
      }
    },
    genre: ["Technology", "Research", "Documentation"],
    potentialAction: [
      {
        "@type": "ReadAction",
        target: noteUrl
      },
      {
        "@type": "ShareAction",
        target: noteUrl,
        agent: {
          "@type": "Person",
          name: "Reader"
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export async function generateNoteMetadata(slug: string): Promise<Metadata> {
  try {
    // Read the notes-index.json file directly from the file system during build
    const fs = require("fs")
    const path = require("path")

    const indexPath = path.join(process.cwd(), "public", "notes-index.json")
    const indexContent = fs.readFileSync(indexPath, "utf8")
    const data = JSON.parse(indexContent)
    
    const note = data.posts?.all?.find((note: any) => note.slug === slug)

    if (!note) {
      return {
        title: 'Note Not Found',
        description: 'The requested technical note could not be found.'
      }
    }

    const noteUrl = `${baseUrl}/notes/${note.slug}`
    
    // Use OG image first, then featured image, then default
    const imageUrl = note.og_image 
      ? `${baseUrl}${note.og_image}` 
      : note.featured_image 
        ? `${baseUrl}${note.featured_image}` 
        : `${baseUrl}/og-image.jpg`

    const description = note.excerpt
      ?.replace(/[#*_`]/g, '')
      ?.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      ?.trim()
      ?.substring(0, 160) || 'Technical note'

    // Generate keywords from categories, tags, and title
    const keywords = [
      ...(note.categories || []),
      ...(note.tags || []),
      'technical notes',
      'documentation',
      'research notes',
      'Mizar Ismu Arief'
    ].join(', ')

    return {
      title: note.title,
      description,
      keywords,
      authors: [{ name: note.properties?.author || 'Mizar Ismu Arief' }],
      creator: note.properties?.author || 'Mizar Ismu Arief',
      publisher: 'Mizar Ismu Arief',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: noteUrl,
      },
      openGraph: {
        type: 'article',
        url: noteUrl,
        title: note.title,
        description,
        siteName: 'Mizar Ismu Arief Notes',
        publishedTime: note.created_time,
        modifiedTime: note.last_edited_time,
        authors: [note.properties?.author || 'Mizar Ismu Arief'],
        tags: [...(note.categories || []), ...(note.tags || [])],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: note.title,
        description,
        creator: '@mzrismuarf',
        images: [imageUrl],
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
      other: {
        'article:author': note.properties?.author || 'Mizar Ismu Arief',
        'article:published_time': note.created_time,
        'article:modified_time': note.last_edited_time,
        'article:section': note.categories?.[0] || 'Technology',
        'article:tag': (note.categories || []).concat(note.tags || []).join(','),
      },
    }
  } catch (error) {
    console.error('Error generating note metadata:', error)
    return {
      title: 'Technical Note',
      description: 'A technical note on various topics including cybersecurity, programming, and system architecture.'
    }
  }
}

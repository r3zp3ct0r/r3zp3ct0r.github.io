import { MetadataRoute } from 'next'

// Configure for static export
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://mizar.my.id') + (process.env.NEXT_PUBLIC_BASE_PATH || '')
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '*.json',
        '/public/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

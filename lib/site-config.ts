export const siteConfig = {
  name: "Mizar Ismu Arief",
  description: "Personal portfolio about technology, programming, and insights",
  url: "https://mizar1337.github.io",
  author: {
    name: "Mizar Ismu Arief",
    twitter: "@mzrismuarf",
    linkedin: "https://linkedin.com/in/mizarismuarief",
    github: "https://github.com/mzrismuarf",
    email: "mzrismuarf@gmail.com",
  },
  social: {
    twitter: "https://twitter.com/mzrismuarf",
    linkedin: "https://linkedin.com/in/mizarismuarief",
    github: "https://github.com/mzrismuarf",
  },
  medium: {
    username: "vn0xaa",
    profileUrl: "https://medium.com/@vn0xaa",
    rssUrl: "https://medium.com/feed/@vn0xaa",
  }
} as const

export type SiteConfig = typeof siteConfig

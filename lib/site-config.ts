export const siteConfig = {
  name: "Mizar Ismu Arief",
  description: "Personal portfolio about technology, programming, and insights",
  url: "https://www.mizar.my.id",
  author: {
    name: "Mizar Ismu Arief",
    twitter: "@mzrismuarf",
    linkedin: "https://www.linkedin.com/in/mizarismu/",
    github: "https://github.com/mzrismuarf",
    email: "mzrismuarf@gmail.com",
  },
  social: {
    twitter: "https://twitter.com/mzrismuarf",
    linkedin: "https://www.linkedin.com/in/mizarismu/",
    github: "https://github.com/mzrismuarf",
  },
  medium: {
    username: "vn0xaa",
    profileUrl: "https://medium.com/@vn0xaa",
    rssUrl: "https://medium.com/feed/@vn0xaa",
  }
} as const

export type SiteConfig = typeof siteConfig

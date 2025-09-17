# 🚀 Panduan Setup Portfolio Website

## 📋 Langkah-langkah Setup

### 1. **Clone dan Setup Repository**

```bash
# Clone repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install
```

### 2. **Update Konfigurasi Dasar**

#### A. File `lib/site-config.ts`
```typescript
export const siteConfig = {
  name: "Your Name's Portfolio",
  description: "Personal portfolio about technology, programming, and insights",
  url: "https://yourusername.github.io",
  author: {
    name: "Your Name",
    twitter: "@yourtwitter",
    linkedin: "yourlinkedin",
    github: "yourgithub",
    email: "your.email@example.com",
  },
  social: {
    twitter: "https://twitter.com/yourtwitter",
    linkedin: "https://linkedin.com/in/yourlinkedin",
    github: "https://github.com/yourgithub",
  }
}
```

#### B. File `app/page.tsx`
```typescript
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourusername.github.io"

export const metadata: Metadata = {
  title: "Your Name | Your Title",
  description: "Personal website of Your Name, a [your profession] from [your location].",
  keywords: ["your", "keywords", "here"],
  authors: [{ name: "Your Name", url: fullUrl }],
  creator: "Your Name",
  publisher: "Your Name",
  // ... update semua referensi ke nama Anda
}
```

### 3. **Update Konten Halaman**

#### A. About Section (`components/home-page-client.tsx`)
```typescript
const AboutSection = memo(() => (
  <div className="container px-4 py-16 mx-auto max-w-7xl" id="about">
    <h2 className="mb-8 text-3xl font-bold tracking-tight">About Me</h2>
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-lg">
          I'm a [your profession] based in [your location]. Currently working on [your current focus/role].
        </p>
        <p className="text-lg">
          I specialize in [your main skills/technologies] and have experience in [your areas of expertise].
          I'm passionate about [your interests/passions] and always eager to learn new technologies.
        </p>
        <p className="text-lg">
          I enjoy [your hobbies/interests] and believe in [your philosophy/approach to work].
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          [Your personal description]. I love sharing knowledge and experiences through my blog.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-primary/20">
          <FallbackImage
            src="https://avatars.githubusercontent.com/u/yourgithubid"
            alt="Your Name"
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
```

#### B. Hero Section (`components/hero-section.tsx`)
```typescript
const tabs = [
  {
    id: "developer",
    label: "Developer",
    icon: <Code className="w-5 h-5" />,
    color: "neon-text-green",
  },
  {
    id: "designer",
    label: "Designer",
    icon: <Palette className="w-5 h-5" />,
    color: "neon-text-blue",
  },
  // Tambahkan tab lain sesuai kebutuhan
]

const tabContent = {
  developer: {
    title: "Full Stack Developer",
    subtitle: "Web Developer & Problem Solver",
    description: "Your description here...",
    stats: [
      { label: "Years of Experience", value: "X+" },
      { label: "Projects Completed", value: "X+" },
      { label: "Technologies", value: "X+" },
    ],
  },
  designer: {
    title: "UI/UX Designer",
    subtitle: "Creative Problem Solver",
    description: "Your design description...",
    stats: [
      { label: "Designs Created", value: "X+" },
      { label: "Happy Clients", value: "X+" },
      { label: "Tools Mastered", value: "X+" },
    ],
  },
}
```

### 4. **Update Komponen Lainnya**

#### A. Skills Section (`components/skills-section.tsx`)
- Ganti skills dan technologies sesuai keahlian Anda
- Update icons dan descriptions

#### B. Experience Section (`components/experience-section.tsx`)
- Ganti work experience dengan pengalaman Anda
- Update company names, positions, dan descriptions

#### C. Projects Section (`components/projects-section.tsx`)
- Ganti projects dengan project Anda
- Update links, descriptions, dan technologies used

#### D. CTF Section (`components/ctf-section.tsx`)
- Jika tidak relevan, Anda bisa menghapus atau mengganti dengan section lain
- Misalnya: Achievements, Certifications, atau Awards

### 5. **Update Gambar dan Aset**

#### A. Avatar
- Ganti URL avatar di komponen dengan GitHub avatar Anda
- Format: `https://avatars.githubusercontent.com/u/YOUR_GITHUB_ID`

#### B. Open Graph Image
- Ganti `public/og-image.jpg` dengan gambar representatif Anda
- Ukuran yang disarankan: 1200x630px

#### C. Favicon
- Ganti `public/favicon.svg` dengan logo/favicon Anda

### 6. **Setup Environment Variables**

Buat file `.env.local`:
```env
# Notion Integration (opsional, untuk blog)
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
POSTS_DIR=public/posts

# Website Configuration
NEXT_PUBLIC_BASE_URL=https://yourusername.github.io
NEXT_PUBLIC_BASE_PATH=/repository-name

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 7. **Setup Notion untuk Blog (Opsional)**

Jika ingin menggunakan blog feature:

1. **Buat Notion Integration**
   - Buka [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Klik "New integration"
   - Beri nama dan pilih workspace
   - Copy integration token

2. **Buat Database**
   - Buat page baru di Notion
   - Tambahkan database dengan properties:
     - Title (title)
     - Published (checkbox)
     - Tags (multi-select)
     - Excerpt (text)
     - Featured Image (files & media)

3. **Share Database**
   - Klik "Share" di database
   - Invite integration Anda
   - Copy database ID dari URL

4. **Generate Content**
   ```bash
   npm run refresh-content
   ```

### 8. **Test Website Lokal**

```bash
# Run development server
npm run dev

# Buka http://localhost:3000
```

### 9. **Deploy ke GitHub Pages**

#### A. Setup Repository
1. Push code ke GitHub repository
2. Buka repository settings
3. Scroll ke "Pages" section
4. Set source ke "GitHub Actions"

#### B. Deploy Manual
```bash
# Build website
npm run build

# Deploy (akan membuat folder 'out')
npm run deploy
```

#### C. Deploy Otomatis
- GitHub Actions akan otomatis deploy setiap push ke main branch
- Workflow ada di `.github/workflows/deploy.yml`

### 10. **Custom Domain (Opsional)**

1. **Beli domain** (GoDaddy, Namecheap, dll)
2. **Setup DNS**
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME record: `yourusername.github.io`

3. **Update Repository Settings**
   - Buka repository settings > Pages
   - Masukkan custom domain
   - Check "Enforce HTTPS"

4. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   NEXT_PUBLIC_BASE_PATH=
   ```

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf .next out
npm run build
```

### GitHub Pages 404
- Pastikan file `.nojekyll` ada di folder `public/`
- Check `next.config.js` untuk basePath configuration
- Pastikan repository name sesuai dengan basePath

### Notion Integration Issues
- Pastikan database di-share dengan integration
- Check environment variables
- Pastikan database properties sesuai format

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Pages](https://pages.github.com/)
- [Notion API](https://developers.notion.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🆘 Need Help?

Jika ada masalah atau pertanyaan:
1. Check error logs di terminal
2. Buka browser developer tools
3. Check GitHub Actions logs
4. Buat issue di repository

---

**Happy Coding! 🎉** 
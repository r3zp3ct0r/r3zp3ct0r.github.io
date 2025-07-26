# Portfolio Website

Website portofolio pribadi yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS. Website ini menggunakan Notion sebagai CMS untuk mengelola konten blog dan portofolio.

## 🚀 Cara Mengubah Konten

### 1. **Konfigurasi Dasar**

Edit file `lib/site-config.ts` untuk mengubah informasi dasar website:

```typescript
export const siteConfig = {
  name: "Your Name's Portfolio", // Ganti dengan nama Anda
  description: "Personal portfolio about technology, programming, and insights",
  url: "https://yourusername.github.io", // Ganti dengan username GitHub Anda
  author: {
    name: "Your Name", // Ganti dengan nama Anda
    twitter: "@yourtwitter", // Ganti dengan Twitter handle Anda
    linkedin: "yourlinkedin", // Ganti dengan username LinkedIn Anda
    github: "yourgithub", // Ganti dengan username GitHub Anda
    email: "your.email@example.com", // Ganti dengan email Anda
  },
  social: {
    twitter: "https://twitter.com/yourtwitter",
    linkedin: "https://linkedin.com/in/yourlinkedin",
    github: "https://github.com/yourgithub",
  }
}
```

### 2. **Metadata Website**

Edit file `app/page.tsx` untuk mengubah metadata halaman utama:

```typescript
export const metadata: Metadata = {
  title: "Your Name | Your Title", // Ganti dengan nama dan title Anda
  description: "Personal website of Your Name, a [your profession] from [your location].",
  keywords: ["your", "keywords", "here"], // Ganti dengan keyword yang relevan
  // ... lainnya
}
```

### 3. **Konten Halaman Utama**

#### About Section
Edit file `components/home-page-client.tsx` bagian AboutSection:

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
        {/* Ganti dengan konten Anda */}
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-primary/20">
          <FallbackImage
            src="https://avatars.githubusercontent.com/u/yourgithubid" // Ganti dengan GitHub ID Anda
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

#### Hero Section
Edit file `components/hero-section.tsx` untuk mengubah konten hero:

```typescript
const tabs = [
  {
    id: "developer", // Ganti dengan tab yang sesuai
    label: "Developer",
    icon: <Code className="w-5 h-5" />,
    color: "neon-text-green",
  },
  // Tambahkan tab lain sesuai kebutuhan
]

const tabContent = {
  developer: {
    title: "Full Stack Developer", // Ganti dengan title Anda
    subtitle: "Web Developer & Problem Solver", // Ganti dengan subtitle
    description: "Your description here...", // Ganti dengan deskripsi
    stats: [
      { label: "Years of Experience", value: "X+" },
      { label: "Projects Completed", value: "X+" },
      { label: "Technologies", value: "X+" },
    ],
  },
  // Tambahkan konten tab lain
}
```

### 4. **Komponen Lainnya**

- **Skills Section**: Edit `components/skills-section.tsx`
- **Experience Section**: Edit `components/experience-section.tsx`
- **Projects Section**: Edit `components/projects-section.tsx`
- **CTF Section**: Edit atau hapus `components/ctf-section.tsx` jika tidak relevan

### 5. **Gambar dan Aset**

- Ganti `public/og-image.jpg` dengan gambar Open Graph Anda
- Ganti `public/favicon.svg` dengan favicon Anda
- Update avatar di komponen dengan URL GitHub avatar Anda

## 📝 Mengelola Konten Blog

Website ini menggunakan **Notion** sebagai CMS. Untuk mengatur konten blog:

### Setup Notion Integration

1. Buat Notion Integration di [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Buat database di Notion untuk blog posts
3. Share database dengan integration Anda

### Environment Variables

Buat file `.env.local`:

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
POSTS_DIR=public/posts
NEXT_PUBLIC_BASE_URL=https://yourusername.github.io
NEXT_PUBLIC_BASE_PATH=/repository-name
```

### Generate Blog Content

```bash
npm run refresh-content
```

Script ini akan:
- Mengambil konten dari Notion database
- Mengkonversi ke format yang sesuai
- Menyimpan di `public/posts/`
- Menghasilkan `public/blog-index.json`

## 🚀 Deployment ke GitHub Pages

### 1. **Setup Repository**

1. Fork atau clone repository ini
2. Rename repository sesuai username GitHub Anda
3. Update semua URL dan referensi di kode

### 2. **Build dan Deploy**

```bash
# Install dependencies
npm install

# Build untuk production
npm run build

# Deploy ke GitHub Pages
npm run deploy
```

### 3. **GitHub Actions (Opsional)**

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### 4. **GitHub Pages Settings**

1. Buka repository settings
2. Scroll ke "Pages" section
3. Set source ke "GitHub Actions"

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 Struktur File Penting

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Halaman utama
│   ├── layout.tsx         # Layout utama
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home-page-client.tsx
│   ├── hero-section.tsx
│   ├── skills-section.tsx
│   └── ...
├── lib/                   # Utilities dan konfigurasi
│   ├── site-config.ts     # Konfigurasi situs
│   └── ...
├── public/                # Static assets
│   ├── posts/            # Blog posts (generated)
│   └── ...
└── scripts/              # Build scripts
    ├── generate-blog-content.js
    └── generate-blog-index.js
```

## 🎨 Customization

### Styling
- Website menggunakan Tailwind CSS
- Edit `tailwind.config.ts` untuk custom theme
- Komponen UI ada di `components/ui/`

### Components
- Semua komponen dapat di-customize sesuai kebutuhan
- Gunakan shadcn/ui components untuk konsistensi
- Tambahkan animasi dengan Framer Motion

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Notion API](https://developers.notion.com/)

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail. 
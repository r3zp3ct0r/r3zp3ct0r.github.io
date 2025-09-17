# 📝 Panduan Setup Notion Database untuk Menu Notes

## 🎯 **Overview**

Menu Notes menggunakan database Notion yang **terpisah** dari WriteUp (Blog). Notes lebih cocok untuk konten yang lebih pendek, tips, tutorial singkat, atau catatan pribadi.

## 🗄️ **1. Buat Database Notion Baru**

### Langkah-langkah:

1. Buka Notion workspace Anda
2. Buat halaman baru dengan nama **"Notes"**
3. Tambahkan database dengan template **"Table"**
4. Rename database menjadi **"Notes"**

## 📋 **2. Konfigurasi Properties (Kolom)**

Buat kolom-kolom berikut di database Notes:

| Property Name    | Type             | Description        | Required | Example                                      |
| ---------------- | ---------------- | ------------------ | -------- | -------------------------------------------- |
| `Title`          | **Title**        | Judul note         | ✅       | "Cara Install Node.js"                       |
| `Slug`           | **Text**         | URL slug           | ✅       | "cara-install-nodejs"                        |
| `Excerpt`        | **Text**         | Ringkasan singkat  | ❌       | "Panduan lengkap install Node.js di Windows" |
| `Featured Image` | **URL**          | Gambar utama       | ❌       | "https://example.com/image.jpg"              |
| `Categories`     | **Multi-select** | Kategori           | ✅       | "Tutorial", "Tips", "Guide"                  |
| `Tags`           | **Multi-select** | Tag                | ✅       | "javascript", "nodejs", "tutorial"           |
| `Published`      | **Checkbox**     | Status publish     | ✅       | ☑️ (checked)                                 |
| `Featured`       | **Checkbox**     | Note unggulan      | ❌       | ☐ (optional)                                 |
| `Author`         | **Text**         | Nama penulis       | ✅       | "Mizar Ismu Arief"                           |
| `Public URL`     | **URL**          | Link Notion public | ❌       | "https://notion.so/..."                      |

## ⚙️ **3. Konfigurasi Environment**

Update file `.env.local` dengan konfigurasi Notes:

```env
# Notion Integration untuk Blog Content (WriteUp)
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_blog_database_id_here

# Notion Integration untuk Notes
NOTION_NOTES_TOKEN=your_notion_token_here
NOTION_NOTES_DATABASE_ID=your_notes_database_id_here

# Website Configuration
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_BASE_PATH=
```

### Cara mendapatkan Database ID:

1. Buka database Notes di Notion
2. Copy URL dari browser
3. Database ID adalah bagian setelah `/` dan sebelum `?` atau `#`
4. Contoh: `https://notion.so/12345678-1234-1234-1234-123456789abc?v=...`
5. Database ID: `12345678-1234-1234-1234-123456789abc`

## 🚀 **4. Generate Notes Content**

### Jalankan script untuk generate notes:

```bash
# Generate notes saja
npm run refresh-notes

# Generate blog + notes
npm run refresh-all
```

### Script akan:

- ✅ Mengambil data dari Notion database Notes
- ✅ Generate file JSON untuk setiap note
- ✅ Membuat index file untuk listing
- ✅ Menyimpan di `public/notes/` dan `public/notes-index.json`

## 📝 **5. Contoh Konten Notes**

### Contoh 1: Tutorial Singkat

```
Title: "Cara Install Node.js di Windows"
Slug: "cara-install-nodejs-windows"
Categories: ["Tutorial", "Development"]
Tags: ["nodejs", "windows", "tutorial"]
Excerpt: "Panduan step-by-step install Node.js di Windows"
Published: ☑️
Author: "Mizar Ismu Arief"
```

### Contoh 2: Tips & Tricks

```
Title: "5 Tips Optimasi React Performance"
Slug: "5-tips-optimasi-react-performance"
Categories: ["Tips", "React"]
Tags: ["react", "performance", "optimization"]
Excerpt: "Tips praktis untuk meningkatkan performa aplikasi React"
Published: ☑️
Author: "Mizar Ismu Arief"
```

### Contoh 3: Catatan Pribadi

```
Title: "Cheat Sheet Git Commands"
Slug: "cheat-sheet-git-commands"
Categories: ["Reference", "Git"]
Tags: ["git", "commands", "cheatsheet"]
Excerpt: "Kumpulan perintah Git yang sering digunakan"
Published: ☑️
Author: "Mizar Ismu Arief"
```

## 🔄 **6. Workflow Harian**

### Untuk menambah note baru:

1. **Buat entry baru** di database Notes Notion
2. **Isi semua field** yang diperlukan
3. **Set Published = true** untuk mempublish
4. **Jalankan** `npm run refresh-notes`
5. **Deploy** atau restart development server

### Untuk update note:

1. **Edit** di Notion database
2. **Jalankan** `npm run refresh-notes`
3. **Deploy** atau restart development server

## 🎨 **7. Perbedaan Notes vs WriteUp (Blog)**

| Aspek        | Notes                           | WriteUp (Blog)                   |
| ------------ | ------------------------------- | -------------------------------- |
| **Tujuan**   | Tips, tutorial singkat, catatan | CTF solutions, security research |
| **Panjang**  | Pendek (1-5 menit baca)         | Panjang (5-30 menit baca)        |
| **Format**   | Quick reference, tips           | Detailed analysis, walkthrough   |
| **Database** | `NOTION_NOTES_DATABASE_ID`      | `NOTION_DATABASE_ID`             |
| **URL**      | `/notes/[slug]`                 | `/blog/[slug]`                   |

## 🐛 **8. Troubleshooting**

### Error: "Notes index file not found"

```bash
# Jalankan generate notes
npm run refresh-notes
```

### Error: "Database not found"

- Pastikan `NOTION_NOTES_DATABASE_ID` benar
- Pastikan Notion token memiliki akses ke database
- Pastikan database memiliki properties yang diperlukan

### Error: "No notes found"

- Pastikan ada notes dengan `Published = true`
- Pastikan database ID benar
- Cek Notion token permissions

## 📚 **9. Struktur File yang Dihasilkan**

```
public/
├── notes/
│   ├── index.json                 # Index utama
│   ├── cara-install-nodejs/
│   │   └── post.json             # Content note individual
│   └── 5-tips-optimasi-react/
│       └── post.json
└── notes-index.json              # Public index untuk client
```

## ✅ **10. Checklist Setup**

- [ ] Database Notes dibuat di Notion
- [ ] Semua properties dikonfigurasi
- [ ] Environment variables diisi
- [ ] Script generate notes dijalankan
- [ ] Notes muncul di `/notes`
- [ ] Search dan filter berfungsi
- [ ] Individual note page berfungsi

## 🎉 **Selesai!**

Sekarang menu Notes sudah siap digunakan dengan konten dari Notion database!

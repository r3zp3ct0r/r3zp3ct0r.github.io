"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useRef } from "react"

const experienceCategories = [
  { id: "redteam", label: "Red Team" },
  { id: "webdev", label: "Web Developer" },
  { id: "researcher", label: "Researcher" },
  { id: "organization", label: "Organization" },
  { id: "other", label: "Other" },
]

const experiences = [

  // start red team experiences
  {
    title: "Penetrasi Testing website client",
    company: "Freelance",
    location: "Remote",
    period: "18 Januari 2025 - 19 Januari 2025",
    description: "• Metode pentest yang digunakan adalah blackbox, karena client hanya mengirimkan url website saja. • Website target menggunakan teknologi CodeIgniter 3. • Dari hasil pentest, berhasil menemukan sebuah celah keamanan, seperti ada kerentanan pada library Dompdf (Versi 1.2.0), PhpSpreadSheet (Versi 1.0.1). Kedua kerentanan tersebut bisa diexploitasi ketika berhasil masuk kedalam dashboard. • Selain itu juga menemukan kerentanan PHPUnit (Versi 4.8.36), dimana kerentanan tersebut memiliki kerentanan RCE tanpa perlu login (CVE-2017-9841). Client meminta untuk coba exploitasi nya, dan ditahap exploitasi CVE-2017-9841 ini, karena website client dideploy menggunakan salah satu layanan hosting di indonesia,  dari pihak hosting melakukan pencegahan seperti RCE. Namun dari berbagai cara, berhasil melakukan bypass nya dan berhasil melakukan RCE seperti hanya menampilkan id server saja yang cukup untuk dibuktikan sebagai kerentanan. Selain itu juga saya buatkan rekomendasi dan saran pencegahan nya",
    skills: ["Blackbox Pentest", "Web Exploitation", "Reporting"],
    highlight: true,
    category: "redteam",
  },
  {
    title: "Penetrasi Testing pada salah satu subdomain Universitas Perjuangan Tasikmalaya",
    company: "Universitas Perjuangan Tasikmalaya",
    location: "Remote",
    period: "-",
    description: "• Metode Menemukan celah URL Parameter Manajemen Keuangan. Halaman tersebut untuk mengelola Master Keuangan dengan hak akses admin atau akses tingkat tinggi. Tetapi saya bisa mengelola master keuangan dengan hak ases sebagai user biasa atau mahasiswa. • Melakukan Pentest pada fitur cetak kartu UTS/UAS. Dengan melakukan pentest tersebut dapat ditemukan cara bypass dengan manipulation URL untuk melakukan cetak kartu UTS/UAS meskipun ada tunggakan. • Melakukan Pentest pada halaman TA/Skripsi. Pada halaman tersebut terdapat celah pada form upload dokumen TA/Skripsi yang bisa diexploitasi dengan cara bypass pada saat upload dokumen dengan ektensi php. • Membuat laporan atas penemuan bug pada sistem Universitas Perjuangan Tasikmalaya dan laporan tersebut diserahkan kepada TIK",
    skills: ["Blackbox Pentest", "Web Exploitation", "Reporting"],
    highlight: true,
    category: "redteam",
  },  
  // end red team experiences

  // start web developer experiences
  {
    title: "Rancang Bangun Sistem Point of Sale (POS) Kuliner",
    company: "Freelance",
    location: "Remote",
    period: "19 Mei 2025 - 09 Juni 2025",
    description: "•	Merancang dan implementasi full-stack aplikasi Point of Sale (POS) berbasis web yang dirancang untuk efisiensi operasional bisnis kuliner. Aplikasi ini memiliki fitur manajemen transaksi, pengelolaan menu yang komprehensif, dan dasbor pelaporan analitik. Sistem ini dibangun dengan arsitektur MVC menggunakan framework Laravel, dengan antarmuka yang responsif dan interaktif.",
    skills: ["Laravel 10", "PHP", "MySQL", "JavaScript", "Blade", "Tailwind CSS", "Chart.js"],
    // link: "https://github.com/mzrismuarf/pos-larael", // Contoh dari Anda
    // highlight: true,
    category: "webdev",
  },
  {
    title: "Membuat Website Kalender Personal (Fokus Mobile)",
    company: "Freelance",
    location: "Remote",
    period: "26 Februari 2025 - 03 Maret 2025",
    description: "•	Membangun sebuah aplikasi kalender personal yang fungsional dari nol dengan fokus pada desain mobile-first yang responsif. •	Mengimplementasikan sistem autentikasi pengguna (login & register) untuk privasi data, serta merancang fitur CRUD (Create, Read, Update, Delete) untuk berbagai jenis acara (event, ulang tahun, pengingat, hitung mundur).",
    skills: ["PHP Native", "JavaScript", "MySQL", "CSS"],
    category: "webdev",
  },
  {
    title: "Pengembangan Platform E-Katalog Fotografer",
    company: "Freelance",
    location: "Remote",
    period: "02 Januari 2025 - 30 Januari 2025",
    description: "•	Mengembangkan sebuah platform e-katalog khusus untuk jasa fotografer, membangun alur bisnis yang terstruktur mulai dari pemesanan hingga penyelesaian transaksi. •	Membangun sistem berbasis peran (Admin dan User) dengan hak akses berbeda, di mana Admin mengelola konten dan transaksi, sementara User dapat melakukan registrasi, pemesanan, hingga mencetak tiket.",
    skills: ["Laravel", "PHP", "MySQL", "Blade", "Voler Bootstrap Admin Dashboard"],
    category: "webdev",
  },
    {
    title: "Pembangunan Website CV & Portofolio Dinamis",
    company: "Freelance",
    location: "Remote",
    period: "07 Januari 2025 - 10 Januari 2025",
    description: "• Membangun sebuah sistem manajemen CV dinamis dari awal, yang memungkinkan pengguna mengelola konten melalui antarmuka CRUD yang intuitif. • Menangani seluruh siklus proyek, mulai dari arsitektur backend menggunakan PHP Native, implementasi frontend dengan Tailwind CSS, hingga deployment aplikasi ke hosting cPanel.",
    skills: ["PHP Native", "MySQL", "Tailwind CSS", "cPanel"],
    category: "webdev",
  },
  {
    title: "Perancangan dan Pembangunan Platform E-Katalog Influencer",
    company: "Freelance",
    location: "Remote",
    period: "21 November 2024 - 29 Januari 2025",
    description: "• Merancang dan membangun sebuah website E-Katalog dari awal untuk mengubah proses bisnis manual menjadi sistem digital yang efisien dan terstruktur. <br>• Hasilnya berhasil meningkatkan efisiensi waktu secara signifikan bagi klien dalam proses pencarian, pemilihan, dan pengelolaan data influencer.",
    skills: ["Laravel", "PHP", "MySQL", "Blade", "Voler Bootstrap Admin Dashboard"],
    category: "webdev",
  },
  {
    title: "Pengembangan dan Pemeliharaan Website Inventaris Aset",
    company: "Freelance",
    location: "Remote",
    period: "21 Agustus 2024 - 30 Agustus 2024",
    description: "• Melakukan perbaikan dan pengembangan pada proyek yang sudah ada, meliputi penambahan fitur krusial seperti pembuatan surat otomatis dengan logo perusahaan. <br>• Melakukan refactoring kode untuk meningkatkan performa serta aktif dalam debugging untuk memperbaiki berbagai error tampilan (UI/UX) dan fungsionalitas.",
    skills: ["PHP Native (MVC)", "MySQL", "Boostrap"],
    category: "webdev",
  },
  {
    title: "Implementasi Sistem PPDB Online Berbasis Desain Figma",
    company: "Freelance",
    location: "Remote",
    period: "28 Mei 2024 - 18 Juni 2024",
    description: "• Bertanggung jawab penuh atas implementasi teknis dari desain UI/UX (Figma) menjadi sebuah sistem informasi PPDB online yang fungsional dan responsif. <br>• Membangun logika backend dan sistem berbasis peran (role-based) untuk Admin dan Calon Peserta.",
    skills: ["Laravel", "PHP", "MySQL", "Blade", "Voler Bootstrap"],
    category: "webdev",
  },
  {
    title: "Pembangunan Website Portofolio Statis Profesional",
    company: "Freelance",
    location: "Remote",
    period: "16 Maret 2024 - 17 Maret 2024",
    description: "• Membangun sebuah website portofolio statis dari nol menggunakan teknologi fundamental web untuk menampilkan proyek dan keahlian secara profesional. <br>• Mendesain dan mengimplementasikan antarmuka yang bersih, responsif, dan cepat diakses untuk memberikan pengalaman pengguna yang optimal.",
    skills: ["HTML", "CSS", "JavaScript"],
    category: "webdev",
  },
  {
    title: "Kerja Praktik - Universitas Perjuangan Tasikmalaya",
    company: "Universitas Perjuangan Tasikmalaya",
    location: "Tasikmalaya, Indonesia",
    period: "Februari 2024 - Juni 2024",
    description: "Membuat sebuah Sistem untuk mendeteksi Defacement Slot berbasis Website. Pada sistem tersebut terdapat sebuah fitur untuk mendeteksi file atau folder berisi defacement slot yang menginfeksi server, dan fitur pencegahan untuk meminimalisir dampak dari defacement slot. Sistem dapat di implementasikan di server Universitas Perjuangan Tasikmalaya.",
    skills: ["Laravel 8", "MySQL", "Blade", "Mazer Boostrap Admin Dashboard"],
    category: "webdev",
  },

  // end web developer experiences

  // start researcher experiences
  {
    title: "Penelitian Internal",
    company: "Universitas Perjuangan Tasikmalaya",
    location: "Tasikmalaya, Indonesia",
    period: "September 2024 - Desember 2024",
    description: "Mengikuti penelitian internal dengan dosen teknik informatika mengenai pengembangan sistem pendeteksian defacement slot pada server. Pada penelitian ini, fokus mengembangkan untuk pendeteksian defacement slot agar hasil lebih akurat. ",
    skills: ["Laravel 8", "MySQL", "Blade", "Mazer Boostrap Admin Dashboard"],
    category: "researcher",
  },
  // end researcher experiences

  // start organitation experiences
  {
    title: "Ketua Tim Proyek Robotika - Departemen Pendidikan",
    company: "UKM Robotika Universitas Perjuangan Tasikmalaya",
    location: "Tasikmalaya, Indonesia",
    period: "April 2024 - Juni 2024",
    description: "•	Membuat materi pembelajaran komponen dan praktik robotika untuk anggota UKM Robotika. •	Membuat proyek Robot Turtle dan Pendeteksi Api di Suatu Ruangan untuk keperluan PPKMB UKM. •	Membuat proyek Pemilahan Sampah Logam dan Non Logam untuk dipamerkan di Pameran Robotika Bandung •	Melakukan Rancang Bangun Pemilahan Sampah Logam dan Non Logam Berbasis Arduino UNO. •	Menggunakan sensor Proximity Inductive NPM NO sebagai alat utama dalam proyek.",
    skills: ["Arduino Uno", "C++", "Python"],
    category: "organization",
  },
  // end ogranitation experiences
  // other experiences
  {
    title: "Pengajar Kampus Mengajar Angkatan 5 ",
    company: "SDN Mekarwangi Tasikmalaya",
    location: "Tasikmalaya, Indonesia",
    period: "Februari 2023 - Juni 2023",
    description: "Berperan sebagai pengajar dan fasilitator dalam Program Kampus Mengajar Angkatan 5 di SD Negeri Mekarwangi Tasikmalaya. Selain itu Berpartisipasi dalam perancangan dan implementasi berbagai program kerja dan juga membuat dan mengimplementasikan media pembelajaran digital berbasis game menggunakan Articulate Storyline 3 untuk meningkatkan literasi dan numerasi siswa.",
    skills: ["Ms. Word", "Ms. Excel", "Editing Video", "Adobe Illustrator"],
    category: "other",
  },
];

export function ExperienceSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("redteam")
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="container px-4 py-16 mx-auto max-w-7xl" id="experience" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight neon-text-white">Professional Experience</h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground">My journey in the cybersecurity realm</p>
      </motion.div>
      <div className="flex justify-start md:justify-center gap-2 mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        {experienceCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${activeCategory === cat.id ? "bg-primary text-white" : "bg-muted text-primary hover:bg-primary/10"}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="relative md:border-l-2 border-muted md:pl-8 md:ml-4">
          {experiences.filter(e => e.category === activeCategory).map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-12 relative"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="hidden md:block absolute w-4 h-4 bg-primary rounded-full -left-[41px] top-1" />
              <Card className={`transition-all duration-300 ${experience.highlight ? "border-primary/30" : ""}`}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <CardTitle className="text-lg sm:text-xl break-words">{experience.title}</CardTitle>
                      {experience.highlight && hoveredCard === index && (
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-yellow-500" />
                        </motion.div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <CardDescription className="text-base md:text-lg font-medium truncate">
                        {experience.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>

                  {Array.isArray(experience.description)
                    ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {experience.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      )
                    : experience.description.includes("•")
                      ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {experience.description.split(/•|\n|<br\s*\/?>(\s*)?/).filter(Boolean).map((desc, i) => <li key={i}>{desc.trim()}</li>)}
                        </ul>
                      )
                      : <p>{experience.description}</p>
                  }

                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/20 hover:bg-primary/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

# HIMASANTIKA UMC — Website Resmi

> **Himpunan Mahasiswa Jurusan Teknik Informatika**  
> Universitas Muhammadiyah Cirebon

Website resmi HIMASANTIKA UMC — wadah aspirasi, inovasi teknologi, dan pengembangan karakter kepemimpinan mahasiswa S1 Teknik Informatika Universitas Muhammadiyah Cirebon.

---

## 🌐 Tentang Website

Website ini dibangun sebagai profil digital resmi HIMASANTIKA UMC, menampilkan informasi organisasi, struktur kepengurusan, program kerja, galeri dokumentasi, serta informasi kontak. Didesain dengan tampilan modern menggunakan animasi interaktif dan visual berbasis WebGL.

### Halaman & Seksi

| Seksi | Deskripsi |
|-------|-----------|
| **Beranda** | Hero section dengan animasi Silk WebGL dan WarpText interaktif |
| **Tentang** | Profil dan latar belakang HIMASANTIKA sejak 13 September 2012 |
| **Struktur Organisasi** | BPH dan 8 Lembaga/Departemen HIMASANTIKA |
| **Program Kerja** | Kegiatan utama: Kaderisasi, Hubungan Eksternal, Akademik, dll |
| **Galeri** | Dokumentasi foto kegiatan resmi organisasi |
| **Kontak & Footer** | Informasi kontak, media sosial, dan navigasi halaman |

---

## 🛠️ Tech Stack

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Next.js](https://nextjs.org) | 16.2.12 | React Framework (App Router) |
| [React](https://react.dev) | 19.2.4 | UI Library |
| [TailwindCSS](https://tailwindcss.com) | v4 | Utility-first CSS Framework |
| [Three.js](https://threejs.org) | ^0.185.1 | 3D / WebGL rendering |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | ^9.7.0 | React renderer untuk Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | ^10.7.7 | Helpers untuk R3F |
| [GSAP](https://greensock.com/gsap/) | ^3.15.0 | Animasi scroll & timeline |
| [Lenis](https://lenis.darkroom.engineering) | ^1.3.25 | Smooth scrolling |
| [Anime.js](https://animejs.com) | ^4.5.0 | JavaScript animation engine |
| [OGL](https://github.com/oframe/ogl) | ^1.0.11 | Lightweight WebGL library |
| [Lucide React](https://lucide.dev) | ^1.39.0 | Icon library |

**Font:** Poppins & Inter (Google Fonts)

---

## 🚀 Menjalankan Project

### Prasyarat

- **Node.js** v18 atau lebih baru
- **npm** / yarn / pnpm / bun

### Instalasi

```bash
# Clone repository
git clone <url-repository>
cd NeperCode2

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Produksi

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📁 Struktur Project

```
NeperCode2/
├── public/
│   ├── logos/                    # Logo HIMASANTIKA & logo divisi
│   │   └── logo-divisi/
│   └── images/
│       └── kegiatan/             # Foto dokumentasi kegiatan
├── src/
│   └── app/
│       ├── components/
│       │   ├── Navbar.js         # Navigasi utama
│       │   ├── Hero.js           # Hero section (Silk WebGL + WarpText)
│       │   ├── About.js          # Profil organisasi
│       │   ├── Structure.js      # Struktur BPH & Departemen
│       │   ├── Activities.js     # Program kerja & kegiatan
│       │   ├── Gallery.js        # Galeri dokumentasi
│       │   ├── ContactFooter.js  # Kontak & footer
│       │   ├── LenisProvider.js  # Smooth scroll provider
│       │   ├── ThreeCanvas.js    # WebGL Three.js canvas
│       │   └── reactbits/        # Komponen animasi interaktif
│       ├── globals.css           # Global styles & design tokens
│       ├── layout.js             # Root layout & metadata SEO
│       └── page.js               # Halaman utama
├── next.config.mjs
├── tailwind.config.*
└── package.json
```

---

## 🏛️ Tentang HIMASANTIKA UMC

**HIMASANTIKA** (Himpunan Mahasiswa Jurusan Teknik Informatika) adalah lembaga eksekutif kooperatif di bawah naungan BEM Fakultas Teknik Universitas Muhammadiyah Cirebon, berdiri sejak **13 September 2012**.

### Struktur Organisasi

**Badan Pengurus Harian (BPH)**
- Bupati — Pimpinan tertinggi pelaksana arah gerak organisasi
- Wakil Bupati — Pendamping & koordinasi kerja
- Sekretaris Umum & Wakil Sekretaris
- Bendahara Umum & Wakil Bendahara

**Lembaga & Departemen**
- 🏛️ Lembaga Advokasi
- 🎯 Lembaga Minat Bakat
- 🎓 Dept. Kaderisasi
- 📢 Dept. Dokominfo (Dokumentasi & Informasi)
- 📋 Dept. PO (Pengembangan Organisasi)
- 📚 Dept. Dikmas (Pendidikan Mahasiswa)
- 🤝 Dept. Hubeksos (Hubungan Eksternal & Sosial)
- 💼 Dept. Bismit (Bisnis & Kemitraan)

---

## 📬 Kontak

| Kanal | Info |
|-------|------|
| 📧 Email | [himasantika@umc.ac.id](mailto:himasantika@umc.ac.id) |
| 📱 WhatsApp | [085795483927](https://wa.me/6285795483927) |
| 📸 Instagram | [@himasantika_umc](https://instagram.com/himasantika_umc) |
| 🎵 TikTok | [@himasantika_umc](https://tiktok.com/@himasantika_umc) |
| 📍 Sekretariat | Kampus 1 UMC — Jl. Tujuh Pahlawan Revolusi No. 70, Cirebon |

---

© 2024 HIMASANTIKA — S1 Teknik Informatika · Fakultas Teknik · Universitas Muhammadiyah Cirebon

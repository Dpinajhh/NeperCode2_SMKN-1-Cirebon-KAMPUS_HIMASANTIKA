PORTAL WEBSITE RESMI HIMASANTIKA UMC

Portal web dan profil organisasi resmi Himpunan Mahasiswa Teknik Informatika (HIMASANTIKA), Fakultas Teknik, Universitas Muhammadiyah Cirebon.

Dirancang dan dikembangkan oleh: NeperCode2


1. RINGKASAN TEKNIS

Aplikasi web ini dibangun menggunakan arsitektur modern berbasis Next.js 16 dengan model App Router dan React 19. Desain antarmuka memanfaatkan Tailwind CSS v4.

Sistem mengintegrasikan pipeline grafis WebGL interaktif (Three.js dan OGL), modul animasi fisika (GSAP dan Motion), serta mesin smooth scrolling (Lenis) yang telah dioptimalkan agar tidak membebani penggunaan CPU maupun GPU.


2. MODUL HALAMAN DAN FITUR

[1] Beranda (Rute: /)
    - Komponen: Silk (Three.js WebGL), WarpText, ScrollReveal
    - Fungsi: 
      Bagian utama dengan latar belakang simulasi kain sutra WebGL dinamis, tipografi judul yang bereaksi terhadap kursor mouse, serta transisi deskripsi berbasis posisi scroll.

[2] Tentang Organisasi (Rute: /tentang)
    - Komponen: TrueFocus, BlurText, ProfileCard (3D Tilt)
    - Fungsi: 
      Menampilkan profil lengkap himpunan, visi organisasi, tujuan Catur Dharma Perguruan Tinggi, status lembaga eksekutif, dan lokasi sekretariat.

[3] Struktur & Divisi (Rute: /struktur)
    - Komponen: VariableProximity, ChromaGrid, MagicBento
    - Fungsi: 
      Visualisasi bagan pengurus Badan Pengurus Harian (BPH) dan 8 Lembaga/Departemen dengan efek spotlight pencahayaan partikel interaktif.

[4] Kegiatan Utama (Rute: /kegiatan)
    - Komponen: DecryptedText, TargetCursor
    - Fungsi: 
      Dokumentasi 4 program kerja unggulan (Mengenal Organisasi 2025, Kajian Public Speaking, Studi Banding, dan Open Recruitment) dengan custom cursor interaktif.

[5] Galeri Dokumentasi (Rute: /galeri)
    - Komponen: MaskedHeading (GSAP), DriftWall (3D Perspective)
    - Fungsi: 
      Galeri visual interaktif 3D multi-kolom yang melayang dinamis, dilengkapi judul bermasker foto kegiatan.

[6] Hubungi Kami (Rute: /kontak)
    - Komponen: SplitFlapText, SpecularButton (OGL Shader)
    - Fungsi: 
      Kanal komunikasi resmi (Gmail, WhatsApp, Instagram, TikTok), peta interaktif Google Maps kampus 2 Watubelah, dan tombol specular shader.


3. TUMPUKAN TEKNOLOGI (TECH STACK)

A. Kerangka Kerja & Runtime:
   - Next.js 16.2.12 (App Router & Turbopack)
   - React 19.2.4 & React DOM
   - Tailwind CSS v4

B. Grafis WebGL & Animasi:
   - three (^0.185.1) & @react-three/fiber (^9.7.0) : Canvas WebGL Silk
   - ogl (^1.0.11)                                 : Shader tombol specular
   - gsap (^3.15.0)                                : Animasi fisika & masking
   - motion (^13.2.0)                              : Animasi transisi teks
   - animejs (^4.5.0)                              : Utilitas easing animasi
   - lenis (^1.3.25)                               : Engine smooth scroll global

C. Tipografi & Aset:
   - Poppins, Inter, Roboto Flex (via next/font/google)


4. PALET WARNA DESAIN

- Navy (Warna Utama Brand)     : #101869
- Rust (Warna Aksen & Aksi)     : #C3503B
- Paper Light (Latar Belakang) : #F9F9FB
- Paper Dark / Ink (Teks Gelap): #1A1A24
- Border Subtle (Garis Batas)  : #E2E8F0


5. STRUKTUR DIREKTORI PROYEK

NeperCode2/
│
├── public/
│   ├── images/
│   │   └── kegiatan/             <- Foto dokumentasi kegiatan organisasi
│   └── logos/
│       ├── logo-divisi/          <- Logo departemen & lembaga
│       ├── logo-himasantika-umc.png
│       ├── gmail.svg
│       ├── whatsapp.svg
│       └── google-maps.svg
│
├── src/
│   └── app/
│       ├── components/
│       │   ├── reactbits/        <- Komponen animasi (Silk, DriftWall, dll.)
│       │   ├── About.js          <- Modul Profil Tentang Organisasi
│       │   ├── Activities.js     <- Modul Program Kerja & Kegiatan
│       │   ├── Contact.js        <- Modul Kontak & Google Maps
│       │   ├── Footer.js         <- Navigasi Bawah & Hak Cipta
│       │   ├── Gallery.js        <- Modul Galeri DriftWall 3D
│       │   ├── Hero.js           <- Modul Hero Beranda WebGL
│       │   ├── LenisProvider.js  <- Provider Smooth Scrolling Global
│       │   ├── Navbar.js         <- Navigasi Atas (Clean URL Routing)
│       │   └── Structure.js      <- Modul Struktur BPH & Departemen
│       │
│       ├── galeri/page.js        <- Rute halaman: /galeri
│       ├── kegiatan/page.js      <- Rute halaman: /kegiatan
│       ├── kontak/page.js        <- Rute halaman: /kontak
│       ├── struktur/page.js      <- Rute halaman: /struktur
│       ├── tentang/page.js       <- Rute halaman: /tentang
│       ├── globals.css           <- CSS Global, Tailwind v4, Reset Scrollbar
│       ├── layout.js             <- Root Layout & Metadata
│       └── page.js               <- Halaman Beranda Utama (/)
│
├── package.json                  <- Konfigurasi Dependensi & Script
├── dokumentasi.md                <- Dokumentasi teks untuk dibaca di editor (VS Code)
└── README.md                     <- Dokumentasi untuk GitHub


6. PANDUAN INSTALASI & PENGGUNAAN

Prasyarat:
- Node.js versi 18.18.0 atau lebih baru (disarankan Node.js 20 LTS).
- Manajer paket npm / pnpm / yarn / bun.

Langkah Pemasangan:
1. Buka terminal dan masuk ke folder proyek:
   cd NeperCode2

2. Pasang dependensi yang dibutuhkan:
   npm install

3. Jalankan server pengembangan lokal:
   npm run dev

4. Buka peramban web di alamat:
   http://localhost:3000

Kompilasi Produksi:
Untuk membuat build produksi yang telah teroptimasi:
   npm run build
   npm run start


7. REKAYASA & OPTIMASI PERFORMA

1. Penangguhan Render WebGL (IntersectionObserver):
   Komponen berat seperti Silk (Hero), DriftWall (Galeri), dan SpecularButton (Kontak) otomatis berhenti me-render frame saat tidak terlihat di layar. Hal ini menghemat beban GPU hingga mendekati 0% saat tidak aktif.

2. Pencegahan Forced Reflow:
   Animasi interaktif VariableProximity tidak lagi memanggil getBoundingClientRect() setiap frame, melainkan menggunakan sistem koordinat yang di-cache dan dijadwalkan via requestAnimationFrame.

3. Navigasi Rute Bersih (Clean Route Navigation):
   Semua menu navigasi menggunakan rute URL bersih (/tentang, /struktur, /kontak) terintegrasi dengan window.history.pushState dan smooth scroll tanpa reload.

4. Layout Penuh Edge-to-Edge:
   Scrollbar gutter dinonaktifkan secara global sehingga seluruh visual membentang 100% penuh dan rapat ke tepi layar tanpa menyisakan celah garis putih.


8. PENGEMBANG & INFORMASI RESMI

- Pengembang (Developer) : NeperCode2
- Organisasi             : Himpunan Mahasiswa Teknik Informatika (HIMASANTIKA)
- Fakultas / Kampus      : Fakultas Teknik, Universitas Muhammadiyah Cirebon
- Alamat Sekretariat     : Jl. Fatahillah No. 40 Watubelah, Sumber, Kabupaten Cirebon, Jawa Barat 45611
- Surel Resmi            : himasantika@umc.ac.id
- WhatsApp               : 085795483927
- Instagram              : @himasantika_umc
- TikTok                 : @himasantika_umc

Hak Cipta (c) 2026 HIMASANTIKA Universitas Muhammadiyah Cirebon & NeperCode2.
Seluruh hak cipta dilindungi undang-undang.

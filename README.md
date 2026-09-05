# Portal Web Resmi HIMASANTIKA UMC

Portal web dan profil organisasi resmi **Himpunan Mahasiswa Teknik Informatika (HIMASANTIKA)**, Fakultas Teknik, Universitas Muhammadiyah Cirebon.

Dirancang dan dikembangkan oleh **NeperCode2**.

---

## Ringkasan Teknis

Aplikasi ini dibangun menggunakan arsitektur web modern berbasis **Next.js 16 (App Router)**, **React 19**, dan **Tailwind CSS v4**. Sistem mengintegrasikan *pipeline* grafis interaktif berbasis WebGL (**Three.js** dan **OGL**), modul animasi fisika (**GSAP** dan **Motion**), serta mesin *smooth scrolling* perangkat keras (**Lenis**) yang dioptimalkan untuk efisiensi beban komputasi CPU dan GPU.

---

## Modul Arsitektur dan Pemetaan Rute

| Modul | Jalur Rute | Komponen Grafis & Interaktif | Deskripsi Fungsional |
|---|---|---|---|
| **Beranda** | `/` | `Silk` (Three.js WebGL) + `WarpText` + `ScrollReveal` | Bagian utama (*hero section*) dengan simulasi kain sutra WebGL interaktif, distorsi tipografi reaktif pointer, dan transisi teks berbasis posisi gulir. |
| **Tentang** | `/tentang` | `TrueFocus` + `BlurText` + `ProfileCard` (3D Tilt) | Informasi profil organisasi, visi, status lembaga eksekutif, komitmen Catur Dharma Perguruan Tinggi, dan sekretariat. |
| **Struktur** | `/struktur` | `VariableProximity` + `ChromaGrid` + `MagicBento` | Visualisasi hierarki Badan Pengurus Harian (BPH) dan 8 Lembaga/Departemen dengan efek pencahayaan partikel radial. |
| **Kegiatan** | `/kegiatan` | `DecryptedText` + `TargetCursor` | Rangkaian program kerja unggulan, kaderisasi mahasiswa, dan kegiatan akademik dengan pelacak kursor visual. |
| **Galeri** | `/galeri` | `MaskedHeading` (GSAP) + `DriftWall` (3D Perspective) | Galeri dokumentasi melayang 3D multi-kolom dengan tipografi judul bertekstur foto (*image-masked*). |
| **Kontak** | `/kontak` | `SplitFlapText` + `SpecularButton` (OGL Shader) | Kartu kanal komunikasi resmi (Gmail, WhatsApp, Instagram, TikTok), peta lokasi kampus terintegrasi, dan tombol *specular shader*. |

---

## Tumpukan Teknologi (Tech Stack)

### 1. Kerangka Kerja Utama & Lingkungan Eksekusi
- **Kerangka Kerja**: Next.js 16 (App Router & Turbopack Bundler)
- **Pustaka Antarmuka**: React 19
- **Arsitektur Gaya**: Tailwind CSS v4

### 2. Grafis, Shader WebGL & Animasi
- **Ekosistem Three.js**: `three`, `@react-three/fiber`, `@react-three/drei` (Simulasi WebGL latar beranda)
- **Mesin Shader Ringan**: `ogl` (Shader WebGL untuk efek refleksi cahaya tombol)
- **Mesin Animasi & Fisika**: `gsap`, `motion` (Framer Motion), `animejs`
- **Akselerasi Pengguliran**: `lenis` (Mesin pengguliran mulus berbasis perangkat keras)

### 3. Tipografi & Aset
- Google Fonts (`Poppins`, `Inter`, `Roboto Flex`) dimuat melalui modul `@next/font`

---

## Token Sistem Desain

Aplikasi mengimplementasikan palet warna resmi organisasi secara konsisten:

- **Navy (Warna Utama)**: `#101869`
- **Rust (Warna Aksen & Aksi)**: `#C3503B`
- **Paper Light (Latar Belakang Terang)**: `#F9F9FB`
- **Paper Dark / Ink (Teks & Elemen Gelap)**: `#1A1A24`
- **Border Subtle (Garis Batas Halus)**: `#E2E8F0`

---

## Struktur Direktori Proyek

```text
NeperCode2/
├── public/
│   ├── images/
│   │   └── kegiatan/          # Berkas aset foto dokumentasi kegiatan
│   └── logos/
│       ├── logo-divisi/       # Berkas lambang resmi lembaga & departemen
│       ├── logo-himasantika-umc.png
│       ├── gmail.svg
│       ├── whatsapp.svg
│       └── google-maps.svg
├── src/
│   └── app/
│       ├── components/
│       │   ├── reactbits/     # Pustaka komponen animasi & WebGL internal
│       │   ├── About.js       # Komponen modul profil organisasi
│       │   ├── Activities.js  # Komponen modul program kerja & kegiatan
│       │   ├── Contact.js     # Komponen modul kanal kontak & peta
│       │   ├── Footer.js      # Komponen navigasi bawah & hak cipta
│       │   ├── Gallery.js     # Komponen modul galeri dokumentasi 3D
│       │   ├── Hero.js        # Komponen modul beranda WebGL utama
│       │   ├── LenisProvider.js # Modul penyedia smooth scroll global
│       │   ├── Navbar.js      # Komponen navigasi atas dengan clean routing
│       │   └── Structure.js   # Komponen modul struktur kepengurusan
│       ├── galeri/page.js     # Titik akhir rute mandiri: /galeri
│       ├── kegiatan/page.js   # Titik akhir rute mandiri: /kegiatan
│       ├── kontak/page.js     # Titik akhir rute mandiri: /kontak
│       ├── struktur/page.js   # Titik akhir rute mandiri: /struktur
│       ├── tentang/page.js    # Titik akhir rute mandiri: /tentang
│       ├── globals.css        # Konfigurasi Tailwind CSS v4 & reset viewport
│       ├── layout.js          # Tata letak HTML root & konfigurasi metadata
│       └── page.js            # Titik akhir rute beranda utama: /
├── package.json
└── README.md
```

---

## Panduan Instalasi dan Penggunaan

### Prasyarat Sistem
- **Node.js**: Versi `18.18.0` atau yang lebih baru (disarankan Node.js 20 LTS)
- **Manajer Paket**: `npm`, `pnpm`, `yarn`, atau `bun`

### Langkah Pemasangan

1. Klon repositori dan masuk ke direktori utama proyek:
```bash
cd NeperCode2
```

2. Pasang seluruh dependensi proyek:
```bash
npm install
```

### Menjalankan Server Pengembangan

Jalankan server lokal dengan fitur *Hot Module Replacement* (HMR):
```bash
npm run dev
```
Buka peramban web dan akses alamat: `http://localhost:3000`.

### Kompilasi untuk Lingkungan Produksi

Untuk mengompilasi dan mengoptimalkan aplikasi sebelum diterapkan ke server produksi:
```bash
npm run build
npm run start
```

---

## Rekayasa dan Optimasi Performa

1. **Penangguhan Render WebGL Berbasis Viewport**:
   - Komponen WebGL dan animasi kontinu pada `Silk`, `DriftWall`, dan `SpecularButton` dilengkapi pengawas `IntersectionObserver` yang secara otomatis menghentikan (*pause*) siklus frame saat elemen berada di luar layar, menekan penggunaan daya komputasi GPU hingga mendekati 0% saat tidak aktif.
2. **Pencegahan Forced Reflow / Layout Thrashing**:
   - Menghilangkan kalkulasi ulang tata letak DOM yang berulang pada interaksi kursor dengan menerapkan *coordinate caching* dan penjadwalan pembaruan visual melalui `requestAnimationFrame`.
3. **Sinkronisasi Rute Bersih (Clean Route Navigation)**:
   - Sistem navigasi memanfaatkan HTML5 History API (`window.history.pushState`) terintegrasi dengan transisi gulir halus, menyediakan format URL bersih tanpa tanda pagar (`/tentang`, `/struktur`, `/kontak`) serta mendukung akses tautan langsung.
4. **Perataan Tampilan Edge-to-Edge**:
   - Menghapus celah bawaan *scrollbar gutter* peramban pada tingkat global untuk memastikan tampilan kanvas mengisi 100% lebar layar secara presisi tanpa garis sisa.

---

## Pengembang dan Atribusi

- **Pengembang (Developer)**: **NeperCode2**
- **Klien / Organisasi**: Himpunan Mahasiswa Teknik Informatika (HIMASANTIKA), Universitas Muhammadiyah Cirebon
- **Alamat Sekretariat**: Jl. Fatahillah No. 40 Watubelah, Sumber, Kabupaten Cirebon, Jawa Barat 45611
- **Kanal Surel Resmi**: `himasantika@umc.ac.id`

---

## Hak Cipta dan Lisensi

Hak Cipta (c) 2026 HIMASANTIKA Universitas Muhammadiyah Cirebon & NeperCode2. Seluruh hak cipta dilindungi undang-undang.

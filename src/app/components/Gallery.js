"use client";

import Image from "next/image";

const GALLERY_PHOTOS = [
  {
    src: "/images/kegiatan/Mengenal Organisasi Teknik Informatika 2025.jpg",
    title: "Orientasi Mahasiswa Informatika 2025",
    tag: "Kaderisasi",
  },
  {
    src: "/images/kegiatan/Studi Banding HIMASANTIKA UMC X HIMA-TI UNIKU-1.jpg",
    title: "Studi Banding HIMASANTIKA X HIMA-TI UNIKU",
    tag: "Studi Banding",
  },
  {
    src: "/images/kegiatan/Studi Banding HIMASANTIKA UMC X HIMA-TI UNIKU-2.jpg",
    title: "Diskusi & Sharing Session Hima-TI",
    tag: "Studi Banding",
  },
  {
    src: "/images/kegiatan/Studi Banding HIMASANTIKA UMC X HIMA-TI UNIKU-3.jpg",
    title: "Penyerahan Cenderamata Inter-Kampus",
    tag: "Kolaborasi",
  },
  {
    src: "/images/kegiatan/Bukber dan Family Gathering-1.jpg",
    title: "Family Gathering & Bukber HIMASANTIKA",
    tag: "Kebersamaan",
  },
  {
    src: "/images/kegiatan/Bukber dan Family Gathering-2.jpg",
    title: "Silaturahmi Demisioner & Pengurus",
    tag: "Kebersamaan",
  },
];

export default function Gallery() {
  return (
    <section id="galeri" className="py-24 lg:py-32 bg-[#F9F9FB] relative">
      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C3503B] block mb-3">
            GALERI FOTO
          </span>
          <h2 className="display-lg text-[#101869] mb-4">
            Dokumentasi Kegiatan
          </h2>
          <p className="text-base sm:text-lg text-[#525264] leading-relaxed">
            Momen kebersamaan, kolaborasi, dan jejak langkah HIMASANTIKA UMC.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] bg-gray-200 cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101869]/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#C3503B] mb-1">
                  {item.tag}
                </span>
                <h3 className="text-sm sm:text-base font-bold leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

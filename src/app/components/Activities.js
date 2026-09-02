"use client";

import Image from "next/image";

const ACTIVITIES = [
  {
    title: "Mengenal Organisasi Teknik Informatika 2025",
    category: "Kaderisasi",
    desc: "Program pengenalan organisasi bagi mahasiswa baru S1 Teknik Informatika UMC.",
    image: "/images/kegiatan/Mengenal Organisasi Teknik Informatika 2025.jpg",
  },
  {
    title: "Studi Banding HIMASANTIKA X HIMA-TI UNIKU",
    category: "Hubungan Eksternal",
    desc: "Pertukaran wawasan dan tata kelola himpunan mahasiswa Teknik Informatika.",
    image: "/images/kegiatan/Studi Banding HIMASANTIKA UMC X HIMA-TI UNIKU-1.jpg",
  },
  {
    title: "Bukber & Family Gathering HIMASANTIKA",
    category: "Internal & Alumni",
    desc: "Ajang silaturahmi mempererat keakraban pengurus, demisioner, dan alumni.",
    image: "/images/kegiatan/Bukber dan Family Gathering-1.jpg",
  },
  {
    title: "Workshop & Seminar Profesi IT",
    category: "Akademik",
    desc: "Pelatihan teknis intensif bidang web, mobile, AI, dan jaringan komputer.",
    image: "/images/kegiatan/Studi Banding HIMASANTIKA UMC X HIMA-TI UNIKU-2.jpg",
  },
];

export default function Activities() {
  return (
    <section id="kegiatan" className="py-24 lg:py-32 bg-white relative">
      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C3503B] block mb-3">
            PROGRAM KERJA
          </span>
          <h2 className="display-lg text-[#101869] mb-4">
            Kegiatan Utama
          </h2>
          <p className="text-base sm:text-lg text-[#525264] leading-relaxed">
            Rangkaian aktivitas akademik, keahlian profesi, dan pengabdian mahasiswa.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {ACTIVITIES.map((act, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-[#E2E8F0] overflow-hidden bg-[#F9F9FB] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#101869] text-white shadow-sm">
                    {act.category}
                  </span>
                </div>
              </div>

              <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#101869] mb-2 group-hover:text-[#C3503B] transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525264] leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

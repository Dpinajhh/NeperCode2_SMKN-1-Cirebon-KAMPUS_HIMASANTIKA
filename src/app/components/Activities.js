"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const DecryptedText = dynamic(() => import("./reactbits/DecryptedText"), { ssr: false });
const TargetCursor = dynamic(() => import("./reactbits/TargetCursor"), { ssr: false });

const ACTIVITIES = [
  {
    title: "Mengenal Organisasi Teknik Informatika 2025",
    desc: "Program pengenalan kultur, nilai, dan arah gerak organisasi bagi mahasiswa baru S1 Teknik Informatika Umc.",
    image: "/images/kegiatan/Mengenal Organisasi Teknik Informatika 2025.jpg",
  },
  {
    title: "Kajian Public Speaking Himasantika 2025 - Sesi 1",
    desc: "Pelatihan komunikasi efektif, teknik berbicara di depan umum, dan membangun rasa percaya diri bagi mahasiswa.",
    image: "/images/kegiatan/Kajian Public Speaking HIMASANTIKA 2025.png",
  },
  {
    title: "Studi Banding Himasantika Umc X Hima-Ti Uniku",
    desc: "Program pertukaran wawasan, kolaborasi, dan studi tata kelola organisasi himpunan mahasiswa.",
    image: "/images/kegiatan/Kajian Public Speaking HIMASANTIKA 2025 - 2.png",
  },
  {
    title: "Open Recruitment Himasantika",
    desc: "Perekrutan pengurus dan anggota baru untuk melanjutkan tongkat estafet kepemimpinan himpunan.",
    image: "/images/kegiatan/Open Recruitmen HIMASANTIKA.png",
  },
];

export default function Activities() {
  return (
    <section id="kegiatan" className="py-24 lg:py-32 bg-white relative">
      {/* Target Cursor Component */}
      <TargetCursor
        targetSelector=".cursor-target"
        containerSelector="#kegiatan"
        spinDuration={2}
        cursorColor="#101869"
        cursorColorOnTarget="#C3503B"
        hoverDuration={0.2}
        parallaxOn={true}
      />

      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="display-lg text-[#101869] mb-4">
            <DecryptedText
              text="Kegiatan Utama"
              animateOn="view"
              speed={60}
              maxIterations={15}
              className="text-[#101869]"
              encryptedClassName="text-[#C3503B]"
            />
          </h2>
          <div>
            <DecryptedText
              text="Rangkaian aktivitas akademik, keahlian profesi, dan pengabdian mahasiswa."
              animateOn="view"
              speed={30}
              maxIterations={12}
              className="text-base sm:text-lg text-[#525264] leading-relaxed"
              encryptedClassName="text-base sm:text-lg text-[#101869]/40 leading-relaxed"
            />
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {ACTIVITIES.map((act, idx) => (
            <div
              key={idx}
              className="cursor-target rounded-[32px] border border-[#E2E8F0]/60 overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-start">
                <h3 className="text-xl font-bold text-[#101869] mb-3 group-hover:text-[#C3503B] transition-colors leading-tight">
                  {act.title}
                </h3>
                <p className="text-sm text-[#525264] leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


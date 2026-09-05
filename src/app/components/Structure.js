"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { BentoParticleCard } from "./reactbits/MagicBento";

const VariableProximity = dynamic(() => import("./reactbits/VariableProximity"), { ssr: false });
const TextType = dynamic(() => import("./reactbits/TextType"), { ssr: false });
const ChromaGrid = dynamic(() => import("./reactbits/ChromaGrid"), { ssr: false });
const MagicBentoGrid = dynamic(() => import("./reactbits/MagicBento"), { ssr: false });

const BPH_ROLES = [
  { role: "Bupati", desc: "Pimpinan tertinggi pelaksana arah gerak organisasi Himasantika." },
  { role: "Wakil Bupati", desc: "Pendamping & perwakilan Bupati dalam koordinasi kerja." },
  { role: "Sekretaris Umum", desc: "Penanggung jawab penuh tata kelola administrasi & inventaris." },
  { role: "Wakil Sekretaris", desc: "Membantu tugas sekretariat & notulensi rapat organisasi." },
  { role: "Bendahara Umum", desc: "Mengelola transparansi sirkulasi keuangan & iuran himpunan." },
  { role: "Wakil Bendahara", desc: "Membantu pengelolaan & pelaporan keuangan operasional." },
];

const DEPARTMENTS = [
  { name: "Lembaga Advokasi", logo: "/logos/logo-divisi/lembaga advokasi.png", tasks: ["Koordinasi kosma angkatan", "Menyalurkan aspirasi ke Kaprodi", "Evaluasi berkala aspirasi"] },
  { name: "Lembaga Minat Bakat", logo: "/logos/logo-divisi/Lembaga Minat Bakat.png", tasks: ["Pengembangan potensi bakat", "Pendataan bakat bidang IT", "Fasilitasi partisipasi lomba"] },
  { name: "Dept. Kaderisasi", logo: "/logos/logo-divisi/Departemen Kaderisasi.png", tasks: ["Penyusunan SOP kaderisasi", "Pelaksanaan kaderisasi maba", "Peningkatan mutu kepemimpinan"] },
  { name: "Dept. Dokominfo", fullName: "Dokumentasi & Informasi", logo: "/logos/logo-divisi/Departemen Dokominfo.png", tasks: ["Pengelolaan media publikasi", "Dokumentasi resmi kegiatan", "Penerbitan KTP Pengurus"] },
  { name: "Dept. PO", fullName: "Pengembangan Organisasi", logo: "/logos/logo-divisi/Departemen PO.png", tasks: ["Evaluasi kinerja & AD/ART", "Penerapan SOP organisasi", "Kajian tata kelola internal"] },
  { name: "Dept. Dikmas", fullName: "Pendidikan Mahasiswa", logo: "/logos/logo-divisi/Departemen Dikmas.png", tasks: ["Sinergi akademik Kaprodi", "Penyelenggaraan workshop/bootcamp"] },
  { name: "Dept. Hubeksos", fullName: "Hubungan Eksternal", logo: "/logos/logo-divisi/Departemen Hubeksos.png", tasks: ["Pengabdian masyarakat", "Jejaring PERMIKOMNAS & Ormawa"] },
  { name: "Dept. Bismit", fullName: "Bisnis & Kemitraan", logo: "/logos/logo-divisi/Departemen Bismit.png", tasks: ["Pengembangan kemitraan", "Badan usaha & pendanaan halal"] },
];

export default function Structure() {
  const containerRef = useRef(null);

  const chromaItems = BPH_ROLES.map((item) => ({
    title: item.role,
    subtitle: item.desc,
    gradient: "linear-gradient(145deg, #101869, #0a0f44)",
  }));

  return (
    <section id="struktur" className="py-24 lg:py-32 bg-[#F9F9FB] relative">
      <div className="section-inner" ref={containerRef}>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="display-lg text-[#101869] mb-4">
            <VariableProximity
              label="Pengurus & Divisi Himasantika"
              className="variable-proximity-demo"
              fromFontVariationSettings="'wght' 600, 'opsz' 9"
              toFontVariationSettings="'wght' 900, 'opsz' 40"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />
          </h2>
          <div className="h-14 sm:h-10">
            <TextType
              text={["Struktur yang teratur dan kolaboratif untuk menjalankan amanah mahasiswa S1 Teknik Informatika."]}
              typingSpeed={40}
              pauseDuration={3000}
              showCursor={true}
              loop={false}
              cursorCharacter="|"
              className="text-base sm:text-lg text-[#525264] leading-relaxed"
              startOnVisible={true}
            />
          </div>
        </div>

        {/* BPH */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#101869] mb-8 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#101869]" />
            Badan Pengurus Harian (BPH)
          </h3>
          <div className="w-full min-h-[260px]">
            <ChromaGrid items={chromaItems} radius={250} damping={0.45} fadeOut={0.6} />
          </div>
        </div>

        {/* Lembaga & Departemen */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[#101869] mb-8 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C3503B]" />
            Lembaga & Departemen
          </h3>
          
          <MagicBentoGrid
            glowColor="195, 80, 59"
            spotlightRadius={280}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEPARTMENTS.map((dept, idx) => (
                <BentoParticleCard
                  key={idx}
                  glowColor={idx % 2 === 0 ? "195, 80, 59" : "16, 24, 105"}
                  particleCount={8}
                  enableTilt={true}
                  clickEffect={true}
                  className="p-6 rounded-[28px] bg-white border border-[#E2E8F0]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-5 relative z-10">
                      <div className="w-14 h-14 flex items-center justify-center p-2 rounded-2xl bg-[#F9F9FB] border border-[#E2E8F0] transition-transform">
                        <Image src={dept.logo} alt={dept.name} width={48} height={48} className="object-contain max-h-10" />
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-[#101869] mb-3 relative z-10">{dept.name}</h4>
                  </div>
                  <ul className="space-y-1.5 mt-auto relative z-10">
                    {dept.tasks.map((task, tidx) => (
                      <li key={tidx} className="text-[13px] text-[#525264] leading-relaxed">
                        {task}
                      </li>
                    ))}
                  </ul>
                </BentoParticleCard>
              ))}
            </div>
          </MagicBentoGrid>
        </div>

      </div>
    </section>
  );
}

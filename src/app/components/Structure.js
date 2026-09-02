"use client";

import Image from "next/image";

const BPH_ROLES = [
  { role: "Bupati", desc: "Pimpinan tertinggi pelaksana arah gerak organisasi HIMASANTIKA." },
  { role: "Wakil Bupati", desc: "Pendamping & perwakilan Bupati dalam koordinasi kerja." },
  { role: "Sekretaris Umum", desc: "Penanggung jawab penuh tata kelola administrasi & inventaris." },
  { role: "Wakil Sekretaris", desc: "Membantu tugas sekretariat & notulensi rapat organisasi." },
  { role: "Bendahara Umum", desc: "Mengelola transparansi sirkulasi keuangan & iuran himpunan." },
  { role: "Wakil Bendahara", desc: "Membantu pengelolaan & pelaporan keuangan operasional." },
];

const DEPARTMENTS = [
  {
    name: "Lembaga Advokasi",
    logo: "/logos/logo-divisi/lembaga advokasi.png",
    tasks: ["Koordinasi kosma angkatan", "Menyalurkan aspirasi ke Kaprodi", "Evaluasi berkala aspirasi"],
  },
  {
    name: "Lembaga Minat Bakat",
    logo: "/logos/logo-divisi/Lembaga Minat Bakat.png",
    tasks: ["Pengembangan potensi bakat", "Pendataan bakat bidang IT", "Fasilitasi partisipasi lomba"],
  },
  {
    name: "Dept. Kaderisasi",
    logo: "/logos/logo-divisi/Departemen Kaderisasi.png",
    tasks: ["Penyusunan SOP kaderisasi", "Pelaksanaan kaderisasi maba", "Peningkatan mutu kepemimpinan"],
  },
  {
    name: "Dept. Dokominfo",
    fullName: "Dokumentasi & Informasi",
    logo: "/logos/logo-divisi/Departemen Dokominfo.png",
    tasks: ["Pengelolaan media publikasi", "Dokumentasi resmi kegiatan", "Penerbitan KTP Pengurus"],
  },
  {
    name: "Dept. PO",
    fullName: "Pengembangan Organisasi",
    logo: "/logos/logo-divisi/Departemen PO.png",
    tasks: ["Evaluasi kinerja & AD/ART", "Penerapan SOP organisasi", "Kajian tata kelola internal"],
  },
  {
    name: "Dept. Dikmas",
    fullName: "Pendidikan Mahasiswa",
    logo: "/logos/logo-divisi/Departemen Dikmas.png",
    tasks: ["Sinergi akademik Kaprodi", "Penyelenggaraan workshop/bootcamp"],
  },
  {
    name: "Dept. Hubeksos",
    fullName: "Hubungan Eksternal",
    logo: "/logos/logo-divisi/Departemen Hubeksos.png",
    tasks: ["Pengabdian masyarakat", "Jejaring PERMIKOMNAS & Ormawa"],
  },
  {
    name: "Dept. Bismit",
    fullName: "Bisnis & Kemitraan",
    logo: "/logos/logo-divisi/Departemen Bismit.png",
    tasks: ["Pengembangan kemitraan", "Badan usaha & pendanaan halal"],
  },
];

export default function Structure() {
  return (
    <section id="struktur" className="py-24 lg:py-32 bg-[#F9F9FB] relative">
      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C3503B] block mb-3">
            STRUKTUR ORGANISASI
          </span>
          <h2 className="display-lg text-[#101869] mb-4">
            Pengurus & Divisi HIMASANTIKA
          </h2>
          <p className="text-base sm:text-lg text-[#525264] leading-relaxed">
            Struktur yang teratur dan kolaboratif untuk menjalankan amanah mahasiswa S1 Teknik Informatika.
          </p>
        </div>

        {/* BPH */}
        <div className="mb-20">
          <h3 className="text-lg font-bold text-[#101869] mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#101869]" />
            Badan Pengurus Harian (BPH)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BPH_ROLES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#101869]/30 transition-all"
              >
                <div className="text-base font-bold text-[#101869] mb-2">{item.role}</div>
                <p className="text-xs sm:text-sm text-[#525264] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lembaga & Departemen */}
        <div>
          <h3 className="text-lg font-bold text-[#101869] mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C3503B]" />
            Lembaga & Departemen
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPARTMENTS.map((dept, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="relative w-14 h-14 mb-4 flex items-center justify-center p-2 rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-105 transition-transform">
                    <Image
                      src={dept.logo}
                      alt={dept.name}
                      width={48}
                      height={48}
                      className="object-contain max-h-10"
                    />
                  </div>
                  <h4 className="text-base font-bold text-[#101869] mb-1">{dept.name}</h4>
                  {dept.fullName && (
                    <p className="text-[11px] text-[#C3503B] font-medium mb-3">{dept.fullName}</p>
                  )}
                  <ul className="space-y-1.5 mt-3">
                    {dept.tasks.map((task, tidx) => (
                      <li key={tidx} className="text-xs text-[#525264] flex items-start gap-1.5 leading-normal">
                        <span className="text-[#C3503B]">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

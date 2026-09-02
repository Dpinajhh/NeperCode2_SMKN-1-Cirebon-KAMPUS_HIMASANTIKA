"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="tentang" className="py-24 lg:py-32 bg-white relative">
      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C3503B] block mb-3">
            TENTANG KAMI
          </span>
          <h2 className="display-lg text-[#101869] mb-6">
            Membangun Karakter & Keahlian Teknologi
          </h2>
          <p className="text-base sm:text-lg text-[#525264] leading-relaxed">
            HIMASANTIKA adalah himpunan mahasiswa intra perguruan tinggi di bawah naungan 
            BEM-FT Universitas Muhammadiyah Cirebon, yang menjadi ruang bertumbuh bagi 
            mahasiswa S1 Teknik Informatika sejak 13 September 2012.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-8">
            <div className="p-8 rounded-3xl bg-[#F9F9FB] border border-[#E2E8F0] space-y-4">
              <h3 className="text-xl font-bold text-[#101869]">
                Tujuan Utama
              </h3>
              <p className="text-sm sm:text-base text-[#525264] leading-relaxed italic">
                &ldquo;Terbinanya insan akademis, pencipta, dan pengabdi sebagai perwujudan Catur Dharma Perguruan Tinggi serta sadar akan hak, kewajiban, dan tanggung jawabnya.&rdquo;
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#F9F9FB] border border-[#E2E8F0]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C3503B] mb-1">
                  Status
                </div>
                <div className="text-sm font-semibold text-[#101869]">
                  Lembaga Eksekutif Kooperatif BEM-FT UMC
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#F9F9FB] border border-[#E2E8F0]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C3503B] mb-1">
                  Sekretariat
                </div>
                <div className="text-sm font-semibold text-[#101869]">
                  Kampus 1 UMC Cirebon
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-gray-100">
              <Image
                src="/images/kegiatan/Mengenal Organisasi Teknik Informatika 2025.jpg"
                alt="Kegiatan HIMASANTIKA UMC"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

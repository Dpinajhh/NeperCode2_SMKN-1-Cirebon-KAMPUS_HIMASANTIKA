"use client";

import dynamic from "next/dynamic";

const TrueFocus = dynamic(() => import('./reactbits/TrueFocus'), { ssr: false });
const BlurText = dynamic(() => import('./reactbits/BlurText'), { ssr: false });
const ProfileCard = dynamic(() => import('./reactbits/ProfileCard'), { ssr: false });

export default function About() {
  return (
    <section id="tentang" className="py-24 lg:py-32 bg-white relative">
      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-10">
            <TrueFocus
              sentence="Membangun Karakter & Keahlian Teknologi"
              manualMode={false}
              blurAmount={4}
              borderColor="#101869"
              glowColor="rgba(16, 24, 105, 0.3)"
              animationDuration={0.8}
              pauseBetweenAnimations={0.2}
              className="display-lg text-[#101869]"
            />
          </div>
          <BlurText
            text="Himasantika adalah himpunan mahasiswa intra perguruan tinggi di bawah naungan Bem-Ft Universitas Muhammadiyah Cirebon. Sejak 13 September 2012, kami menjadi ruang bertumbuh bagi mahasiswa S1 Teknik Informatika untuk mengembangkan potensi akademik maupun non-akademik."
            delay={30}
            direction="top"
            className="text-lg text-[#525264] leading-relaxed"
          />
        </div>

        {/* Highlight Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-5 space-y-5">
            {/* Tujuan Utama Card */}
            <div className="p-8 rounded-[32px] bg-white border border-[#E2E8F0]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
              <h3 className="text-2xl font-bold text-[#101869] mb-3">
                Tujuan Utama
              </h3>
              <p className="text-[#525264] leading-relaxed">
                Terbinanya insan akademis, pencipta, dan pengabdi sebagai perwujudan Catur Dharma Perguruan Tinggi serta sadar akan hak, kewajiban, dan tanggung jawabnya.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Status Card */}
              <div className="p-6 rounded-[28px] bg-white border border-[#E2E8F0]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
                <h3 className="text-lg font-bold text-[#101869] mb-1">
                  Status
                </h3>
                <p className="text-sm text-[#525264] font-medium leading-relaxed">
                  Lembaga Eksekutif
                </p>
              </div>

              {/* Sekretariat Card */}
              <div className="p-6 rounded-[28px] bg-white border border-[#E2E8F0]/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
                <h3 className="text-lg font-bold text-[#101869] mb-1">
                  Sekretariat
                </h3>
                <p className="text-sm text-[#525264] font-medium leading-relaxed">
                  Kampus 1 Umc
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative flex justify-end">
            <div className="w-full h-full min-h-[300px]">
              <ProfileCard
                avatarUrl="/images/kegiatan/foto bersama umc.png"
                showUserInfo={false}
                showDetails={false}
                enableTilt={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(16, 24, 105, 0.15)"
                className="!h-[400px] !max-h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

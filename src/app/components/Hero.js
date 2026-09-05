"use client";

import dynamic from "next/dynamic";

// Dynamic imports with ssr: false for WebGL / Canvas / GSAP ReactBits components
const Silk = dynamic(() => import("./reactbits/Silk"), { ssr: false });
const WarpText = dynamic(() => import("./reactbits/WarpText"), { ssr: false });
const ScrollReveal = dynamic(() => import("./reactbits/ScrollReveal"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16"
      style={{ background: "#0d1470", overflow: "hidden" }}
    >
      {/* Full-screen Silk Canvas (Primary Blue) */}
      <Silk
        color="#101869"
        speed={4.5}
        scale={1.2}
        noiseIntensity={1.5}
        rotation={0.2}
        lightMode={false}
      />

      <div className="section-inner w-full relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        {/* ReactBits WarpText Title — white on dark silk */}
        <div className="w-full flex justify-center mb-6">
          <WarpText
            text={`Himpunan Mahasiswa\nTeknik Informatika Umc`}
            color="#FFFFFF"
            warpStrength={0.08}
            warpScale={1.6}
            speed={0.5}
            pointerInfluence={0.45}
            pointerStrength={0.38}
            refraction={0.016}
            ripple={true}
            fontSize="clamp(2.4rem, 6vw, 4.8rem)"
            fontWeight={800}
            lineHeight={1.05}
            letterSpacing="-0.04em"
            style={{ height: "260px" }}
          />
        </div>

        {/* ReactBits ScrollReveal Description — white/soft on dark silk */}
        <div className="max-w-2xl mx-auto mt-4">
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            blurStrength={8}
            textClassName="text-center font-medium text-white/75"
          >
            Wadah aspirasi, inovasi teknologi, dan pengembangan karakter kepemimpinan mahasiswa S1 Teknik Informatika Universitas Muhammadiyah Cirebon.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";

const DriftWall = dynamic(() => import("./reactbits/DriftWall"), { ssr: false });
const MaskedHeading = dynamic(() => import("./reactbits/MaskedHeading"), { ssr: false });

const GALLERY_PHOTOS = [
  {
    image: "/images/kegiatan/Foto Bersama Menyambut Bulan Suci Ramadhan.png",
    title: "Foto Bersama Menyambut Bulan Suci Ramadhan",
  },
  {
    image: "/images/kegiatan/Bukber dan Family Gathering-2.jpg",
    title: "Bukber & Family Gathering Himasantika - Sesi 2",
  },
  {
    image: "/images/kegiatan/Bukber dan Family Gathering-1.jpg",
    title: "Bukber & Family Gathering Himasantika - Sesi 1",
  },
  {
    image: "/images/kegiatan/Studi Banding HIMASANTIKA UMC X HIMA-TI UNIKU-2.jpg",
    title: "Studi Banding Himasantika X Hima-Ti Uniku",
  },
  {
    image: "/images/kegiatan/Mengenal Organisasi Teknik Informatika 2025.jpg",
    title: "Mengenal Organisasi Teknik Informatika 2025",
  },
  {
    image: "/images/kegiatan/foto bersama umc.png",
    title: "Keluarga Besar Himasantika Umc",
  },
  {
    image: "/images/kegiatan/Kajian Public Speaking HIMASANTIKA 2025.png",
    title: "Kajian Public Speaking Himasantika 2025",
  },
  {
    image: "/images/kegiatan/Open Recruitmen HIMASANTIKA.png",
    title: "Open Recruitment Himasantika",
  },
  {
    image: "/images/kegiatan/Kajian Public Speaking HIMASANTIKA 2025 - 2.png",
    title: "Kajian Public Speaking Sesi 2",
  },
];

export default function Gallery() {
  return (
    <section id="galeri" className="py-24 lg:py-32 bg-[#F9F9FB] relative overflow-hidden">
      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="mb-4 inline-block max-w-full">
            <MaskedHeading
              text="Momen Kebersamaan"
              src="/images/kegiatan/foto bersama umc.png"
              align="left"
              fillScale={1.35}
              parallax={24}
              drift={14}
              brightness={1.05}
              saturation={1.1}
              reveal="rise"
              trigger="view"
              weight={800}
              textScale={0.075}
              className="display-lg text-[#101869]"
            />
          </div>
          <p className="text-base sm:text-lg text-[#525264] leading-relaxed">
            Potret kegiatan akademik, sosial, dan kekeluargaan Himasantika.
          </p>
        </div>

        {/* Drift Wall Container */}
        <div className="w-full h-[540px] sm:h-[640px] rounded-[32px] overflow-hidden border border-[#E2E8F0]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white relative">
          <DriftWall
            items={GALLERY_PHOTOS}
            columns={4}
            tileWidth={260}
            tileHeight={170}
            gap={20}
            radius={18}
            tilt={14}
            turn={-12}
            perspective={1100}
            depth={100}
            speed={36}
            direction="up"
            variance={0.42}
            parallax={0.5}
            lift={54}
            fade={0.5}
            dim={0.72}
            grayscale={false}
            overlayColor="#101869"
            pauseOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}


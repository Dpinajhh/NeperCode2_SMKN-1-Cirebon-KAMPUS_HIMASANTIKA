"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const SpecularButton = dynamic(() => import("./reactbits/SpecularButton"), { ssr: false });
const SplitFlapText = dynamic(() => import("./reactbits/SplitFlapText"), { ssr: false });

export default function Contact() {
  return (
    <section id="kontak" className="py-24 lg:py-32 bg-white relative">
      <div className="section-inner">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4">
            <SplitFlapText
              words={['HUBUNGI KAMI', 'KEMITRAAN IT', 'SUARA ASPIRASI']}
              flipDuration={0.12}
              stagger={0.05}
              cycleDelay={2600}
              flipsPerChar={6}
              tileColor="#101869"
              textColor="#ffffff"
              tileRadius={10}
              gap={6}
              fontSize="clamp(2rem, 4.5vw, 3.25rem)"
              loop={true}
              padTo={14}
            />
          </div>
          <p className="text-base sm:text-lg text-[#525264] leading-relaxed">
            Terhubung langsung dengan pengurus Himasantika untuk kemitraan, kolaborasi kegiatan, atau penyaluran aspirasi mahasiswa.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Info & Social Media */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Email & Phone Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Email Card with Real Official Gmail Logo */}
              <a
                href="mailto:himasantika@umc.ac.id"
                className="p-6 rounded-[28px] bg-[#F9F9FB] border border-[#E2E8F0]/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#101869]/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform">
                    <Image
                      src="/logos/gmail.svg"
                      alt="Google Gmail"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#525264] mb-1">Email Resmi</h3>
                  <p className="text-base font-bold text-[#101869] group-hover:text-[#C3503B] transition-colors break-all">
                    himasantika@umc.ac.id
                  </p>
                </div>
              </a>

              {/* Phone / WA Card with Real Official WhatsApp Logo */}
              <a
                href="https://wa.me/6285795483927"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-[28px] bg-[#F9F9FB] border border-[#E2E8F0]/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#25D366]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] shadow-sm flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform">
                    <Image
                      src="/logos/whatsapp.svg"
                      alt="WhatsApp"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#525264] mb-1">Telepon & WhatsApp</h3>
                  <p className="text-base font-bold text-[#101869] group-hover:text-[#25D366] transition-colors">
                    085795483927
                  </p>
                </div>
              </a>
            </div>

            {/* Social Media: Instagram & TikTok */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Instagram Card */}
              <a
                href="https://instagram.com/himasantika_umc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-[28px] bg-[#F9F9FB] border border-[#E2E8F0]/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#E1306C]/40 transition-all duration-300 group flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#525264]">Instagram</div>
                  <div className="text-sm font-bold text-[#101869] group-hover:text-[#C3503B] transition-colors">
                    @himasantika_umc
                  </div>
                </div>
              </a>

              {/* TikTok Card */}
              <a
                href="https://tiktok.com/@himasantika_umc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-[28px] bg-[#F9F9FB] border border-[#E2E8F0]/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-black/30 transition-all duration-300 group flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.86-4.51v-6.6a8.16 8.16 0 0 0 4.77 1.52v-3.9z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#525264]">TikTok</div>
                  <div className="text-sm font-bold text-[#101869] group-hover:text-[#C3503B] transition-colors">
                    @himasantika_umc
                  </div>
                </div>
              </a>
            </div>

            {/* Address Card with Real Official Google Maps Icon */}
            <a
              href="https://maps.app.goo.gl/p3Cq5nrVMHX16xP6A"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-[28px] bg-[#F9F9FB] border border-[#E2E8F0]/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#101869]/30 transition-all duration-300 group flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center shrink-0 p-2.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/logos/google-maps.svg"
                  alt="Google Maps"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <div className="pt-1">
                <p className="text-sm font-bold text-[#101869] group-hover:text-[#C3503B] transition-colors leading-relaxed">
                  Jl. Fatahillah No. 40 Watubelah, Sumber, Kab. Cirebon
                </p>
                <p className="text-xs text-[#525264] mt-1">
                  (Kampus 1: Jl. Tujuh Pahlawan Revolusi No. 70, Cirebon)
                </p>
              </div>
            </a>

          </div>

          {/* Right Column: Google Maps Interactive Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="h-full min-h-[380px] rounded-[32px] overflow-hidden border border-[#E2E8F0]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white flex flex-col">
              {/* Map Iframe */}
              <div className="relative w-full flex-1 min-h-[320px] bg-gray-100">
                <iframe
                  title="Lokasi Universitas Muhammadiyah Cirebon"
                  src="https://maps.google.com/maps?q=Universitas%20Muhammadiyah%20Cirebon%20Kampus%202%20Watubelah%20Jl.%20Fatahillah%20No.%2040&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Map Footer Bar with SpecularButton */}
              <div className="p-5 bg-white border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C3503B] animate-pulse" />
                  <span className="text-xs font-semibold text-[#101869]">
                    Universitas Muhammadiyah Cirebon (Umc)
                  </span>
                </div>
                <a
                  href="https://maps.app.goo.gl/p3Cq5nrVMHX16xP6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <SpecularButton
                    size="sm"
                    radius={14}
                    tint="#101869"
                    tintOpacity={1}
                    textColor="#ffffff"
                    lineColor="#C3503B"
                    baseColor="#0b114d"
                    intensity={1.2}
                    shineSize={16}
                    shineFade={35}
                    thickness={1.5}
                    followMouse={true}
                    proximity={200}
                    className="!py-2.5 !px-5 font-semibold text-xs shadow-md hover:scale-[1.02] transition-transform"
                  >
                    Buka di Google Maps
                  </SpecularButton>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



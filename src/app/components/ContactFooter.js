"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Share2 } from "lucide-react";

export default function ContactFooter() {
  return (
    <footer id="kontak" className="bg-[#1A1A24] text-white pt-20 pb-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#101869]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C3503B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-inner relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-md">
                <Image
                  src="/logos/logo-himasantika-umc.png"
                  alt="Logo HIMASANTIKA UMC"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white font-[family-name:var(--font-heading)]">
                  HIMASANTIKA UMC
                </h3>
                <p className="text-xs text-[#C3503B] font-semibold tracking-wider uppercase">
                  Teknik Informatika Universitas Muhammadiyah Cirebon
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Himpunan Mahasiswa Jurusan Teknik Informatika (HIMASANTIKA) adalah 
              lembaga eksekutif kooperatif di bawah naungan BEM Fakultas Teknik 
              Universitas Muhammadiyah Cirebon yang menaungi seluruh mahasiswa S1 Teknik Informatika.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com/himasantika_umc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#C3503B] text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Instagram @himasantika_umc</span>
              </a>
              <a
                href="https://tiktok.com/@himasantika_umc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#C3503B] text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>TikTok @himasantika_umc</span>
              </a>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-[#C3503B]">
              Hubungi Kami
            </h4>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C3503B]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Email Resmi</div>
                  <a href="mailto:himasantika@umc.ac.id" className="hover:text-white transition-colors">
                    himasantika@umc.ac.id
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C3503B]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Telepon / WhatsApp</div>
                  <a href="tel:085795483927" className="hover:text-white transition-colors">
                    085795483927
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C3503B]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Sekretariat & Alamat</div>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                    Jl. Fatahillah No. 40 Watubelah, Sumber, Kab. Cirebon <br />
                    <span className="text-gray-500">(Kampus 1: Jl. Tujuh Pahlawan Revolusi No. 70)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-base font-bold text-white uppercase tracking-wider text-[#C3503B]">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-white transition-colors">Tentang Organisasi</a>
              </li>
              <li>
                <a href="#struktur" className="hover:text-white transition-colors">Struktur Organisasi</a>
              </li>
              <li>
                <a href="#kegiatan" className="hover:text-white transition-colors">Program Kerja</a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition-colors">Galeri Dokumentasi</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} HIMASANTIKA Universitas Muhammadiyah Cirebon. All rights reserved.
          </p>
          <p className="text-gray-600">
            S1 Teknik Informatika • Fakultas Teknik UMC
          </p>
        </div>
      </div>
    </footer>
  );
}

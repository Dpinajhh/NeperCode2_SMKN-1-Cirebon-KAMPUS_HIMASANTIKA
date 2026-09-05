"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FOOTER_LINKS = [
  { label: "Beranda", path: "/", targetId: "beranda" },
  { label: "Tentang Organisasi", path: "/tentang", targetId: "tentang" },
  { label: "Struktur & Divisi", path: "/struktur", targetId: "struktur" },
  { label: "Kegiatan Utama", path: "/kegiatan", targetId: "kegiatan" },
  { label: "Galeri Dokumentasi", path: "/galeri", targetId: "galeri" },
  { label: "Hubungi Kami", path: "/kontak", targetId: "kontak" },
];

export default function Footer() {
  const router = useRouter();

  const handleNavClick = (e, link) => {
    e.preventDefault();
    window.history.pushState(null, "", link.path);
    const el = document.getElementById(link.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(link.path);
    }
  };
  return (
    <footer className="bg-[#101869] text-white pt-16 pb-12 relative overflow-hidden border-t border-white/10">
      <div className="section-inner relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-md shrink-0">
                <Image
                  src="/logos/logo-himasantika-umc.png"
                  alt="Logo Himasantika Umc"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white">
                  Himasantika Umc
                </h3>
                <p className="text-[10px] text-[#f4a58a] font-semibold tracking-wider">
                  Teknik Informatika Universitas Muhammadiyah Cirebon
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 max-w-md leading-relaxed">
              Organisasi kemahasiswaan intra perguruan tinggi yang menaungi seluruh mahasiswa Program Studi S1 Teknik Informatika, Fakultas Teknik Universitas Muhammadiyah Cirebon.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-[#f4a58a]">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-[#f4a58a]">
              Media Sosial
            </h4>
            <div className="flex flex-col gap-2 text-xs text-white/70">
              <a
                href="https://instagram.com/himasantika_umc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Instagram:</span>
                <span className="text-white font-medium">@himasantika_umc</span>
              </a>
              <a
                href="https://tiktok.com/@himasantika_umc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span>TikTok:</span>
                <span className="text-white font-medium">@himasantika_umc</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Himasantika Universitas Muhammadiyah Cirebon. All rights reserved.
          </p>
          <p className="text-white/40">
            S1 Teknik Informatika • Fakultas Teknik Umc
          </p>
        </div>
      </div>
    </footer>
  );
}

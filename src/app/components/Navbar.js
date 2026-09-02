"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Struktur", href: "#struktur" },
  { label: "Kegiatan", href: "#kegiatan" },
  { label: "Galeri", href: "#galeri" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F9F9FB]/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="section-inner flex items-center justify-between h-16 lg:h-[68px]">
          {/* Brand */}
          <a href="#beranda" className="flex items-center gap-2.5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/logo-himasantika-umc.png"
              alt="Logo HIMASANTIKA UMC"
              width={34}
              height={34}
              className="object-contain rounded-md"
            />
            <div className="flex flex-col leading-none">
              <span
                className={`text-[13px] font-bold tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-[#101869]" : "text-white"
                }`}
              >
                HIMASANTIKA
              </span>
              <span
                className={`text-[9px] font-semibold tracking-widest uppercase mt-0.5 transition-colors duration-300 ${
                  scrolled ? "text-[#C3503B]" : "text-[#f4a58a]"
                }`}
              >
                UMC CIREBON
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-[#1A1A24]/70 hover:text-[#101869] hover:bg-[#101869]/[0.07]"
                    : "text-white/75 hover:text-white hover:bg-white/[0.10]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <a
              href="#kontak"
              className={`hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                scrolled
                  ? "bg-[#101869] text-white hover:bg-[#C3503B] shadow-sm"
                  : "bg-white text-[#101869] hover:bg-white/90 shadow-md shadow-black/10"
              }`}
            >
              Hubungi Kami
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-[#1A1A24]/70 hover:bg-gray-100"
                  : "text-white/80 hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/96 backdrop-blur-xl border-b border-gray-100 shadow-xl px-4 py-4">
          <nav className="section-inner flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl text-[14px] font-medium text-[#1A1A24]/75 hover:text-[#101869] hover:bg-[#101869]/[0.06] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontak"
              className="mt-1 px-4 py-3 rounded-xl text-[14px] font-semibold text-white bg-[#101869] text-center hover:bg-[#C3503B] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Hubungi Kami
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

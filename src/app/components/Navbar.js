"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Beranda", path: "/", targetId: "beranda" },
  { label: "Tentang", path: "/tentang", targetId: "tentang" },
  { label: "Struktur", path: "/struktur", targetId: "struktur" },
  { label: "Kegiatan", path: "/kegiatan", targetId: "kegiatan" },
  { label: "Galeri", path: "/galeri", targetId: "galeri" },
  { label: "Kontak", path: "/kontak", targetId: "kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll when loading route directly (e.g. /tentang, /kontak)
  useEffect(() => {
    if (pathname && pathname !== "/") {
      const match = NAV_LINKS.find((link) => link.path === pathname);
      if (match) {
        const timer = setTimeout(() => {
          const el = document.getElementById(match.targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 350);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  // Handle smooth scroll when navigating to current page sections
  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileOpen(false);

    // Update browser URL to clean path without reload
    window.history.pushState(null, "", link.path);

    // Scroll to the target element
    const el = document.getElementById(link.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(link.path);
    }
  };

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
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, { path: "/", targetId: "beranda" })}
            className="flex items-center gap-2.5 shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/logo-himasantika-umc.png"
              alt="Logo Himasantika Umc"
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
                Himasantika
              </span>
              <span
                className={`text-[9px] font-semibold tracking-wider mt-0.5 transition-colors duration-300 ${
                  scrolled ? "text-[#C3503B]" : "text-[#f4a58a]"
                }`}
              >
                Umc Cirebon
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-[#1A1A24]/70 hover:text-[#101869] hover:bg-[#101869]/[0.07]"
                    : "text-white/75 hover:text-white hover:bg-white/[0.10]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link
              href="/kontak"
              onClick={(e) => handleNavClick(e, { path: "/kontak", targetId: "kontak" })}
              className={`hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                scrolled
                  ? "bg-[#101869] text-white hover:bg-[#C3503B] shadow-sm"
                  : "bg-white text-[#101869] hover:bg-white/90 shadow-md shadow-black/10"
              }`}
            >
              Hubungi Kami
            </Link>

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
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className="px-4 py-3 rounded-xl text-[14px] font-medium text-[#1A1A24]/75 hover:text-[#101869] hover:bg-[#101869]/[0.06] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontak"
              onClick={(e) => handleNavClick(e, { path: "/kontak", targetId: "kontak" })}
              className="mt-1 px-4 py-3 rounded-xl text-[14px] font-semibold text-white bg-[#101869] text-center hover:bg-[#C3503B] transition-colors"
            >
              Hubungi Kami
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

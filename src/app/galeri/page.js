import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Structure from "../components/Structure";
import Activities from "../components/Activities";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata = {
  title: "Galeri Dokumentasi — Himasantika Umc",
  description: "Dokumentasi momen kebersamaan, studi banding, dan pengabdian Himasantika Universitas Muhammadiyah Cirebon.",
};

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-[#F9F9FB] text-[#1A1A24] selection:bg-[#101869]/15 selection:text-[#101869] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Structure />
      <Activities />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}

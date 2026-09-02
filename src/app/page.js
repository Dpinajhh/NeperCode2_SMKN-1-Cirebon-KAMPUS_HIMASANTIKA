"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Structure from "./components/Structure";
import Activities from "./components/Activities";
import Gallery from "./components/Gallery";
import ContactFooter from "./components/ContactFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9FB] text-[#1A1A24] selection:bg-[#101869]/15 selection:text-[#101869] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Structure />
      <Activities />
      <Gallery />
      <ContactFooter />
    </main>
  );
}

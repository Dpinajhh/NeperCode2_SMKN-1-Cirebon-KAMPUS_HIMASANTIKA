import { Poppins, Inter } from "next/font/google";
import { LenisProvider } from "./components/LenisProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Himpunan Mahasiswa Jurusan Teknik Informatika di Universitas Muhammadiyah Cirebon",
  description:
    "Himpunan Mahasiswa Jurusan Teknik Informatika (HIMASANTIKA) Universitas Muhammadiyah Cirebon — Wadah aspirasi, inovasi, kepemimpinan, dan pengembangan potensi keahlian mahasiswa S1 Teknik Informatika UMC.",
  icons: {
    icon: "/logos/logo-himasantika-umc.png",
    shortcut: "/logos/logo-himasantika-umc.png",
    apple: "/logos/logo-himasantika-umc.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${inter.variable} antialiased`}
    >
      <body>
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#101869]/[0.05] blur-[120px] animate-blob" />
          <div className="absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#C3503B]/[0.04] blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#101869]/[0.03] blur-[120px] animate-blob animation-delay-4000" />
        </div>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

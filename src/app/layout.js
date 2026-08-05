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
  title: "HIMASANTIKA — Membentuk Pemimpin Teknologi Masa Depan",
  description:
    "Himpunan Mahasiswa Informatika (HIMASANTIKA) — Komunitas teknologi mahasiswa unggulan yang mendorong inovasi, kepemimpinan, dan keunggulan digital.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${inter.variable} antialiased`}
    >
      <body>
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#2563EB]/[0.04] blur-[100px] animate-blob" />
          <div className="absolute top-[30%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#EAB308]/[0.03] blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#38BDF8]/[0.04] blur-[100px] animate-blob animation-delay-4000" />
        </div>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

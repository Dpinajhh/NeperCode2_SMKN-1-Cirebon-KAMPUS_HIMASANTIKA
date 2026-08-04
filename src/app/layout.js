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
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

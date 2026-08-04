import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "HIMASANTIKA — Empowering Future Tech Leaders",
  description:
    "Himpunan Mahasiswa Informatika (HIMASANTIKA) is a premier university technology student organization fostering innovation, leadership, collaboration, and digital excellence.",
  keywords: [
    "HIMASANTIKA",
    "Informatika",
    "Student Organization",
    "Technology",
    "Innovation",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-screen bg-[#F8FAFC]">{children}</body>
    </html>
  );
}

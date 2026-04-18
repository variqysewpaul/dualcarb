import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "DualCarb | Elite Performance Fuel",
  description:
    "Science-backed 2:1 carbohydrate performance fuel. Up to 90g/hr absorption, zero GI distress — made in South Africa for a fraction of the import price.",
  keywords: ["endurance fuel", "carbohydrate gel", "running nutrition", "South Africa", "DualCarb"],
  openGraph: {
    title: "DualCarb | Elite Performance Fuel",
    description: "90g/hr dual-transporter carbohydrate formula. South Africa's answer to Maurten.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} ${mono.variable} antialiased bg-black text-white selection:bg-orange-500 selection:text-black`}
      >
        <SmoothScrollProvider>
          <Preloader />
          {/* Global overlays */}
          <CustomCursor />
          <NoiseOverlay />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

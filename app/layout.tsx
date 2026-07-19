import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vocean",
  description: "On-device rPPG monitor powered by LiteRT and Next.js",
  manifest: "/manifest.json",
  themeColor: "#c8c2df"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

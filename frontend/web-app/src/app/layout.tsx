import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Providers } from "../components/providers/Providers";

export const metadata: Metadata = {
  title: "A-ZCompany - Ecommerce Store",
  description: "Your one-stop shop for ski equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className="bg-white min-h-screen">
        <Providers>
          <Header />
          <main className="pt-20 bg-white min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

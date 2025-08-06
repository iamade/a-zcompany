import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";

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
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto px-5 pt-10 mt-7">{children}</main>
      </body>
    </html>
  );
}

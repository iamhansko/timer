import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";import localFont from "next/font/local";

const hbiosSysFont = localFont({src:'../../public/fonts/HBIOS-SYS.woff2'});

export const metadata: Metadata = {
  title: "Timer",
  description: "Made by Hansko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hbiosSysFont.className}><Suspense>{children}</Suspense></body>
    </html>
  );
}

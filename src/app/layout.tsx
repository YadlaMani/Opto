import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ClientProvider } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opto",
  description:
    "A platform where everyone can share their stories and blogs they want in a decentrailized way.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>{children}</ClientProvider>
        </body>
      </html>
    </>
  );
}

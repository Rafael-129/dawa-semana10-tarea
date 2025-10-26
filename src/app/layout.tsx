import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { APP_METADATA } from "@/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: APP_METADATA.title,
    template: `%s | ${APP_METADATA.title}`,
  },
  description: APP_METADATA.description,
  keywords: APP_METADATA.keywords,
  authors: [{ name: "Student DAWA" }],
  creator: "TECSUP Student",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: APP_METADATA.title,
    description: APP_METADATA.description,
    siteName: APP_METADATA.title,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_METADATA.title,
    description: APP_METADATA.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

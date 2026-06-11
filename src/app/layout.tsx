import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Analytics } from "@vercel/analytics/react"

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
})

export const metadata: Metadata = {
  title: "سعر دزاير | تتبع أسعار المنتجات في الجزائر",
  description: "منصة لتتبع ومقارنة أسعار المنتجات عبر الولايات الجزائرية",
  keywords: "الجزائر, أسعار, منتجات, ولايات, تسوق, اقتصاد",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans rtl">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

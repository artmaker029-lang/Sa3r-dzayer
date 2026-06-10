"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import SearchBar from "@/components/SearchBar"
import { sampleProducts, sampleCategories, generateSamplePrices } from "@/lib/seed-data"
import { getWilayaById } from "@/lib/wilayas"
import type { Price } from "@/lib/types"

export default function HomePage() {
  const [recentPrices, setRecentPrices] = useState<Price[]>([])
  const [featuredProducts] = useState(sampleProducts.slice(0, 8))

  useEffect(() => {
    const all = generateSamplePrices()
    setRecentPrices(all.sort(() => Math.random() - 0.5).slice(0, 10))
  }, [])

  return (
    <div>
      <section className="search-gradient text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">سعر دزاير</h1>
          <p className="text-lg md:text-xl mb-8 text-white/80">
            تتبع ومقارنة أسعار المنتجات عبر جميع الولايات الجزائرية
          </p>
          <div className="flex justify-center">
            <SearchBar large />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">التصنيفات</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sampleCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/search?cat=${cat.id}`}
              className="bg-white rounded-xl p-4 text-center border border-gray-100 card-hover shadow-sm"
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <span className="text-sm font-medium text-gray-700">{cat.name_ar}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">منتجات مميزة</h2>
          <Link href="/search" className="text-primary text-sm font-medium hover:underline">
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-xl p-4 border border-gray-100 card-hover shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-xl mb-3">
                {product.name_ar === "خبز" && "🥖"}
                {product.name_ar === "حليب" && "🥛"}
                {product.name_ar === "زيت المائدة" && "🫒"}
                {product.name_ar === "قهوة" && "☕"}
                {product.name_ar === "سكر" && "🍬"}
                {product.name_ar === "دقيق" && "🌾"}
                {product.name_ar === "أرز" && "🍚"}
                {product.name_ar === "عدس" && "🫘"}
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{product.name_ar}</h3>
              {product.name_fr && (
                <p className="text-xs text-muted">{product.name_fr}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">آخر الأسعار المضافة</h2>
          <div className="space-y-3">
            {recentPrices.map((price) => {
              const product = sampleProducts.find((p) => p.id === price.product_id)
              const wilaya = getWilayaById(price.wilaya_id)
              return (
                <Link
                  key={price.id}
                  href={`/products/${price.product_id}`}
                  className="block bg-gray-50 rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors animate-fade-in"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{product?.name_ar || "منتج"}</span>
                      <span className="text-muted mx-2">-</span>
                      <span className="text-sm text-muted">{wilaya?.name_ar}</span>
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-primary">{Number(price.price).toLocaleString("ar-DZ")} د.ج</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

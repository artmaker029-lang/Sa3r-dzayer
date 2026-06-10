"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import PriceTable from "@/components/PriceTable"
import { getProductById, generateSamplePrices } from "@/lib/seed-data"
import { getWilayaById } from "@/lib/wilayas"
import type { Price } from "@/lib/types"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  const product = getProductById(productId)

  const [allPrices, setAllPrices] = useState<Price[]>([])
  const [selectedWilaya, setSelectedWilaya] = useState<number | null>(null)

  useEffect(() => {
    if (product) {
      const prices = generateSamplePrices()
      setAllPrices(prices.filter((p) => p.product_id === productId))
    }
  }, [productId, product])

  const filteredPrices = useMemo(() => {
    if (!selectedWilaya) return allPrices
    return allPrices.filter((p) => p.wilaya_id === selectedWilaya)
  }, [allPrices, selectedWilaya])

  const wilayaStats = useMemo(() => {
    const stats = new Map<number, { count: number; min: number; max: number; avg: number }>()
    for (const p of allPrices) {
      const existing = stats.get(p.wilaya_id)
      if (existing) {
        existing.count++
        existing.min = Math.min(existing.min, p.price)
        existing.max = Math.max(existing.max, p.price)
        existing.avg = (existing.avg * (existing.count - 1) + p.price) / existing.count
      } else {
        stats.set(p.wilaya_id, { count: 1, min: p.price, max: p.price, avg: p.price })
      }
    }
    return stats
  }, [allPrices])

  const uniqueWilayas = useMemo(() => {
    const ids = [...new Set(allPrices.map((p) => p.wilaya_id))]
    return ids.map((id) => ({ id, wilaya: getWilayaById(id) })).filter((w) => w.wilaya)
  }, [allPrices])

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-muted mb-4">المنتج غير موجود</p>
        <Link href="/search" className="text-primary hover:underline">العودة إلى البحث</Link>
      </div>
    )
  }

  const overallAvg = allPrices.length
    ? allPrices.reduce((sum, p) => sum + p.price, 0) / allPrices.length
    : 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/search" className="text-sm text-muted hover:text-primary transition-colors">
          ← العودة إلى搜索结果
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-1">{product.name_ar}</h1>
        {product.name_fr && (
          <p className="text-muted mb-3">{product.name_fr}</p>
        )}
        {product.description_ar && (
          <p className="text-gray-600 mb-4">{product.description_ar}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-xs text-muted mb-1">متوسط السعر</p>
            <p className="text-lg font-bold text-primary">
              {overallAvg ? `${Math.round(overallAvg).toLocaleString("ar-DZ")} د.ج` : "---"}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-xs text-muted mb-1">أقل سعر</p>
            <p className="text-lg font-bold text-green-600">
              {allPrices.length ? `${Math.round(Math.min(...allPrices.map(p => p.price))).toLocaleString("ar-DZ")} د.ج` : "---"}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-xs text-muted mb-1">أعلى سعر</p>
            <p className="text-lg font-bold text-secondary">
              {allPrices.length ? `${Math.round(Math.max(...allPrices.map(p => p.price))).toLocaleString("ar-DZ")} د.ج` : "---"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-muted mb-1">عدد الأسعار</p>
            <p className="text-lg font-bold text-gray-900">{allPrices.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <h2 className="font-bold mb-3">الولايات المتوفرة</h2>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedWilaya(null)}
              className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedWilaya === null
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              الكل ({allPrices.length})
            </button>
            {uniqueWilayas.map(({ id, wilaya }) => {
              const stats = wilayaStats.get(id)
              return (
                <button
                  key={id}
                  onClick={() => setSelectedWilaya(id)}
                  className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedWilaya === id
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="block font-medium">{wilaya!.name_ar}</span>
                  <span className={`text-xs ${selectedWilaya === id ? "text-white/70" : "text-muted"}`}>
                    {stats?.count} سعر | {stats ? `${Math.round(stats.avg).toLocaleString("ar-DZ")} د.ج` : ""}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-bold mb-4">الأسعار</h2>
          <PriceTable prices={filteredPrices} />
        </div>
      </div>
    </div>
  )
}

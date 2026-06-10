"use client"

import { Suspense } from "react"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import SearchBar from "@/components/SearchBar"
import { searchProducts, sampleProducts } from "@/lib/seed-data"
import type { Product } from "@/lib/types"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const catParam = searchParams.get("cat")

  const [results, setResults] = useState<Product[]>([])

  useEffect(() => {
    if (query) {
      setResults(searchProducts(query))
    } else {
      setResults(sampleProducts)
    }
  }, [query])

  const displayed = useMemo(() => {
    if (catParam) {
      return results.filter((p) => p.category_id === Number(catParam))
    }
    return results
  }, [results, catParam])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">
          {query ? `نتائج البحث عن: "${query}"` : "جميع المنتجات"}
        </h1>
        <SearchBar initialQuery={query} />
      </div>

      {displayed.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p className="text-xl mb-2">لم يتم العثور على نتائج</p>
          <p>حاول البحث بكلمة أخرى</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-xl p-4 border border-gray-100 card-hover shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{product.name_ar}</h3>
              {product.name_fr && (
                <p className="text-sm text-muted mb-2">{product.name_fr}</p>
              )}
              {product.description_ar && (
                <p className="text-xs text-gray-500 line-clamp-2">{product.description_ar}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Suspense fallback={<div className="text-center py-16 text-muted">جاري التحميل...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  )
}

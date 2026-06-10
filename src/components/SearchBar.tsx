"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  initialQuery?: string
  large?: boolean
}

export default function SearchBar({ initialQuery = "", large = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${large ? "max-w-2xl" : "max-w-xl"}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن منتج..."
          className="w-full px-5 py-3.5 pr-12 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base transition-all"
        />
        <button
          type="submit"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 rounded-lg hover:bg-primary-light transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  )
}

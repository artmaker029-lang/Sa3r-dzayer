import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🇩🇿</span>
          <span className="text-xl font-bold text-primary">سعر دزاير</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <Link href="/search" className="hover:text-primary transition-colors">
            بحث
          </Link>
          <Link href="/submit" className="hover:text-primary transition-colors">
            إضافة سعر
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            عن المنصة
          </Link>
        </nav>
      </div>
    </header>
  )
}

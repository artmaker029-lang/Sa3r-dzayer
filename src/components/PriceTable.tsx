import { getWilayaById } from "@/lib/wilayas"
import type { Price } from "@/lib/types"

interface PriceTableProps {
  prices: Price[]
}

function SourceBadge({ source, verified }: { source: string; verified: boolean }) {
  if (!verified) return null

  const color = source === "jumia" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
  const label = source === "jumia" ? "Jumia" : source === "ouedkniss" ? "Ouedkniss" : "مؤكد"

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {label}
    </span>
  )
}

export default function PriceTable({ prices }: PriceTableProps) {
  if (prices.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        <p className="text-lg">لا توجد أسعار مسجلة بعد</p>
        <p className="text-sm mt-1">كن أول من يضيف سعراً لهذا المنتج</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-muted text-xs uppercase tracking-wider">
            <th className="text-right px-4 py-3 font-medium">الولاية</th>
            <th className="text-right px-4 py-3 font-medium">السعر (د.ج)</th>
            <th className="text-right px-4 py-3 font-medium">المصدر</th>
            <th className="text-right px-4 py-3 font-medium">المتجر</th>
            <th className="text-right px-4 py-3 font-medium">التاريخ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {prices.map((price) => {
            const wilaya = getWilayaById(price.wilaya_id)
            return (
              <tr key={price.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {wilaya ? `${wilaya.name_ar} (${String(wilaya.code).padStart(2, "0")})` : `ولاية ${price.wilaya_id}`}
                </td>
                <td className="px-4 py-3 font-bold text-primary">
                  {Number(price.price).toLocaleString("ar-DZ")} د.ج
                </td>
                <td className="px-4 py-3">
                  <SourceBadge source={price.source} verified={price.verified} />
                  {!price.verified && (
                    <span className="text-xs text-muted">مستخدم</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {price.store_name || "غير محدد"}
                </td>
                <td className="px-4 py-3 text-muted text-xs">
                  {new Date(price.date).toLocaleDateString("ar-DZ")}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

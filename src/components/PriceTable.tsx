import { getWilayaById } from "@/lib/wilayas"
import type { Price } from "@/lib/types"

interface PriceTableProps {
  prices: Price[]
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

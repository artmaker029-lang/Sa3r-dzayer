"use client"

import { useState, type FormEvent } from "react"
import { wilayas } from "@/lib/wilayas"
import { sampleProducts } from "@/lib/seed-data"
import Link from "next/link"

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    product_name: "",
    wilaya_id: "",
    price: "",
    store_name: "",
    submitted_by: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formData.product_name || !formData.wilaya_id || !formData.price) return

    const priceNum = Number.parseFloat(formData.price)
    if (isNaN(priceNum) || priceNum <= 0) return

    setSubmitted(true)
    setFormData({ product_name: "", wilaya_id: "", price: "", store_name: "", submitted_by: "" })
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">تم إضافة السعر بنجاح!</h1>
          <p className="text-muted mb-6">شكراً لك على المساهمة في تحديث الأسعار</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-light transition-colors font-medium"
            >
              إضافة سعر آخر
            </button>
            <Link
              href="/"
              className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">إضافة سعر جديد</h1>
      <p className="text-muted mb-8">ساهم في تحديث قاعدة الأسعار بمشاركة سعر منتج في ولايتك</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">المنتج *</label>
          <input
            list="products"
            value={formData.product_name}
            onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
            placeholder="اسم المنتج"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
          />
          <datalist id="products">
            {sampleProducts.map((p) => (
              <option key={p.id} value={p.name_ar} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">الولاية *</label>
          <select
            value={formData.wilaya_id}
            onChange={(e) => setFormData({ ...formData, wilaya_id: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
          >
            <option value="">اختر الولاية</option>
            {wilayas.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name_ar} - {w.name_fr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">السعر (د.ج) *</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="مثال: 250.00"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">اسم المحل أو المصدر</label>
          <input
            type="text"
            value={formData.store_name}
            onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
            placeholder="مثال: سوبرماركت السلام"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">اسمك (اختياري)</label>
          <input
            type="text"
            value={formData.submitted_by}
            onChange={(e) => setFormData({ ...formData, submitted_by: e.target.value })}
            placeholder="سيظهر كمصدر المعلومة"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
        >
          إضافة السعر
        </button>
      </form>
    </div>
  )
}

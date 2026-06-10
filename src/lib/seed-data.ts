import type { Product, Price } from "./types"
import { wilayas } from "./wilayas"

export const sampleCategories = [
  { id: 1, name_ar: "مواد غذائية", name_fr: "Alimentation", icon: "🥖" },
  { id: 2, name_ar: "مشروبات", name_fr: "Boissons", icon: "🥤" },
  { id: 3, name_ar: "منتجات تنظيف", name_fr: "Nettoyage", icon: "🧹" },
  { id: 4, name_ar: "منتجات ألبان", name_fr: "Produits laitiers", icon: "🥛" },
  { id: 5, name_ar: "لحوم ودواجن", name_fr: "Viandes et volailles", icon: "🥩" },
  { id: 6, name_ar: "خضروات وفواكه", name_fr: "Légumes et fruits", icon: "🥬" },
]

export const sampleProducts: Product[] = [
  { id: 1, name_ar: "خبز", name_fr: "Pain", category_id: 1, description_ar: "خبز تقليدي جزائري", created_at: "2025-01-01" },
  { id: 2, name_ar: "حليب", name_fr: "Lait", category_id: 4, description_ar: "حليب طازج كامل الدسم", created_at: "2025-01-01" },
  { id: 3, name_ar: "زيت المائدة", name_fr: "Huile de table", category_id: 1, description_ar: "زيت نباتي للطبخ", created_at: "2025-01-01" },
  { id: 4, name_ar: "سكر", name_fr: "Sucre", category_id: 1, description_ar: "سكر أبيض حبيبات", created_at: "2025-01-01" },
  { id: 5, name_ar: "قهوة", name_fr: "Café", category_id: 2, description_ar: "قهوة محمصة مطحونة", created_at: "2025-01-01" },
  { id: 6, name_ar: "دقيق", name_fr: "Farine", category_id: 1, description_ar: "دقيق القمح الأبيض", created_at: "2025-01-01" },
  { id: 7, name_ar: "أرز", name_fr: "Riz", category_id: 1, description_ar: "أرز أبيض طويل الحبة", created_at: "2025-01-01" },
  { id: 8, name_ar: "عدس", name_fr: "Lentilles", category_id: 1, description_ar: "عدس أحمر مجفف", created_at: "2025-01-01" },
  { id: 9, name_ar: "طماطم", name_fr: "Tomates", category_id: 6, description_ar: "طماطم طازجة", created_at: "2025-01-01" },
  { id: 10, name_ar: "بصل", name_fr: "Oignons", category_id: 6, description_ar: "بصل أبيض", created_at: "2025-01-01" },
  { id: 11, name_ar: "بطاطا", name_fr: "Pommes de terre", category_id: 6, description_ar: "بطاطا طازجة", created_at: "2025-01-01" },
  { id: 12, name_ar: "بيض", name_fr: "Œufs", category_id: 4, description_ar: "بيض المائدة", created_at: "2025-01-01" },
  { id: 13, name_ar: "دجاج", name_fr: "Poulet", category_id: 5, description_ar: "دجاج طازج كامل", created_at: "2025-01-01" },
  { id: 14, name_ar: "لحم البقر", name_fr: "Bœuf", category_id: 5, description_ar: "لحم بقر طازج", created_at: "2025-01-01" },
  { id: 15, name_ar: "ماء معدني", name_fr: "Eau minérale", category_id: 2, description_ar: "ماء معدني طبيعي", created_at: "2025-01-01" },
  { id: 16, name_ar: "زيت الزيتون", name_fr: "Huile d'olive", category_id: 1, description_ar: "زيت زيتون بكر ممتاز", created_at: "2025-01-01" },
  { id: 17, name_ar: "شاي", name_fr: "Thé", category_id: 2, description_ar: "شاي أخضر", created_at: "2025-01-01" },
  { id: 18, name_ar: "سواكن", name_fr: "Couscous", category_id: 1, description_ar: "سميد الكسكس", created_at: "2025-01-01" },
  { id: 19, name_ar: "جبن", name_fr: "Fromage", category_id: 4, description_ar: "جبن أبيض طري", created_at: "2025-01-01" },
  { id: 20, name_ar: "زبدة", name_fr: "Beurre", category_id: 4, description_ar: "زبدة طبيعية", created_at: "2025-01-01" },
  { id: 21, name_ar: "عسل", name_fr: "Miel", category_id: 1, description_ar: "عسل طبيعي", created_at: "2025-01-01" },
  { id: 22, name_ar: "صابون", name_fr: "Savon", category_id: 3, description_ar: "صابون غسيل", created_at: "2025-01-01" },
  { id: 23, name_ar: "شامبو", name_fr: "Shampoing", category_id: 3, description_ar: "شامبو للشعر", created_at: "2025-01-01" },
  { id: 24, name_ar: "حفاظات", name_fr: "Couches", category_id: 3, description_ar: "حفاظات أطفال", created_at: "2025-01-01" },
  { id: 25, name_ar: "سمك", name_fr: "Poisson", category_id: 5, description_ar: "سمك طازج", created_at: "2025-01-01" },
]

export function generateSamplePrices(): Price[] {
  const prices: Price[] = []
  const stores = ["محل التاج", "سوبرماركت السلام", "مزرعة الخير", "سوق الجملة", "محل البركة", "ميناء الصيد"]
  let id = 1

  const wilayaSubset = [16, 9, 6, 19, 31, 25, 23, 5, 13, 3, 26, 27, 7, 47]

  for (const product of sampleProducts.slice(0, 15)) {
    const numPrices = Math.floor(Math.random() * 5) + 2
    const selected = [...wilayaSubset].sort(() => Math.random() - 0.5).slice(0, numPrices)

    for (const wilayaId of selected) {
      const basePrice = Math.floor(Math.random() * 1500) + 20
      const variance = Math.floor(Math.random() * 60) - 30
      const price = Math.max(5, basePrice + variance)
      const daysAgo = Math.floor(Math.random() * 60)

      prices.push({
        id: id++,
        product_id: product.id,
        wilaya_id: wilayaId,
        price,
        store_name: stores[Math.floor(Math.random() * stores.length)],
        date: new Date(Date.now() - daysAgo * 86400000).toISOString(),
        submitted_by: "مستخدم",
        created_at: new Date(Date.now() - daysAgo * 86400000).toISOString(),
      })
    }
  }

  return prices
}

export function getProductById(id: number): Product | undefined {
  return sampleProducts.find((p) => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return sampleProducts.filter(
    (p) =>
      p.name_ar.includes(q) ||
      (p.name_fr && p.name_fr.toLowerCase().includes(q)) ||
      (p.description_ar && p.description_ar.includes(q))
  )
}

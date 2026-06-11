import { createClient } from "@supabase/supabase-js"
import type { Price } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveScrapedPrices(
  prices: Array<{
    product_id: number
    wilaya_id: number
    price: number
    store_name?: string
    source: string
    source_url?: string
  }>
) {
  const { data, error } = await supabase.from("prices").insert(
    prices.map((p) => ({
      ...p,
      verified: true,
      submitted_by: `سعر مؤكد - ${p.source}`,
      scraped_at: new Date().toISOString(),
    }))
  )
  return { data, error }
}

export async function getLatestScrapedPrices(productId?: number) {
  let query = supabase
    .from("prices")
    .select("*")
    .eq("verified", true)
    .order("scraped_at", { ascending: false })

  if (productId) {
    query = query.eq("product_id", productId)
  }

  const { data, error } = await query
  return { data: data as unknown as Price[], error }
}

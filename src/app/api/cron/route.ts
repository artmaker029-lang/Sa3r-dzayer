import { NextResponse } from "next/server"
import { scrapeAll } from "@/lib/scraper"
import { sampleProducts } from "@/lib/seed-data"
import type { Price } from "@/lib/types"

export const dynamic = "force-dynamic"
export const maxDuration = 120

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  const expectedKey = process.env.CRON_SECRET || process.env.SCRAPER_API_KEY

  if (expectedKey && authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  const startTime = Date.now()

  try {
    const results = await scrapeAll()

    const scrapedPrices: Price[] = []
    let priceId = 2000

    for (const result of results) {
      if (!result.success) continue
      for (const sp of result.products) {
        const product = sampleProducts.find((p) => p.name_ar === sp.name)
        if (!product) continue
        scrapedPrices.push({
          id: priceId++,
          product_id: product.id,
          wilaya_id: 16,
          price: sp.price,
          store_name: sp.store || result.source,
          date: new Date().toISOString(),
          submitted_by: `سعر مؤكد - ${result.source}`,
          source: sp.source,
          source_url: sp.url,
          verified: true,
          scraped_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        })
      }
    }

    const elapsed = Date.now() - startTime

    return NextResponse.json({
      success: true,
      job: "price-update",
      interval: "24h",
      elapsed: `${elapsed}ms`,
      sources: results.map((r) => ({
        source: r.source,
        success: r.success,
        count: r.products.length,
        error: r.error,
      })),
      totalPrices: scrapedPrices.length,
      nextRun: new Date(Date.now() + 86400000).toISOString(),
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    )
  }
}

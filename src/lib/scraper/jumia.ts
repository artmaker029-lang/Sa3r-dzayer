import * as cheerio from "cheerio"
import type { ScrapedProduct, ScrapeResult } from "./index"
import { fetchWithRetry, extractPrice, matchProduct } from "./index"

const SEARCH_QUERIES = [
  "huile+table",
  "lait+frais",
  "sucre",
  "cafe+moulu",
  "farine",
  "riz",
  "tomate+conserve",
  "huile+olive",
  "the+vert",
  "couscous",
  "lentille",
  "pois+chiche",
  "beurre",
  "fromage",
  "eau+minerale",
  "jus+fruit",
  "savon",
  "shampoing",
  "couche+bebe",
  "miel",
]

export async function scrapeJumia(): Promise<ScrapeResult> {
  const products: ScrapedProduct[] = []

  for (const query of SEARCH_QUERIES) {
    try {
      const url = `https://www.jumia.dz/catalog/?q=${query}`
      const response = await fetchWithRetry(url)
      const html = await response.text()
      const $ = cheerio.load(html)

      $('article[data-product], .prd, .product, [class*="product"], [class*="card"]').each((_, el) => {
        const nameEl = $(el).find('h3, [class*="name"], [class*="title"], a[class*="name"]').first()
        const priceEl = $(el).find('[class*="price"], [class*="prc"], .prc').first()
        const linkEl = $(el).find("a").first()

        const name = nameEl.text().trim()
        const priceText = priceEl.text().trim()
        const href = linkEl.attr("href") || ""
        const fullUrl = href.startsWith("http") ? href : `https://www.jumia.dz${href}`
        const price = extractPrice(priceText)

        if (name && price !== null) {
          const matchedName = matchProduct(name)
          if (matchedName) {
            products.push({
              name: matchedName,
              price,
              url: fullUrl,
              store: "Jumia",
              wilaya: "الجزائر العاصمة",
              source: "jumia",
            })
          }
        }
      })

      await new Promise((r) => setTimeout(r, 1500))
    } catch (err) {
      console.warn(`Jumia search failed for "${query}":`, err instanceof Error ? err.message : err)
    }
  }

  return {
    source: "jumia",
    success: true,
    products,
  }
}

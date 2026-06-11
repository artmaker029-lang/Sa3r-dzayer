import * as cheerio from "cheerio"
import type { ScrapedProduct, ScrapeResult } from "./index"
import { fetchWithRetry, extractPrice, matchProduct } from "./index"

const SEARCH_QUERIES = [
  { q: "huile+couscous+alimentaire", cat: "alimentaire" },
  { q: "lait+sucre+cafe", cat: "alimentaire" },
  { q: "riz+farine+ lentille", cat: "alimentaire" },
  { q: "huile+olive", cat: "alimentaire" },
  { q: "couscous+pates", cat: "alimentaire" },
  { q: "savon+shampoing+produit+menager", cat: "maison" },
  { q: "couche+bebe+lait+poudre", cat: "puériculture" },
]

export async function scrapeOuedkniss(): Promise<ScrapeResult> {
  const products: ScrapedProduct[] = []

  for (const { q, cat } of SEARCH_QUERIES) {
    try {
      const url = `https://www.ouedkniss.com/${cat}/?search=${encodeURIComponent(q)}`
      const response = await fetchWithRetry(url)
      const html = await response.text()
      const $ = cheerio.load(html)

      $('[class*="annonce"], [class*="listing"], article, [class*="item"], [class*="card"]').each((_, el) => {
        const nameEl = $(el).find('h2, h3, [class*="title"], [class*="name"], [class*="titre"]').first()
        const priceEl = $(el).find('[class*="price"], [class*="prix"], [class*="montant"]').first()
        const linkEl = $(el).find("a").first()

        const name = nameEl.text().trim()
        const priceText = priceEl.text().trim()
        const href = linkEl.attr("href") || ""
        const fullUrl = href.startsWith("http") ? href : `https://www.ouedkniss.com${href}`
        const price = extractPrice(priceText)

        if (name && price !== null) {
          const matchedName = matchProduct(name)
          if (matchedName) {
            products.push({
              name: matchedName,
              price,
              url: fullUrl,
              store: "Ouedkniss",
              wilaya: "الجزائر العاصمة",
              source: "ouedkniss",
            })
          }
        }
      })

      await new Promise((r) => setTimeout(r, 1500))
    } catch (err) {
      console.warn(`Ouedkniss search failed for "${q}":`, err instanceof Error ? err.message : err)
    }
  }

  return {
    source: "ouedkniss",
    success: true,
    products,
  }
}

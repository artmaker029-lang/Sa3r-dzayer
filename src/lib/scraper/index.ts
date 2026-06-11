import type { ScrapedProduct } from "@/lib/types"
export type { ScrapedProduct }
import { scrapeJumia } from "./jumia"
import { scrapeOuedkniss } from "./ouedkniss"

export interface ScrapeResult {
  source: string
  success: boolean
  products: ScrapedProduct[]
  error?: string
}

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
]

export function getRandomUA(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "User-Agent": getRandomUA(),
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "fr-FR,fr;q=0.9,ar-DZ;q=0.8,en;q=0.7",
          ...options.headers,
        },
        signal: AbortSignal.timeout(15000),
      })
      if (response.ok) return response
      if (response.status === 429 || response.status >= 500) {
        await new Promise((r) => setTimeout(r, 2000 * (i + 1)))
        continue
      }
      return response
    } catch {
      if (i === retries - 1) throw new Error(`Failed to fetch ${url} after ${retries} attempts`)
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)))
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`)
}

export function extractPrice(text: string): number | null {
  const cleaned = text.replace(/[^\d,.]/g, "").replace(/,/g, ".")
  const match = cleaned.match(/(\d+(?:\.\d{1,2})?)/)
  if (!match) return null
  const price = Number.parseFloat(match[1])
  return isNaN(price) ? null : price
}

export function normalizeProductName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[-\s]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim()
}

const PRODUCT_KEYWORDS: Record<string, string[]> = {
  "خبز": ["pain", "خبز"],
  "حليب": ["lait", "حليب", "mil"],
  "زيت المائدة": ["huile", "زيت", "oil"],
  "زيت الزيتون": ["huile d'olive", "زيت زيتون", "olive oil"],
  "سكر": ["sucre", "سكر", "sugar"],
  "قهوة": ["café", "قهوة", "coffee"],
  "دقيق": ["farine", "دقيق", "flour"],
  "أرز": ["riz", "أرز", "rice"],
  "عدس": ["lentille", "عدس", "lentil"],
  "حمص": ["pois chiche", "حمص", "chickpea"],
  "طماطم": ["tomate", "طماطم", "tomato"],
  "بصل": ["oignon", "بصل", "onion"],
  "بطاطا": ["pomme de terre", "بطاطا", "potato"],
  "بيض": ["oeuf", "بيض", "egg", "œuf"],
  "زبدة": ["beurre", "زبدة", "butter"],
  "جبن": ["fromage", "جبن", "cheese"],
  "دجاج": ["poulet", "دجاج", "chicken"],
  "لحم البقر": ["bœuf", "لحم", "beef", "viande"],
  "سمك": ["poisson", "سمك", "fish"],
  "ماء معدني": ["eau", "ماء", "water"],
  "عصير": ["jus", "عصير", "juice"],
  "شاي": ["thé", "شاي", "tea"],
  "سواكن": ["couscous", "كسكس", "سواكن"],
  "صابون": ["savon", "صابون", "soap"],
  "شامبو": ["shampoing", "شامبو", "shampoo"],
  "عسل": ["miel", "عسل", "honey"],
  "حفاظات": ["couche", "حفاظات", "diaper"],
}

export function matchProduct(name: string): string | null {
  const normalized = normalizeProductName(name)
  for (const [productName, keywords] of Object.entries(PRODUCT_KEYWORDS)) {
    for (const keyword of keywords) {
      if (normalized.includes(keyword)) return productName
    }
  }
  return null
}

export async function scrapeAll(): Promise<ScrapeResult[]> {
  const results: ScrapeResult[] = []

  try {
    const jumiaResult = await scrapeJumia()
    results.push(jumiaResult)
  } catch (err) {
    results.push({
      source: "jumia",
      success: false,
      products: [],
      error: err instanceof Error ? err.message : "Unknown error",
    })
  }

  await new Promise((r) => setTimeout(r, 2000))

  try {
    const ouedknissResult = await scrapeOuedkniss()
    results.push(ouedknissResult)
  } catch (err) {
    results.push({
      source: "ouedkniss",
      success: false,
      products: [],
      error: err instanceof Error ? err.message : "Unknown error",
    })
  }

  return results
}

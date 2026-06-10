export interface Wilaya {
  id: number
  name_ar: string
  name_fr: string
  code: number
}

export interface Category {
  id: number
  name_ar: string
  name_fr: string
  icon?: string
}

export interface Product {
  id: number
  name_ar: string
  name_fr?: string
  description_ar?: string
  description_fr?: string
  category_id?: number
  category?: Category
  image_url?: string
  created_at: string
}

export interface Price {
  id: number
  product_id: number
  wilaya_id: number
  wilaya?: Wilaya
  price: number
  store_name?: string
  date: string
  submitted_by?: string
  created_at: string
}

export interface PriceWithDetails extends Price {
  product?: Product
  wilaya?: Wilaya
}

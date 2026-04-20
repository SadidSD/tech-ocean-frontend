import { api } from '../api-client';

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  salePrice: number | null;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  brand?: string;
  componentType?: string;
  socket?: string;
  wattage?: number;
  imgIcon?: string;
  specs?: Record<string, unknown>;
  category: { id: number; name: string; slug: string };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsQuery {
  category?: string;
  brand?: string;
  componentType?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
  q?: string;
  featured?: boolean;
}

export const productsApi = {
  list: (query: ProductsQuery = {}) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.set(k, String(v));
    });
    const qs = params.toString();
    return api.get<ProductsResponse>(`/products${qs ? `?${qs}` : ''}`);
  },

  get: (id: number | string) => api.get<Product & { ratingDistribution: Record<number, number> }>(`/products/${id}`),
};

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString('en-BD')}`;
}

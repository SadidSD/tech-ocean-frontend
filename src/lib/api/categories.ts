import { api } from '../api-client';

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  orderIndex: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  reactIcon?: string;
  iconColor?: string;
  iconBg?: string;
  children: SubCategory[];
}

export const categoriesApi = {
  list: () => api.get<Category[]>('/categories'),
  get: (slug: string) => api.get<Category>(`/categories/${slug}`),
};

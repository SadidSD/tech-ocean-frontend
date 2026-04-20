import { api } from '../api-client';

export interface Review {
  id: number;
  rating: number;
  title?: string;
  content: string;
  guestName?: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  adminReply?: string;
  user?: { name: string; avatar?: string };
}

export interface SubmitReviewPayload {
  productId: number;
  rating: number;
  title?: string;
  content: string;
  guestName?: string;
  guestEmail?: string;
}

export const reviewsApi = {
  forProduct: (productId: number, page = 1) =>
    api.get<{ reviews: Review[]; total: number }>(`/reviews/product/${productId}?page=${page}`),

  submit: (data: SubmitReviewPayload) =>
    api.post<Review & { message: string }>('/reviews', data),
};

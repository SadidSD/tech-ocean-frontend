import { api } from '../api-client';

export interface CartItem {
  productId?: number;
  title: string;
  price: number;
  quantity: number;
  imgUrl?: string | null;
}

export interface CheckoutPayload {
  customerName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  district: string;
  thana: string;
  postalCode: string;
  deliveryInstructions?: string;
  deliveryMode: 'Standard' | 'Express' | 'Same Day';
  paymentMethod: 'SSLCommerz' | 'COD';
  couponCode?: string;
  cartItems: CartItem[];
}

export interface CheckoutResponse {
  orderId: number;
  orderNumber: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  couponDiscount: number;
  total: number;
  paymentMethod: string;
  gatewayUrl?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items: CartItem[];
}

export const ordersApi = {
  checkout: (payload: CheckoutPayload) =>
    api.post<CheckoutResponse>('/orders/checkout', payload),

  track: (orderNumber: string) =>
    api.get<{ orderNumber: string; status: string; trackingNumber?: string; estimatedDelivery?: string }>(`/orders/tracking/${orderNumber}`),

  myOrders: (page = 1) =>
    api.get<{ orders: Order[]; total: number; totalPages: number }>(`/orders/my?page=${page}`),
};

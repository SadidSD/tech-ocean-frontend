import { api } from '../api-client';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export const authApi = {
  signup: (data: { name: string; email: string; phone?: string; password: string }) =>
    api.post<AuthResponse>('/auth/signup', data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),

  logout: () => api.post('/auth/logout', {}),

  refresh: () => api.post<{ accessToken: string }>('/auth/refresh', {}),

  me: () => api.get<AuthUser>('/auth/me'),

  forgotPassword: (email: string) =>
    api.post<{ message: string }>('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post<{ message: string }>('/auth/reset-password', { token, password }),
};

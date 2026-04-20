import { api } from '../api-client';

export interface PCBuild {
  id: number;
  name: string;
  components: Record<string, unknown>;
  totalPrice: number;
  totalWattage: number;
  isPublic: boolean;
  createdAt: string;
}

export interface CCTVBuild {
  id: number;
  name: string;
  components: Record<string, unknown>;
  cameraCount: number;
  totalPrice: number;
  createdAt: string;
}

export const buildsApi = {
  listPC: () => api.get<PCBuild[]>('/builds/pc'),
  savePC: (data: Omit<PCBuild, 'id' | 'createdAt'>) => api.post<PCBuild>('/builds/pc', data),
  updatePC: (id: number, data: Partial<PCBuild>) => api.put<PCBuild>(`/builds/pc/${id}`, data),
  deletePC: (id: number) => api.delete(`/builds/pc/${id}`),

  listCCTV: () => api.get<CCTVBuild[]>('/builds/cctv'),
  saveCCTV: (data: Omit<CCTVBuild, 'id' | 'createdAt'>) => api.post<CCTVBuild>('/builds/cctv', data),
  updateCCTV: (id: number, data: Partial<CCTVBuild>) => api.put<CCTVBuild>(`/builds/cctv/${id}`, data),
  deleteCCTV: (id: number) => api.delete(`/builds/cctv/${id}`),
};

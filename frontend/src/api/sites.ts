import apiClient from './client';
import { Site, PageStructure } from '../types';

export const sitesApi = {
  create: async (name: string, slug: string): Promise<Site> => {
    const response = await apiClient.post('/sites', { name, slug });
    return response.data;
  },

  getAll: async (): Promise<Site[]> => {
    const response = await apiClient.get('/sites');
    return response.data;
  },

  getById: async (siteId: string): Promise<Site> => {
    const response = await apiClient.get(`/sites/${siteId}`);
    return response.data;
  },

  update: async (siteId: string, data: Partial<Site>): Promise<Site> => {
    const response = await apiClient.put(`/sites/${siteId}`, data);
    return response.data;
  },

  delete: async (siteId: string): Promise<void> => {
    await apiClient.delete(`/sites/${siteId}`);
  },

  getStructure: async (siteId: string): Promise<PageStructure> => {
    const response = await apiClient.get(`/sites/${siteId}/structure`);
    return response.data;
  },

  updateStructure: async (
    siteId: string,
    structure: Partial<PageStructure>
  ): Promise<PageStructure> => {
    const response = await apiClient.put(`/sites/${siteId}/structure`, structure);
    return response.data;
  },

  publish: async (siteId: string): Promise<{ success: boolean; url: string; publishedAt: string }> => {
    const response = await apiClient.post(`/sites/${siteId}/publish`);
    return response.data;
  },
};

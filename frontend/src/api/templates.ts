import apiClient from './client';
import { Template } from '../types';

export const templatesApi = {
  getAll: async (category?: string): Promise<Template[]> => {
    const response = await apiClient.get('/templates', {
      params: category ? { category } : undefined,
    });
    return response.data;
  },

  getById: async (templateId: string): Promise<Template> => {
    const response = await apiClient.get(`/templates/${templateId}`);
    return response.data;
  },

  apply: async (templateId: string, siteId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post(`/templates/${templateId}/apply/${siteId}`);
    return response.data;
  },
};

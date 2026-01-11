import apiClient from './client';
import { User } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  signup: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/signup', { email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

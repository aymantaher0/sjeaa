import { create } from 'zustand';
import { User } from '../types';
import { authApi } from '../api/mockAuth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('carrd_demo_token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('carrd_demo_token'),

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { user, token } = await authApi.login(email, password);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (email, password) => {
    set({ isLoading: true });
    try {
      const { user, token } = await authApi.signup(email, password);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('carrd_demo_token');
    localStorage.removeItem('carrd_demo_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const token = localStorage.getItem('carrd_demo_token');
    if (!token) return;

    set({ isLoading: true });
    try {
      const user = await authApi.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('carrd_demo_token');
      localStorage.removeItem('carrd_demo_user');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

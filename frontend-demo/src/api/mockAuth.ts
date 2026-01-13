import { User } from '../types';

// Mock user data stored in localStorage
const STORAGE_KEY = 'carrd_demo_user';
const TOKEN_KEY = 'carrd_demo_token';

export interface AuthResponse {
  user: User;
  token: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  signup: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(500); // Simulate network delay

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('carrd_demo_users') || '[]');
    if (existingUsers.find((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    const user: User = {
      id: `user-${Date.now()}`,
      email,
      plan_type: 'free',
      max_sites: 1,
      storage_limit_mb: 50,
      created_at: new Date().toISOString(),
    };

    const token = `mock-token-${Date.now()}`;

    // Save to localStorage
    existingUsers.push({ ...user, password });
    localStorage.setItem('carrd_demo_users', JSON.stringify(existingUsers));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);

    return { user, token };
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(500);

    const users = JSON.parse(localStorage.getItem('carrd_demo_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = `mock-token-${Date.now()}`;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    localStorage.setItem(TOKEN_KEY, token);

    return { user: userWithoutPassword, token };
  },

  getMe: async (): Promise<User> => {
    await delay(200);

    const user = localStorage.getItem(STORAGE_KEY);
    if (!user) {
      throw new Error('Not authenticated');
    }

    return JSON.parse(user);
  },
};

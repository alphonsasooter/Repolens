import axios from 'axios';
import type { AuthResponse, Repository, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('github_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  getGitHubAuthUrl: async () => {
    const response = await api.get('/api/auth/github');
    return response.data.url;
  },
  
  handleCallback: async (code: string): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/callback', { code });
    return response.data;
  },
  
  getUser: async (): Promise<User> => {
    const response = await api.get('/api/auth/user');
    return response.data;
  }
};

export const repoAPI = {
  getRepositories: async (): Promise<Repository[]> => {
    const response = await api.get('/api/repos');
    return response.data;
  },
  
  getRepository: async (owner: string, repo: string) => {
    const response = await api.get(`/api/repos/${owner}/${repo}`);
    return response.data;
  }
};

export default api;
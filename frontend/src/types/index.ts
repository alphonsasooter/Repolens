export interface User {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  email: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  tokenType:string;
  scope:string;
  user: User;
}
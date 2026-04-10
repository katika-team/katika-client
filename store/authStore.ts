import apiClient, { setAuthToken } from '@/lib/axios/client';
import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  username: string;
};

type Session = {
  access_token: string;
  refresh_token: string;
};

type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (idToken: string, accessToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  initialize: async () => {
    set({ loading: false });
  },

  signUp: async (email, password, username) => {
    await apiClient.post('/users/register', { email, password, username });
  },

  signIn: async (email, password) => {
    const res = await apiClient.post('/users/login', { email, password });
    const { user, session } = res.data;
    setAuthToken(session.access_token);
    set({ user, session });
  },

  signInWithGoogle: async (idToken, accessToken) => {
    const res = await apiClient.post('/users/google/exchange', {
      id_token: idToken,
      access_token: accessToken,
    });
    const { user, session } = res.data;
    setAuthToken(session.access_token);
    set({ user, session });
  },

  signOut: async () => {
    setAuthToken(null);
    set({ user: null, session: null });
  },
}));
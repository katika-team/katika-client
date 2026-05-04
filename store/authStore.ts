import apiClient, { setAuthToken } from '@/lib/axios/client';
import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  username: string;
  user_metadata?: {
    user_name?: string;
    full_name?: string;
    name?: string;
    referral_code?: string;
    avatar_url?: string;
  };
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
    const res = await apiClient.post('/users/register', { email, password, username });
    const { user, session } = res.data;
    console.log('📋 signUp response:', JSON.stringify(res.data, null, 2));
    if (session) {
      setAuthToken(session.access_token);
      set({ user, session });
    } else {
      // Email confirmation required — no session yet
      throw new Error('Please check your email to confirm your account before logging in.');
    }
  },

  signIn: async (email, password) => {
    const res = await apiClient.post('/users/login', { email, password });
    const { user, session } = res.data;
    setAuthToken(session.access_token);
    set({ user, session });
    console.log('👤 Logged in user:', JSON.stringify(user, null, 2));
  },

  signInWithGoogle: async (idToken, accessToken) => {
    const res = await apiClient.post('/users/google/exchange', {
      id_token: idToken,
      access_token: accessToken,
    });
    const { user, session } = res.data;
    console.log('👤 Google user metadata:', JSON.stringify(user?.user_metadata, null, 2));
    setAuthToken(session.access_token);
    set({ user, session });
    console.log('👤 Logged in user:', JSON.stringify(user, null, 2));
  },

  signOut: async () => {
    setAuthToken(null);
    set({ user: null, session: null });
  },
}));
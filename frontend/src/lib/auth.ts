import { create } from 'zustand';

interface AuthState {
  user: {
    id: number;
    email: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Try to load initial state from localStorage
const loadInitialState = () => {
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const { user } = JSON.parse(authData);
      return { user, isAuthenticated: true };
    }
  } catch (error) {
    console.error('Error loading auth state:', error);
  }
  return { user: null, isAuthenticated: false };
};

export const useAuth = create<AuthState>((set) => ({
  ...loadInitialState(),
  login: async (email: string, password: string) => {
    try {
      console.log('Starting login process...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      const responseData = await response.text();
      console.log('Raw response:', responseData);

      if (!response.ok) {
        console.error('Login failed:', response.status, response.statusText);
        console.error('Response body:', responseData);
        throw new Error(`Login failed: ${response.statusText}`);
      }

      let data;
      try {
        data = JSON.parse(responseData);
        console.log('Parsed user data:', data);
      } catch (e) {
        console.error('Failed to parse user data:', e);
        throw new Error('Invalid response format');
      }

      console.log('Setting auth state...');
      localStorage.setItem('auth', JSON.stringify(data));
      set({ user: data.user, isAuthenticated: true });
      console.log('Auth state updated, user is now authenticated');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('auth');
    set({ user: null, isAuthenticated: false });
  },
})); 
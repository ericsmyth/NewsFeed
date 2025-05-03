import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Only initialize navigate if we're in the browser
  const navigate = typeof window !== 'undefined' ? useNavigate() : null;

  useEffect(() => {
    // Check for stored auth data
    if (typeof window === 'undefined') return;

    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setAuthState({
          user: authData.user,
          loading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: 'Failed to load authentication data',
        });
      }
    } else {
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (!navigate) return;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('auth', JSON.stringify(data));
      setAuthState({
        user: data.user,
        loading: false,
        error: null,
      });
      navigate('/user');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const logout = () => {
    if (!navigate) return;
    
    localStorage.removeItem('auth');
    setAuthState({
      user: null,
      loading: false,
      error: null,
    });
    navigate('/');
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
  };
}; 
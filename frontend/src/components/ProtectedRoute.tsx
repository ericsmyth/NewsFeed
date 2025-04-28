import { useEffect, useState, type ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          // Not authenticated, redirect to login
          window.location.href = '/login';
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking auth status:', error);
        window.location.href = '/login';
      }
    };

    checkAuth();
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // If authenticated, show the protected content
  return isAuthenticated ? <>{children}</> : null;
} 
import { useState, useEffect } from 'react';
import { getStoredTheme, setStoredTheme } from '../lib/theme';
import type { Theme } from '../lib/theme';
import { useAuth } from '../lib/auth';

export default function UserDashboardWrapper() {
  console.log('UserDashboardWrapper mounting...');
  const [currentTheme, setCurrentTheme] = useState<Theme>(getStoredTheme());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const auth = useAuth();

  useEffect(() => {
    console.log('Running auth check effect...');
    const checkAuth = async () => {
      try {
        console.log('Checking auth status...');
        const response = await fetch('/api/auth/user', {
          credentials: 'include'
        });
        
        console.log('Auth response status:', response.status);
        
        if (!response.ok) {
          console.log('Not authenticated, redirecting to login...');
          window.location.href = '/login';
          return;
        }
        
        console.log('User is authenticated');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking auth status:', error);
        window.location.href = '/login';
      }
    };

    // Check if we're already authenticated from the auth store
    if (auth.isAuthenticated && auth.user) {
      console.log('Already authenticated from store');
      setIsAuthenticated(true);
    } else {
      checkAuth();
    }
  }, [auth.isAuthenticated, auth.user]);

  const handleThemeChange = async (newTheme: Theme) => {
    try {
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newTheme }),
      });

      if (response.ok) {
        setStoredTheme(newTheme);
        setCurrentTheme(newTheme);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    console.log('Still checking authentication...');
    return null;
  }

  console.log('Rendering dashboard content...');
  // Only render if authenticated
  return isAuthenticated ? (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Theme Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <label className="text-lg">Theme</label>
          <select
            value={currentTheme}
            onChange={(e) => handleThemeChange(e.target.value as Theme)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
    </div>
  ) : null;
} 
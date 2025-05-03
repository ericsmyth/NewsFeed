import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTheme, setTheme, applyTheme, type Theme } from '../utils/theme';
import { NewsApiOrg } from './NewsApiOrg';
import { UserSidebar } from './UserSidebar';

export const UserDashboardWrapper = () => {
  // Only run auth check on client side
  const [isClient, setIsClient] = useState(false);
  const { user, logout } = useAuth();
  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme());

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log('User object:', user);
  }, [user]);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  useEffect(() => {
    // Apply initial theme
    if (isClient) {
      applyTheme(currentTheme);
    }
  }, [isClient, currentTheme]);

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  // Only check for user after client-side hydration
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full h-full" style={{ maxWidth: '1280px' }}>
        <div className="flex min-h-screen">
          {/* Main content area */}
          <div className="flex-1 overflow-auto px-4 py-6">
            <NewsApiOrg />
          </div>

          {/* Sidebar */}
          <UserSidebar 
            user={user} 
            currentTheme={currentTheme} 
            onThemeChange={handleThemeChange} 
          />
        </div>
      </div>
    </div>
  );
}; 
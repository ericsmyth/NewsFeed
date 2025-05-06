import React from 'react';
import { type Theme } from '../utils/theme';

type UserSidebarProps = {
  user: { name: string };
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  isMobile?: boolean;
};

export const UserSidebar: React.FC<UserSidebarProps> = ({ 
  user, 
  currentTheme, 
  onThemeChange,
  isMobile = false 
}) => {
  const sidebarClasses = isMobile
    ? 'w-full bg-white dark:bg-gray-800 shadow-md p-2 rounded-[30px] flex flex-col items-stretch space-y-2'
    : 'md:w-64 w-full bg-white dark:bg-gray-800 shadow-lg p-6 rounded-[30px] m-4';

  return (
    <div className={sidebarClasses}>
      <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
          Welcome, {user.name || 'User'}
        </h2>
        <label htmlFor="theme-select" className="sr-only">Theme:</label>
        <select
          value={currentTheme}
          onChange={(e) => onThemeChange(e.target.value as Theme)}
          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
          id="theme-select"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}; 
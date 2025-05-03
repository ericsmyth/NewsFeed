import { type Theme } from '../utils/theme';

interface UserSidebarProps {
  user: {
    name?: string;
  };
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const UserSidebar = ({ user, currentTheme, onThemeChange }: UserSidebarProps) => {
  return (
    <div className="w-44 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 p-4 min-h-screen">
      <div className="mb-6">
        <h5 className="text-lg font-semibold">Welcome, {typeof user === 'object' && user.name ? user.name : 'User'}</h5>
      </div>

      <div className="space-y-2">
        <label htmlFor="theme-select" className="block text-sm font-medium mb-1">
          Theme:
        </label>
        <select
          id="theme-select"
          value={currentTheme}
          onChange={(e) => onThemeChange(e.target.value as Theme)}
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}; 
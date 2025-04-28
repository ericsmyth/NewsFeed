import { useAuth } from '../../lib/auth';
import { getStoredTheme } from '../../lib/theme';

export default function UserDashboard() {
  const theme = getStoredTheme();
  const user = useAuth((state) => state.user);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name || 'User'}!</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
          <form className="space-y-4" id="themeForm">
            <div className="flex items-center">
              <input
                type="radio"
                id="light"
                name="theme"
                value="light"
                checked={theme === 'light'}
                className="mr-2"
              />
              <label htmlFor="light">Light Theme</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="dark"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                className="mr-2"
              />
              <label htmlFor="dark">Dark Theme</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="system"
                name="theme"
                value="system"
                checked={theme === 'system'}
                className="mr-2"
              />
              <label htmlFor="system">System Theme</label>
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your news feed experience by adjusting your preferences here.
          </p>
        </div>
      </div>
    </main>
  );
} 
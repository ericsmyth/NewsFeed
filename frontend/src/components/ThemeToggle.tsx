import { useEffect } from 'react';
import { getStoredTheme, setStoredTheme, applyTheme, type Theme } from '../lib/theme';

export default function ThemeToggle() {
  useEffect(() => {
    const currentTheme = getStoredTheme();
    document.querySelector(`[data-theme="${currentTheme}"]`)?.classList.add('active');
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setStoredTheme(newTheme);
    applyTheme(newTheme);
    
    // Update active state
    document.querySelectorAll('.theme-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-theme="${newTheme}"]`)?.classList.add('active');
  };

  return (
    <div className="theme-toggle">
      <button
        className="theme-button"
        data-theme="light"
        aria-label="Light theme"
        onClick={() => handleThemeChange('light')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>
      <button
        className="theme-button"
        data-theme="dark"
        aria-label="Dark theme"
        onClick={() => handleThemeChange('dark')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
      <button
        className="theme-button"
        data-theme="system"
        aria-label="System theme"
        onClick={() => handleThemeChange('system')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      </button>

      <style>{`
        .theme-toggle {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--surface-2);
          border-radius: 0.5rem;
        }

        .theme-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border: none;
          background: transparent;
          color: var(--text-2);
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-button:hover {
          background: var(--surface-3);
          color: var(--text-1);
        }

        .theme-button.active {
          background: var(--surface-4);
          color: var(--text-1);
        }

        .theme-button svg {
          width: 1.25rem;
          height: 1.25rem;
        }
      `}</style>
    </div>
  );
} 
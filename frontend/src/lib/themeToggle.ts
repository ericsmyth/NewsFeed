import { type Theme, getStoredTheme, setStoredTheme, applyTheme } from './theme';

export function initThemeToggle() {
  // Get the current theme
  const currentTheme = getStoredTheme();
  
  // Set initial active state
  document.querySelector(`[data-theme="${currentTheme}"]`)?.classList.add('active');
  
  // Handle theme changes
  document.querySelectorAll('.theme-button').forEach(button => {
    button.addEventListener('click', () => {
      const newTheme = button.getAttribute('data-theme') as Theme;
      if (newTheme) {
        setStoredTheme(newTheme);
        applyTheme(newTheme);
        
        // Update active state
        document.querySelectorAll('.theme-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      }
    });
  });
}

// Initialize when the DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
} 
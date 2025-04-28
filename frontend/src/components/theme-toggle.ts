import { getStoredTheme, setStoredTheme, applyTheme } from '../lib/theme';

// Set initial active state
const currentTheme = getStoredTheme();
document.querySelector(`[data-theme="${currentTheme}"]`)?.classList.add('active');

// Handle theme changes
document.querySelectorAll('.theme-button').forEach(button => {
  button.addEventListener('click', () => {
    const newTheme = button.getAttribute('data-theme');
    if (newTheme && (newTheme === 'light' || newTheme === 'dark' || newTheme === 'system')) {
      setStoredTheme(newTheme);
      applyTheme(newTheme);
      
      // Update active state
      document.querySelectorAll('.theme-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    }
  });
}); 
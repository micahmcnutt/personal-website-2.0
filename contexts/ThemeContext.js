import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Prevent transition flash on initial load
    document.documentElement.classList.add('no-transition');
    
    const initializeTheme = () => {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      // Use saved theme or fall back to system preference
      const initialTheme = savedTheme || systemTheme;
      
      setTheme(initialTheme);
      setMounted(true);
      
      // Apply theme immediately without transition
      applyTheme(initialTheme, false);
      
      // Remove no-transition class after a short delay to enable transitions
      setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
      }, 100);
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme, true);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const applyTheme = (newTheme, withTransition = true) => {
    const root = document.documentElement;
    
    if (withTransition) {
      // Add transition class
      root.classList.add('theme-transition');
      
      // Remove transition class after animation
      setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300);
    }
    
    // Apply theme class
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#111827' : '#ffffff');
    }
  };

  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent rapid toggles
    
    setIsTransitioning(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    applyTheme(newTheme, true);
    
    // Reset transitioning state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const setThemeMode = (mode) => {
    if (isTransitioning || !['light', 'dark'].includes(mode)) return;
    
    setIsTransitioning(true);
    setTheme(mode);
    applyTheme(mode, true);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Don't render children until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isTransitioning,
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 
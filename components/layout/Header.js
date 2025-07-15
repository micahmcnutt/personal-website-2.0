import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Navigation from './Navigation';

const Header = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleThemeToggle = () => {
    if (!isTransitioning) {
      toggleTheme();
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-primary theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-xl font-bold text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Micah McNutt
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              disabled={isTransitioning}
              className={`btn-theme-toggle group relative overflow-hidden ${
                isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <div className="relative z-10 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500 transition-all duration-300 group-hover:rotate-180" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:rotate-12" />
                )}
              </div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200 bg-blue-500 rounded-lg"></div>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden btn-theme-toggle group"
              aria-label="Toggle mobile menu"
            >
              <div className="relative z-10 flex items-center justify-center">
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-secondary transition-all duration-200 group-hover:rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 text-secondary transition-all duration-200 group-hover:scale-110" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-primary">
            <Navigation mobile onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
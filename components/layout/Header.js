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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-primary theme-transition">
      <div className="container-responsive max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-fluid-lg lg:text-fluid-xl font-bold text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover-scale touch-target"
            >
              Micah McNutt
            </a>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Navigation />
            <div className="w-px h-6 bg-primary opacity-30"></div>
            <button
              onClick={handleThemeToggle}
              disabled={isTransitioning}
              className="p-2 lg:p-3 rounded-lg bg-secondary hover:bg-tertiary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover-scale touch-target"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
              ) : (
                <Sun className="h-5 w-5 lg:h-6 lg:w-6 text-primary animate-spin" style={{ animationDuration: '8s' }} />
              )}
            </button>
          </div>

          {/* Enhanced Mobile Menu Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              disabled={isTransitioning}
              className="p-2 rounded-lg bg-secondary hover:bg-tertiary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover-scale touch-target"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary animate-spin" style={{ animationDuration: '8s' }} />
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-secondary hover:bg-tertiary transition-all duration-200 hover-scale touch-target"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-primary animate-scale-in" />
              ) : (
                <Menu className="h-5 w-5 text-primary animate-scale-in" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-96 opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-2'
        } overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-primary animate-fade-in">
            <Navigation mobile onItemClick={closeMobileMenu} />
            
            {/* Mobile Menu Footer */}
            <div className="pt-4 mt-4 border-t border-primary">
              <div className="flex items-center justify-between">
                <span className="text-fluid-sm text-secondary">
                  Theme: {theme === 'light' ? 'Light' : 'Dark'}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-fluid-xs text-tertiary">
                    {theme === 'light' ? '☀️' : '🌙'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header; 
import Head from 'next/head';
import { useTheme } from '../../contexts/ThemeContext';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'Micah McNutt - Personal Website', description = 'Personal website and portfolio of Micah McNutt' }) => {
  const { theme, isDark } = useTheme();
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={isDark ? '#111827' : '#ffffff'} />
        <meta name="color-scheme" content={theme} />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahmcnutt.github.io" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* Font preloading removed - no custom fonts currently */}
      </Head>
      
      <div className="min-h-screen bg-secondary flex flex-col theme-transition">
        <Header />
        
        <main className="flex-1 theme-transition">
          <div className="theme-transition">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout; 
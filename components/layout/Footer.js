import { Github, Linkedin, Twitter, Instagram, Youtube, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/yourusername',
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-white hover:scale-110'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/yourprofile',
      label: 'LinkedIn',
      color: 'hover:text-blue-600 hover:scale-110'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
      color: 'hover:text-blue-400 hover:scale-110'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/yourusername',
      label: 'Instagram',
      color: 'hover:text-pink-600 hover:scale-110'
    },
    { 
      icon: Youtube, 
      href: 'https://youtube.com/c/yourchannel',
      label: 'YouTube',
      color: 'hover:text-red-600 hover:scale-110'
    },
    { 
      icon: Mail, 
      href: 'mailto:micah.mcnutt@example.com',
      label: 'Email',
      color: 'hover:text-green-600 hover:scale-110'
    }
  ];

  return (
    <footer className="bg-primary border-t border-primary theme-transition">
      <div className="container-responsive max-w-7xl mx-auto">
        <div className="py-8 lg:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 gap-6">
            
            {/* Enhanced Brand Section */}
            <div className="text-center md:text-left">
              <h3 className="text-fluid-lg lg:text-fluid-xl font-bold text-primary mb-2">
                Micah McNutt
              </h3>
              <p className="text-fluid-sm text-secondary max-w-md">
                Full-stack developer passionate about creating innovative solutions 
                and beautiful user experiences.
              </p>
            </div>
            
            {/* Enhanced Social Links */}
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex items-center space-x-3 lg:space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 lg:p-3 rounded-lg bg-secondary hover:bg-tertiary transition-all duration-200 ${social.color} touch-target`}
                      aria-label={`Visit my ${social.label} profile`}
                    >
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                    </a>
                  );
                })}
              </div>
              
              {/* Enhanced Copyright */}
              <div className="text-center md:text-right">
                <p className="text-fluid-xs text-secondary">
                  © {currentYear} Micah McNutt. All rights reserved.
                </p>
                <p className="text-fluid-xs text-tertiary mt-1 flex items-center justify-center md:justify-end gap-1">
                  Made with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> using Next.js & Tailwind CSS
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Additional Info */}
          <div className="mt-8 pt-8 border-t border-primary">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 gap-4">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 lg:gap-6">
                <a 
                  href="/privacy" 
                  className="text-fluid-xs text-secondary hover:text-primary transition-colors duration-200 hover-scale"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  className="text-fluid-xs text-secondary hover:text-primary transition-colors duration-200 hover-scale"
                >
                  Terms of Service
                </a>
                <a 
                  href="/sitemap" 
                  className="text-fluid-xs text-secondary hover:text-primary transition-colors duration-200 hover-scale"
                >
                  Sitemap
                </a>
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-fluid-xs text-tertiary">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-fluid-xs text-tertiary mt-1">
                  Version 2.0.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
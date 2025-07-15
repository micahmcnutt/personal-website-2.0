import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white hover:scale-110'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourprofile',
      icon: Linkedin,
      color: 'hover:text-blue-600 hover:scale-110'
    },
    {
      name: 'Email',
      href: 'mailto:your.email@example.com',
      icon: Mail,
      color: 'hover:text-red-600 hover:scale-110'
    }
  ];

  return (
    <footer className="bg-primary border-t border-primary theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-3 rounded-full bg-tertiary text-tertiary transition-all duration-300 
                      ${link.color} shadow-sm hover:shadow-md
                      transform hover:-translate-y-1 active:translate-y-0
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    `}
                    aria-label={`Follow on ${link.name}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-secondary font-medium">
                © {new Date().getFullYear()} Micah McNutt. All rights reserved.
              </p>
              <p className="text-xs text-tertiary mt-1 flex items-center justify-center md:justify-end gap-1">
                Built with 
                <span className="text-blue-600 dark:text-blue-400 font-medium">Next.js</span>
                and
                <span className="text-blue-600 dark:text-blue-400 font-medium">Tailwind CSS</span>
                <span className="animate-pulse">💙</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
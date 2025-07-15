import { useRouter } from 'next/router';
import Link from 'next/link';

const Navigation = ({ mobile = false, onItemClick }) => {
  const router = useRouter();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' }
  ];

  const baseClasses = mobile 
    ? "block px-3 py-2 rounded-md text-base font-medium transition-colors"
    : "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors";

  const activeClasses = "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
  const inactiveClasses = "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800";

  return (
    <nav className={mobile ? "space-y-1" : "flex space-x-2"}>
      {navItems.map((item) => {
        const isActive = router.pathname === item.href;
        const classes = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={classes}
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation; 
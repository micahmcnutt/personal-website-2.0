import Link from 'next/link';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  type = 'button',
  className = '',
  target,
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-primary hover:bg-tertiary focus:ring-gray-500 border border-primary shadow-sm hover:shadow-md',
    outline: 'border border-primary bg-transparent text-primary hover:bg-tertiary focus:ring-blue-500 shadow-sm hover:shadow-md',
    ghost: 'text-secondary hover:text-primary hover:bg-tertiary focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    gradient: 'gradient-primary text-white hover:opacity-90 focus:ring-blue-500 shadow-lg hover:shadow-xl'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a 
          href={href} 
          target={target || '_blank'}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className={classes}
          {...props}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type={type} 
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 
const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseClasses = 'bg-primary rounded-lg shadow-sm border border-primary transition-all duration-300';
  const paddingClasses = 'p-6';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  
  const classes = `${baseClasses} ${paddingClasses} ${hoverClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 
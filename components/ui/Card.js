const Card = ({ children, className = '', ...props }) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700';
  const paddingClasses = 'p-6';
  
  const classes = `${baseClasses} ${paddingClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 
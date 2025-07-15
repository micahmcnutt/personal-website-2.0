 // Centralized authentication configuration
export const AUTH_CONFIG = {
  // Change this password to your desired admin password
  ADMIN_PASSWORD: 'C7+$stlso8aph*vl#wlw',
  
  // Optional: Add password requirements
  MIN_PASSWORD_LENGTH: 8,
  
  // Session duration (in milliseconds)
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
};

// Simple authentication helper
export const authenticateUser = (inputPassword) => {
  return inputPassword === AUTH_CONFIG.ADMIN_PASSWORD;
};

// Check if password meets requirements
export const validatePassword = (password) => {
  if (password.length < AUTH_CONFIG.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} characters long`
    };
  }
  
  // Add more validation rules as needed
  return { isValid: true, message: '' };
};

// Generate a secure random password (helper function)
export const generateSecurePassword = (length = 12) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Enhanced authentication with session management
export const createAuthSession = () => {
  const session = {
    authenticated: true,
    timestamp: Date.now(),
    expires: Date.now() + AUTH_CONFIG.SESSION_DURATION
  };
  
  // Store in localStorage (for demo purposes)
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminSession', JSON.stringify(session));
  }
  
  return session;
};

// Check if current session is valid
export const isSessionValid = () => {
  if (typeof window === 'undefined') return false;
  
  const sessionData = localStorage.getItem('adminSession');
  if (!sessionData) return false;
  
  try {
    const session = JSON.parse(sessionData);
    return session.authenticated && Date.now() < session.expires;
  } catch (error) {
    return false;
  }
};

// Clear authentication session
export const clearAuthSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminSession');
  }
};

export default {
  AUTH_CONFIG,
  authenticateUser,
  validatePassword,
  generateSecurePassword,
  createAuthSession,
  isSessionValid,
  clearAuthSession
}; 
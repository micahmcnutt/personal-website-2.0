# Admin Password Change Guide

## Quick Password Change

### Step 1: Update the Password

1. Open `utils/auth.js`
2. Find this line:
   ```javascript
   ADMIN_PASSWORD: 'your-new-secure-password-here',
   ```
3. Replace `'your-new-secure-password-here'` with your desired password:
   ```javascript
   ADMIN_PASSWORD: 'MySecurePassword123!',
   ```

### Step 2: Deploy Changes

1. Save the file
2. Build and test locally: `npm run build`
3. Commit and push to GitHub:
   ```bash
   git add utils/auth.js
   git commit -m "Update admin password"
   git push origin main
   ```

### Step 3: Test the New Password

1. Wait for deployment to complete
2. Visit your admin panel: `https://yourdomain.com/admin`
3. Use your new password to log in

## Security Recommendations

### Strong Password Guidelines

Use a password that includes:
- At least 12 characters
- Mix of uppercase and lowercase letters
- Numbers and special characters
- No personal information or common words

### Password Generation

The auth utility includes a password generator. You can use it to create a secure password:

```javascript
import { generateSecurePassword } from '../utils/auth';

// Generate a 16-character secure password
const newPassword = generateSecurePassword(16);
console.log(newPassword);
```

### Example Strong Passwords

```javascript
// Good examples:
ADMIN_PASSWORD: 'MyWebsite2024!Secure#',
ADMIN_PASSWORD: 'Admin$2024*Portfolio@',
ADMIN_PASSWORD: 'PersonalSite!2024#Admin',

// Bad examples (avoid these):
ADMIN_PASSWORD: 'admin123',
ADMIN_PASSWORD: 'password',
ADMIN_PASSWORD: 'yourname',
```

## Enhanced Security Features

### Session Management

The new authentication system includes:
- **Session Duration**: 24 hours by default
- **Automatic Logout**: Session expires after inactivity
- **Session Storage**: Stored in browser localStorage

### Customizing Session Duration

To change how long users stay logged in:

```javascript
// In utils/auth.js
SESSION_DURATION: 8 * 60 * 60 * 1000, // 8 hours
SESSION_DURATION: 1 * 60 * 60 * 1000, // 1 hour
SESSION_DURATION: 30 * 60 * 1000,     // 30 minutes
```

### Password Requirements

You can add password validation:

```javascript
// In utils/auth.js
MIN_PASSWORD_LENGTH: 12, // Require 12+ characters

// Add custom validation in validatePassword function
export const validatePassword = (password) => {
  if (password.length < AUTH_CONFIG.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} characters long`
    };
  }
  
  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }
  
  // Check for special character
  if (!/[!@#$%^&*]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character'
    };
  }
  
  return { isValid: true, message: '' };
};
```

## Advanced Security Options

### Environment Variables (Recommended)

For production use, consider using environment variables:

1. Create a `.env.local` file (never commit this):
   ```
   ADMIN_PASSWORD=your-secure-password-here
   ```

2. Update `utils/auth.js`:
   ```javascript
   ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'fallback-password',
   ```

3. Configure your hosting platform with the environment variable

### Multiple Admin Users

To support multiple admin users, you can modify the authentication:

```javascript
// In utils/auth.js
const ADMIN_USERS = {
  'admin': 'secure-admin-password',
  'editor': 'secure-editor-password',
  'owner': 'secure-owner-password'
};

export const authenticateUser = (username, password) => {
  return ADMIN_USERS[username] === password;
};
```

### IP Restrictions

For extra security, you can add IP-based restrictions:

```javascript
// In utils/auth.js
const ALLOWED_IPS = ['192.168.1.100', '10.0.0.50'];

export const checkIPAccess = (req) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return ALLOWED_IPS.includes(clientIP);
};
```

## File Structure

The authentication system uses these files:

```
utils/
├── auth.js                 # Main authentication configuration

pages/admin/
├── index.js               # Main admin dashboard
├── projects.js            # Project management
└── contact.js             # Contact management
```

## Troubleshooting

### Common Issues

1. **Password not working after change**
   - Check that the file was saved correctly
   - Verify the deployment completed successfully
   - Clear browser cache and try again

2. **Session expires immediately**
   - Check that localStorage is enabled in browser
   - Verify SESSION_DURATION is set correctly
   - Check browser console for JavaScript errors

3. **Can't access admin panel**
   - Verify the admin pages deployed correctly
   - Check that JavaScript is enabled in browser
   - Try accessing from a different browser

### Security Best Practices

1. **Never commit passwords to Git**
   - Use environment variables for production
   - Add sensitive files to `.gitignore`

2. **Regular password rotation**
   - Change passwords every 3-6 months
   - Use unique passwords for each environment

3. **Monitor access logs**
   - Check for unusual login attempts
   - Monitor deployment logs for errors

4. **Backup before changes**
   - Create backups before changing passwords
   - Test in development environment first

## Support

If you need help with password changes:

1. Check the console for error messages
2. Verify all files are updated correctly
3. Test the build process locally
4. Review the deployment logs

Remember: The admin password protects your website's content management system. Choose a strong, unique password and keep it secure! 
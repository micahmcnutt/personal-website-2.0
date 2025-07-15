# Content Management System Guide

## Overview

This personal website includes a powerful, easy-to-use content management system that allows you to update all website content without editing code directly. The system is designed to be user-friendly while providing comprehensive control over your site's content.

## Features

- **Unified Admin Dashboard**: All content management tools in one place
- **Visual Editor**: Easy-to-use forms for editing content
- **Real-time Preview**: See changes as you make them
- **Export/Import**: Backup and restore your content
- **Password Protection**: Secure admin access
- **Mobile Responsive**: Manage content from any device

## Getting Started

### Accessing the Admin Panel

1. Navigate to `/admin` on your website
2. Enter the password (`admin123` for demo)
3. You'll see the admin dashboard with all available modules

### Admin Dashboard Overview

The dashboard provides:
- **Overview**: Site statistics and quick actions
- **Site Configuration**: Edit personal info and site settings
- **Projects**: Manage portfolio projects
- **Contact & Social**: Update contact information and social links
- **User Guide**: Built-in documentation

## Module Guide

### 1. Site Configuration

The Site Configuration module allows you to edit all site-wide content:

#### Personal Information
- **Name**: Your display name
- **Title**: Your professional title (e.g., "Full-Stack Developer")
- **Bio**: Your main bio/description
- **Tagline**: Additional personal statement
- **Email & Phone**: Contact information
- **Location**: Your location
- **Resume URL**: Link to your resume

#### Hero Section
- **Greeting**: Welcome message (e.g., "Hi, I'm")
- **Name**: Your name for the hero section
- **Subtitle**: Call-to-action title
- **Description**: Hero section description
- **Buttons**: Primary and secondary button text and URLs

#### Social Links
- **Platform Management**: Enable/disable social platforms
- **URLs**: Update profile URLs
- **Usernames**: Set display usernames

#### Stats & Skills
- **Homepage Stats**: Edit the statistics displayed on homepage
- **Skills**: Manage skill levels and colors
- **Categories**: Add/remove skill categories

#### Export/Import
- **Export**: Copy configuration code to clipboard
- **Download**: Save configuration as JSON file
- **Import**: Restore from backup file

### 2. Projects Management

Manage your portfolio projects:

#### Adding Projects
1. Click "Add Project" button
2. Fill in project details:
   - **Title**: Project name
   - **Description**: Detailed project description
   - **Category**: web, mobile, backend, tools
   - **Technologies**: List of technologies used
   - **Live URL**: Link to live project
   - **GitHub URL**: Link to source code
   - **Featured**: Mark as featured for homepage display
   - **Image**: Project screenshot/image

#### Editing Projects
1. Click edit icon on any project
2. Modify fields as needed
3. Save changes

#### Organization
- **Categories**: Filter projects by type
- **Featured**: Mark important projects for homepage
- **Search**: Find specific projects quickly

### 3. Contact & Social Management

Update contact information and social media links:

#### Contact Information
- **Email**: Primary contact email
- **Phone**: Contact phone number
- **Location**: Your location
- **WhatsApp**: WhatsApp contact number
- **Descriptions**: Add context for each contact method

#### Social Media
- **Platforms**: GitHub, LinkedIn, Twitter, Instagram, YouTube, Portfolio
- **URLs**: Update profile links
- **Visibility**: Show/hide specific platforms
- **Descriptions**: Add descriptions for each platform

## Deployment Process

### Step-by-Step Deployment

1. **Make Changes**: Use the admin interface to edit content
2. **Export Configuration**: Use the export feature to copy code
3. **Update Files**: Paste the code into the appropriate data files:
   - Site configuration → `data/siteConfig.js`
   - Project data → `data/projects.js`
   - Contact data → Update through ContactManager export
4. **Commit Changes**: Use git to commit your changes
5. **Push to GitHub**: Push changes to trigger automatic deployment
6. **Verify Deployment**: Check GitHub Actions for successful deployment

### File Structure

```
data/
├── siteConfig.js      # Site-wide configuration
├── projects.js        # Portfolio projects
└── contact.js         # Contact information

public/
├── images/
│   ├── projects/      # Project images
│   └── profile.jpg    # Profile picture

pages/
├── admin/
│   ├── index.js       # Main admin dashboard
│   ├── projects.js    # Project management
│   └── contact.js     # Contact management

components/
├── admin/
│   ├── SiteConfigManager.js  # Site configuration
│   ├── ProjectManager.js     # Project management
│   └── ContactManager.js     # Contact management
```

## Best Practices

### Content Management

1. **Regular Updates**: Keep your portfolio current with new projects
2. **Image Optimization**: Use optimized images (under 500KB)
3. **Consistent Naming**: Use consistent project and category names
4. **Backup First**: Always backup before major changes
5. **Test Locally**: Test changes locally before deploying

### Security

1. **Change Password**: Update the admin password from default
2. **Regular Backups**: Export configurations regularly
3. **Secure Access**: Don't share admin credentials
4. **Monitor Access**: Check for unauthorized access

### Performance

1. **Optimize Images**: Compress images before uploading
2. **Clean Data**: Remove unused projects and data
3. **Regular Maintenance**: Keep dependencies updated
4. **Monitor Loading**: Check site performance regularly

## Troubleshooting

### Common Issues

#### Deployment Fails
- Check GitHub Actions logs for error messages
- Verify all required fields are filled
- Ensure JSON syntax is correct in exported files
- Check for missing dependencies

#### Content Not Updating
- Verify changes were saved in admin panel
- Check that files were properly updated
- Ensure git changes were committed and pushed
- Wait for GitHub Actions to complete

#### Images Not Loading
- Check image URLs are correct
- Verify images are in `public/images/` directory
- Ensure image file names match URLs
- Check file permissions

#### Admin Panel Not Accessible
- Verify password is correct
- Check that admin pages are properly deployed
- Clear browser cache
- Try accessing from different browser

### Getting Help

If you encounter issues:

1. Check the built-in User Guide in the admin panel
2. Review GitHub Actions logs for deployment errors
3. Verify all files are properly structured
4. Check browser console for JavaScript errors
5. Ensure all dependencies are installed

## Advanced Features

### Custom Styling

You can customize the admin interface by:
- Modifying admin component styles
- Adding custom CSS classes
- Updating theme colors
- Creating custom form components

### Extensions

The system can be extended with:
- Additional content types
- Custom field types
- Advanced image management
- Integration with external services

### API Integration

For advanced users, you can:
- Add database integration
- Implement real-time updates
- Create automated backups
- Add user authentication

## Maintenance

### Regular Tasks

1. **Content Updates**: Add new projects monthly
2. **Link Verification**: Check external links quarterly
3. **Image Optimization**: Optimize images as needed
4. **Backup Creation**: Create backups before major changes
5. **Security Updates**: Keep dependencies updated

### Monitoring

- Check deployment success regularly
- Monitor site performance
- Review analytics data
- Update contact information as needed

## Conclusion

This content management system provides a powerful yet user-friendly way to maintain your personal website. With its intuitive interface and comprehensive features, you can easily keep your site updated and professional without technical expertise.

The system is designed to grow with your needs, offering both simplicity for everyday updates and advanced features for customization. Regular use of the admin panel will help you maintain a current, engaging online presence.

For additional support or feature requests, refer to the repository documentation or contact the development team. 
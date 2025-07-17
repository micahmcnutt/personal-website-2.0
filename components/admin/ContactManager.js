import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, Mail, Phone, MapPin, MessageCircle,
  Github, Linkedin, Twitter, Instagram, Youtube, Globe, Upload, Copy,
  AlertCircle, CheckCircle, RefreshCw, Zap
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getSiteConfig, saveSiteConfig, GitHubSync } from '../../utils/dataManager';

// Extracted ContactForm component - isolated from parent re-renders
const ContactForm = ({ 
  contactFormData, 
  editingContact, 
  onInputChange,
  onSave, 
  onCancel,
  iconOptions 
}) => (
  <Card className="mb-6">
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {editingContact ? 'Edit Contact Info' : 'Add Contact Info'}
        </h3>
        <Button
          onClick={onCancel}
          variant="outline"
          size="sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon
          </label>
          <select
            value={contactFormData.icon}
            onChange={(e) => onInputChange('icon', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {iconOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Label *
          </label>
          <input
            type="text"
            value={contactFormData.label}
            onChange={(e) => onInputChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., Email, Phone"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Value *
          </label>
          <input
            type="text"
            value={contactFormData.value}
            onChange={(e) => onInputChange('value', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., your@email.com, +1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Link (optional)
          </label>
          <input
            type="text"
            value={contactFormData.href}
            onChange={(e) => onInputChange('href', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., mailto:your@email.com, tel:+1555123456"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <input
            type="text"
            value={contactFormData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., Best for project inquiries"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button onClick={onSave} variant="primary">
          <Save className="h-4 w-4 mr-2" />
          Save Contact
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  </Card>
);

// Extracted SocialForm component - isolated from parent re-renders
const SocialForm = ({ 
  socialFormData, 
  editingSocial, 
  onInputChange,
  onSave, 
  onCancel,
  socialIconOptions,
  colorOptions 
}) => (
  <Card className="mb-6">
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {editingSocial ? 'Edit Social Link' : 'Add Social Link'}
        </h3>
        <Button
          onClick={onCancel}
          variant="outline"
          size="sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Platform Name *
          </label>
          <input
            type="text"
            value={socialFormData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., GitHub, LinkedIn"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL *
          </label>
          <input
            type="url"
            value={socialFormData.href}
            onChange={(e) => onInputChange('href', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon
          </label>
          <select
            value={socialFormData.icon}
            onChange={(e) => onInputChange('icon', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {socialIconOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hover Color
          </label>
          <select
            value={socialFormData.color}
            onChange={(e) => onInputChange('color', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <input
            type="text"
            value={socialFormData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., Check out my code"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button onClick={onSave} variant="primary">
          <Save className="h-4 w-4 mr-2" />
          Save Social Link
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  </Card>
);

const ContactManager = ({ onSave }) => {
  const [syncStatus, setSyncStatus] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [siteConfig, setSiteConfig] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  const [editingContact, setEditingContact] = useState(null);
  const [editingSocial, setEditingSocial] = useState(null);
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [isCreatingSocial, setIsCreatingSocial] = useState(false);

  const [contactFormData, setContactFormData] = useState({
    icon: 'Mail',
    label: '',
    value: '',
    href: '',
    description: ''
  });

  const [socialFormData, setSocialFormData] = useState({
    name: '',
    href: '',
    icon: 'Github',
    color: 'hover:text-gray-900 dark:hover:text-white',
    description: ''
  });

  const iconOptions = [
    { value: 'Mail', label: 'Email' },
    { value: 'Phone', label: 'Phone' },
    { value: 'MapPin', label: 'Location' },
    { value: 'MessageCircle', label: 'Message' },
    { value: 'Globe', label: 'Website' }
  ];

  const socialIconOptions = [
    { value: 'Github', label: 'GitHub' },
    { value: 'Linkedin', label: 'LinkedIn' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Youtube', label: 'YouTube' },
    { value: 'Globe', label: 'Website' },
    { value: 'MessageCircle', label: 'Messenger' }
  ];

  const colorOptions = [
    { value: 'hover:text-gray-900 dark:hover:text-white', label: 'Gray' },
    { value: 'hover:text-blue-600', label: 'Blue' },
    { value: 'hover:text-blue-400', label: 'Light Blue' },
    { value: 'hover:text-pink-600', label: 'Pink' },
    { value: 'hover:text-red-600', label: 'Red' },
    { value: 'hover:text-green-600', label: 'Green' },
    { value: 'hover:text-purple-600', label: 'Purple' },
    { value: 'hover:text-yellow-600', label: 'Yellow' }
  ];

  // Convert siteConfig to ContactManager format
  const convertSiteConfigToContactFormat = (config) => {
    if (!config) return { contactInfo: [], socialLinks: [] };

    // Build contactInfo from siteConfig.personal
    const contactInfo = [];
    if (config.personal?.email) {
      contactInfo.push({
        id: 1,
        icon: 'Mail',
        label: 'Email',
        value: config.personal.email,
        href: `mailto:${config.personal.email}`,
        description: 'Best for project inquiries'
      });
    }
    if (config.personal?.phone) {
      contactInfo.push({
        id: 2,
        icon: 'Phone',
        label: 'Phone',
        value: config.personal.phone,
        href: `tel:${config.personal.phone.replace(/\D/g, '')}`,
        description: config.personal.availability || 'Available 9 AM - 6 PM EST'
      });
    }
    if (config.personal?.location) {
      contactInfo.push({
        id: 3,
        icon: 'MapPin',
        label: 'Location',
        value: config.personal.location,
        href: null,
        description: config.personal.timezone || 'Central Time Zone'
      });
    }
    if (config.personal?.phone) {
      contactInfo.push({
        id: 4,
        icon: 'MessageCircle',
        label: 'WhatsApp',
        value: config.personal.phone,
        href: `https://wa.me/${config.personal.phone.replace(/\D/g, '')}`,
        description: 'Quick messages'
      });
    }

    // Build socialLinks from siteConfig.social
    const socialLinks = [];
    let socialId = 1;
    
    if (config.social?.github?.url) {
      socialLinks.push({
        id: socialId++,
        name: 'GitHub',
        href: config.social.github.url,
        icon: 'Github',
        color: 'hover:text-gray-900 dark:hover:text-white',
        description: 'Check out my code'
      });
    }
    if (config.social?.linkedin?.url) {
      socialLinks.push({
        id: socialId++,
        name: 'LinkedIn',
        href: config.social.linkedin.url,
        icon: 'Linkedin',
        color: 'hover:text-blue-600',
        description: 'Professional network'
      });
    }
    if (config.social?.twitter?.url) {
      socialLinks.push({
        id: socialId++,
        name: 'Twitter',
        href: config.social.twitter.url,
        icon: 'Twitter',
        color: 'hover:text-blue-400',
        description: 'Latest updates'
      });
    }
    if (config.social?.instagram?.url) {
      socialLinks.push({
        id: socialId++,
        name: 'Instagram',
        href: config.social.instagram.url,
        icon: 'Instagram',
        color: 'hover:text-pink-600',
        description: 'Behind the scenes'
      });
    }
    if (config.social?.youtube?.url) {
      socialLinks.push({
        id: socialId++,
        name: 'YouTube',
        href: config.social.youtube.url,
        icon: 'Youtube',
        color: 'hover:text-red-600',
        description: 'Tech tutorials'
      });
    }
    if (config.social?.website?.url) {
      socialLinks.push({
        id: socialId++,
        name: 'Portfolio',
        href: config.social.website.url,
        icon: 'Globe',
        color: 'hover:text-green-600',
        description: 'View my work'
      });
    }

    // Add custom contactInfo and socialLinks if they exist
    if (config.contactInfo && Array.isArray(config.contactInfo)) {
      config.contactInfo.forEach((contact) => {
        if (!contactInfo.find(c => c.value === contact.value)) {
          contactInfo.push({
            ...contact,
            id: contact.id || (contactInfo.length + 1)
          });
        }
      });
    }

    if (config.socialLinks && Array.isArray(config.socialLinks)) {
      config.socialLinks.forEach((social) => {
        if (!socialLinks.find(s => s.href === social.href)) {
          socialLinks.push({
            ...social,
            id: social.id || (socialLinks.length + 1)
          });
        }
      });
    }

    return { contactInfo, socialLinks };
  };

  // Convert ContactManager format back to siteConfig
  const updateSiteConfigFromContactData = (contactInfo, socialLinks) => {
    if (!siteConfig) return;

    const updatedConfig = { ...siteConfig };

    // Ensure nested objects exist
    if (!updatedConfig.personal) updatedConfig.personal = {};
    if (!updatedConfig.social) updatedConfig.social = {};

    // Update personal info from contactInfo
    const emailContact = contactInfo.find(c => c.icon === 'Mail' || c.label.toLowerCase().includes('email'));
    const phoneContact = contactInfo.find(c => c.icon === 'Phone' || c.label.toLowerCase().includes('phone'));
    const locationContact = contactInfo.find(c => c.icon === 'MapPin' || c.label.toLowerCase().includes('location'));

    if (emailContact) updatedConfig.personal.email = emailContact.value;
    if (phoneContact) updatedConfig.personal.phone = phoneContact.value;
    if (locationContact) updatedConfig.personal.location = locationContact.value;

    // Update social links
    socialLinks.forEach(social => {
      const socialKey = social.name.toLowerCase();
      if (!updatedConfig.social[socialKey]) updatedConfig.social[socialKey] = {};
      updatedConfig.social[socialKey].url = social.href;
    });

    // Store custom contactInfo and socialLinks arrays
    updatedConfig.contactInfo = contactInfo;
    updatedConfig.socialLinks = socialLinks;

    return updatedConfig;
  };

  const saveToDataManager = (newContactInfo, newSocialLinks) => {
    const updatedConfig = updateSiteConfigFromContactData(newContactInfo, newSocialLinks);
    if (updatedConfig) {
      saveSiteConfig(updatedConfig);
      setSiteConfig(updatedConfig);
    }
  };

  // Load initial data and sync status on component mount
  useEffect(() => {
    const config = getSiteConfig();
    setSiteConfig(config);
    
    const { contactInfo, socialLinks } = convertSiteConfigToContactFormat(config);
    setContactInfo(contactInfo);
    setSocialLinks(socialLinks);
    
    updateSyncStatus();
  }, []);

  const updateSyncStatus = () => {
    const status = GitHubSync.getSyncStatus();
    setSyncStatus(status);
  };

  const quickPublish = async () => {
    if (!syncStatus?.isConfigured) {
      alert('GitHub integration is not configured. Please set it up first.');
      return;
    }

    if (!syncStatus?.pendingChanges) {
      alert('No changes to publish.');
      return;
    }

    const commitMessage = prompt(
      'Enter a commit message for this contact update:',
      'Update contact information via admin panel'
    );
    
    if (!commitMessage) return;

    setIsPublishing(true);
    
    try {
      const result = await GitHubSync.pushToGitHub(commitMessage);
      
      if (result.success) {
        alert('✅ Content published successfully! Your website will update automatically.');
        
        // Auto-refresh admin data from GitHub to stay in sync
        console.log('Auto-refreshing admin data from GitHub...');
        try {
          const refreshResult = await GitHubSync.refreshFromGitHub();
          if (refreshResult.success) {
            // Reload siteConfig and reconstruct contact data
            const freshConfig = getSiteConfig();
            setSiteConfig(freshConfig);
            
            const { contactInfo, socialLinks } = convertSiteConfigToContactFormat(freshConfig);
            setContactInfo(contactInfo);
            setSocialLinks(socialLinks);
            console.log('✅ Admin data auto-refreshed successfully');
          }
        } catch (refreshError) {
          console.warn('Could not auto-refresh admin data:', refreshError);
        }
        
        updateSyncStatus();
      } else if (result.partial) {
        alert(`⚠️ Partially published: ${result.message}\n\nSome content was saved successfully, but there were errors with other parts.`);
        updateSyncStatus();
      } else {
        // Complete failure - try to refresh and suggest retry
        alert(`❌ Publishing failed: ${result.message}\n\nTrying to refresh data from GitHub to resolve conflicts...`);
        
        // Attempt to refresh from GitHub
        const refreshResult = await GitHubSync.refreshFromGitHub();
        if (refreshResult.success) {
          alert(`🔄 Data refreshed successfully. Please try publishing again.\n\n${refreshResult.message}`);
          updateSyncStatus();
        } else {
          alert(`❌ Could not refresh data: ${refreshResult.message}\n\nPlease check your internet connection and GitHub credentials.`);
        }
      }
    } catch (error) {
      alert(`💥 Unexpected error: ${error.message}\n\nPlease try again or check the browser console for more details.`);
      console.error('Publishing error details:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    if (editingContact) {
      setContactFormData({
        icon: editingContact.icon,
        label: editingContact.label,
        value: editingContact.value,
        href: editingContact.href || '',
        description: editingContact.description
      });
    } else {
      setContactFormData({
        icon: 'Mail',
        label: '',
        value: '',
        href: '',
        description: ''
      });
    }
  }, [editingContact]);

  useEffect(() => {
    if (editingSocial) {
      setSocialFormData({
        name: editingSocial.name,
        href: editingSocial.href,
        icon: editingSocial.icon,
        color: editingSocial.color,
        description: editingSocial.description
      });
    } else {
      setSocialFormData({
        name: '',
        href: '',
        icon: 'Github',
        color: 'hover:text-gray-900 dark:hover:text-white',
        description: ''
      });
    }
  }, [editingSocial]);

  const handleContactInputChange = useCallback((field, value) => {
    setContactFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSocialInputChange = useCallback((field, value) => {
    setSocialFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);



  const handleContactSave = useCallback(() => {
    if (!contactFormData.label.trim() || !contactFormData.value.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const contactData = {
      ...contactFormData,
      id: editingContact ? editingContact.id : Date.now(),
      href: contactFormData.href || null
    };

    let updatedContactInfo;
    if (editingContact) {
      updatedContactInfo = contactInfo.map(c => c.id === editingContact.id ? contactData : c);
    } else {
      updatedContactInfo = [...contactInfo, contactData];
    }

    setContactInfo(updatedContactInfo);
    saveToDataManager(updatedContactInfo, socialLinks);

    setEditingContact(null);
    setIsCreatingContact(false);
    
    // Update sync status since we made changes
    setTimeout(updateSyncStatus, 100);
  }, [contactFormData, editingContact, contactInfo, socialLinks]);

  const handleSocialSave = useCallback(() => {
    if (!socialFormData.name.trim() || !socialFormData.href.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const socialData = {
      ...socialFormData,
      id: editingSocial ? editingSocial.id : Date.now()
    };

    let updatedSocialLinks;
    if (editingSocial) {
      updatedSocialLinks = socialLinks.map(s => s.id === editingSocial.id ? socialData : s);
    } else {
      updatedSocialLinks = [...socialLinks, socialData];
    }

    setSocialLinks(updatedSocialLinks);
    saveToDataManager(contactInfo, updatedSocialLinks);

    setEditingSocial(null);
    setIsCreatingSocial(false);
    
    // Update sync status since we made changes
    setTimeout(updateSyncStatus, 100);
  }, [socialFormData, editingSocial, socialLinks, contactInfo]);

  const handleContactDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this contact method?')) {
      const updatedContactInfo = contactInfo.filter(c => c.id !== id);
      setContactInfo(updatedContactInfo);
      saveToDataManager(updatedContactInfo, socialLinks);
      
      // Update sync status since we made changes
      setTimeout(updateSyncStatus, 100);
    }
  }, [contactInfo, socialLinks]);

  const handleSocialDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      const updatedSocialLinks = socialLinks.filter(s => s.id !== id);
      setSocialLinks(updatedSocialLinks);
      saveToDataManager(contactInfo, updatedSocialLinks);
      
      // Update sync status since we made changes
      setTimeout(updateSyncStatus, 100);
    }
  }, [socialLinks, contactInfo]);

  const generateContactCode = useCallback(() => {
    const contactCode = `const contactInfo = ${JSON.stringify(contactInfo, null, 2)};`;
    const socialCode = `const socialLinks = ${JSON.stringify(socialLinks, null, 2)};`;
    const fullCode = `${contactCode}\n\n${socialCode}`;
    
    navigator.clipboard.writeText(fullCode);
    alert('Contact data copied to clipboard! You can paste this into your ContactPage.js file.');
  }, [contactInfo, socialLinks]);

  const getIconComponent = useCallback((iconName) => {
    const icons = {
      Mail,
      Phone,
      MapPin,
      MessageCircle,
      Github,
      Linkedin,
      Twitter,
      Instagram,
      Youtube,
      Globe
    };
    return icons[iconName] || Mail;
  }, []);

  // Helper functions for form handling
  const handleContactCancel = useCallback(() => {
    setEditingContact(null);
    setIsCreatingContact(false);
  }, []);

  const handleSocialCancel = useCallback(() => {
    setEditingSocial(null);
    setIsCreatingSocial(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Contact Manager
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={generateContactCode}
            variant="outline"
          >
            <Upload className="h-4 w-4 mr-2" />
            Export Code
          </Button>
          {syncStatus?.isConfigured && (
            <Button
              onClick={quickPublish}
              variant={syncStatus.pendingChanges ? "primary" : "outline"}
              disabled={isPublishing || !syncStatus.pendingChanges}
            >
              {isPublishing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Zap className="h-4 w-4 mr-2" />
              )}
              {syncStatus.pendingChanges ? 'Publish Changes' : 'Published'}
            </Button>
          )}
        </div>
      </div>

      {/* GitHub Sync Status Card */}
      {syncStatus && (
        <Card className="mb-6">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    GitHub Sync Status
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {syncStatus.isConfigured 
                      ? syncStatus.pendingChanges 
                        ? 'You have unpublished changes'
                        : 'All changes are published'
                      : 'GitHub integration not configured'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {syncStatus.isConfigured ? (
                  syncStatus.pendingChanges ? (
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                )}
                
                {!syncStatus.isConfigured && (
                  <Button
                    as="a"
                    href="/admin/github"
                    variant="outline"
                    size="sm"
                  >
                    Setup GitHub
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {contactInfo.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Contact Methods</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {socialLinks.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Social Links</div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact Information
          </h2>
          <Button
            onClick={() => setIsCreatingContact(true)}
            variant="primary"
            disabled={isCreatingContact || editingContact}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {(isCreatingContact || editingContact) && (
          <ContactForm 
            contactFormData={contactFormData}
            editingContact={editingContact}
            onInputChange={handleContactInputChange}
            onSave={handleContactSave}
            onCancel={handleContactCancel}
            iconOptions={iconOptions}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((contact) => {
            const IconComponent = getIconComponent(contact.icon);
            return (
              <Card key={contact.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {contact.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingContact(contact)}
                        className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleContactDelete(contact.id)}
                        className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {contact.description}
                  </p>
                  {contact.href && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Link: {contact.href}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Social Links Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Social Media Links
          </h2>
          <Button
            onClick={() => setIsCreatingSocial(true)}
            variant="primary"
            disabled={isCreatingSocial || editingSocial}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>

        {(isCreatingSocial || editingSocial) && (
          <SocialForm 
            socialFormData={socialFormData}
            editingSocial={editingSocial}
            onInputChange={handleSocialInputChange}
            onSave={handleSocialSave}
            onCancel={handleSocialCancel}
            socialIconOptions={socialIconOptions}
            colorOptions={colorOptions}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((social) => {
            const IconComponent = getIconComponent(social.icon);
            return (
              <Card key={social.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {social.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {social.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingSocial(social)}
                        className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSocialDelete(social.id)}
                        className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                    {social.href}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactManager; 
import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, Mail, Phone, MapPin, MessageCircle,
  Github, Linkedin, Twitter, Instagram, Youtube, Globe, Upload, Copy
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ContactManager = ({ onSave }) => {
  const [contactInfo, setContactInfo] = useState([
    {
      id: 1,
      icon: 'Mail',
      label: 'Email',
      value: 'micah.mcnutt@example.com',
      href: 'mailto:micah.mcnutt@example.com',
      description: 'Best for project inquiries'
    },
    {
      id: 2,
      icon: 'Phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      description: 'Available 9 AM - 6 PM EST'
    },
    {
      id: 3,
      icon: 'MapPin',
      label: 'Location',
      value: 'Austin, TX',
      href: null,
      description: 'Central Time Zone'
    },
    {
      id: 4,
      icon: 'MessageCircle',
      label: 'WhatsApp',
      value: '+1 (555) 123-4567',
      href: 'https://wa.me/15551234567',
      description: 'Quick messages'
    }
  ]);

  const [socialLinks, setSocialLinks] = useState([
    {
      id: 1,
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: 'Github',
      color: 'hover:text-gray-900 dark:hover:text-white',
      description: 'Check out my code'
    },
    {
      id: 2,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourprofile',
      icon: 'Linkedin',
      color: 'hover:text-blue-600',
      description: 'Professional network'
    },
    {
      id: 3,
      name: 'Twitter',
      href: 'https://twitter.com/yourusername',
      icon: 'Twitter',
      color: 'hover:text-blue-400',
      description: 'Latest updates'
    },
    {
      id: 4,
      name: 'Instagram',
      href: 'https://instagram.com/yourusername',
      icon: 'Instagram',
      color: 'hover:text-pink-600',
      description: 'Behind the scenes'
    },
    {
      id: 5,
      name: 'YouTube',
      href: 'https://youtube.com/c/yourchannel',
      icon: 'Youtube',
      color: 'hover:text-red-600',
      description: 'Tech tutorials'
    },
    {
      id: 6,
      name: 'Portfolio',
      href: 'https://micahmcnutt.dev',
      icon: 'Globe',
      color: 'hover:text-green-600',
      description: 'View my work'
    }
  ]);

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

  // Create individual handlers for each contact field to avoid anonymous function recreation
  const handleContactIconChange = useCallback((e) => {
    handleContactInputChange('icon', e.target.value);
  }, [handleContactInputChange]);

  const handleContactLabelChange = useCallback((e) => {
    handleContactInputChange('label', e.target.value);
  }, [handleContactInputChange]);

  const handleContactValueChange = useCallback((e) => {
    handleContactInputChange('value', e.target.value);
  }, [handleContactInputChange]);

  const handleContactHrefChange = useCallback((e) => {
    handleContactInputChange('href', e.target.value);
  }, [handleContactInputChange]);

  const handleContactDescriptionChange = useCallback((e) => {
    handleContactInputChange('description', e.target.value);
  }, [handleContactInputChange]);

  // Create individual handlers for each social field to avoid anonymous function recreation
  const handleSocialNameChange = useCallback((e) => {
    handleSocialInputChange('name', e.target.value);
  }, [handleSocialInputChange]);

  const handleSocialHrefChange = useCallback((e) => {
    handleSocialInputChange('href', e.target.value);
  }, [handleSocialInputChange]);

  const handleSocialIconChange = useCallback((e) => {
    handleSocialInputChange('icon', e.target.value);
  }, [handleSocialInputChange]);

  const handleSocialColorChange = useCallback((e) => {
    handleSocialInputChange('color', e.target.value);
  }, [handleSocialInputChange]);

  const handleSocialDescriptionChange = useCallback((e) => {
    handleSocialInputChange('description', e.target.value);
  }, [handleSocialInputChange]);

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

    if (editingContact) {
      setContactInfo(prev => prev.map(c => c.id === editingContact.id ? contactData : c));
    } else {
      setContactInfo(prev => [...prev, contactData]);
    }

    setEditingContact(null);
    setIsCreatingContact(false);
  }, [contactFormData, editingContact]);

  const handleSocialSave = useCallback(() => {
    if (!socialFormData.name.trim() || !socialFormData.href.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const socialData = {
      ...socialFormData,
      id: editingSocial ? editingSocial.id : Date.now()
    };

    if (editingSocial) {
      setSocialLinks(prev => prev.map(s => s.id === editingSocial.id ? socialData : s));
    } else {
      setSocialLinks(prev => [...prev, socialData]);
    }

    setEditingSocial(null);
    setIsCreatingSocial(false);
  }, [socialFormData, editingSocial]);

  const handleContactDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this contact method?')) {
      setContactInfo(prev => prev.filter(c => c.id !== id));
    }
  }, []);

  const handleSocialDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      setSocialLinks(prev => prev.filter(s => s.id !== id));
    }
  }, []);

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

  const ContactForm = useCallback(() => (
    <Card className="mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingContact ? 'Edit Contact Info' : 'Add Contact Info'}
          </h3>
          <Button
            onClick={() => {
              setEditingContact(null);
              setIsCreatingContact(false);
            }}
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
              onChange={handleContactIconChange}
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
              onChange={handleContactLabelChange}
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
              onChange={handleContactValueChange}
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
              onChange={handleContactHrefChange}
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
              onChange={handleContactDescriptionChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Best for project inquiries"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleContactSave} variant="primary">
            <Save className="h-4 w-4 mr-2" />
            Save Contact
          </Button>
          <Button
            onClick={() => {
              setEditingContact(null);
              setIsCreatingContact(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  ), [editingContact, handleContactIconChange, handleContactLabelChange, handleContactValueChange, handleContactHrefChange, handleContactDescriptionChange, handleContactSave]);

  const SocialForm = useCallback(() => (
    <Card className="mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingSocial ? 'Edit Social Link' : 'Add Social Link'}
          </h3>
          <Button
            onClick={() => {
              setEditingSocial(null);
              setIsCreatingSocial(false);
            }}
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
              onChange={handleSocialNameChange}
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
              onChange={handleSocialHrefChange}
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
              onChange={handleSocialIconChange}
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
              onChange={handleSocialColorChange}
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
              onChange={handleSocialDescriptionChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Check out my code"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSocialSave} variant="primary">
            <Save className="h-4 w-4 mr-2" />
            Save Social Link
          </Button>
          <Button
            onClick={() => {
              setEditingSocial(null);
              setIsCreatingSocial(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  ), [editingSocial, handleSocialNameChange, handleSocialHrefChange, handleSocialIconChange, handleSocialColorChange, handleSocialDescriptionChange, handleSocialSave]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Contact Manager
        </h1>
        <Button
          onClick={generateContactCode}
          variant="outline"
        >
          <Upload className="h-4 w-4 mr-2" />
          Export Code
        </Button>
      </div>

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

        {(isCreatingContact || editingContact) && <ContactForm />}

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

        {(isCreatingSocial || editingSocial) && <SocialForm />}

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
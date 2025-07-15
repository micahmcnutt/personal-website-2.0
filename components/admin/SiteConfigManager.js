import { useState, useEffect, useCallback } from 'react';
import { 
  Save, Upload, Download, RefreshCw, Eye, Edit, Trash2, Plus, 
  User, Globe, Mail, Phone, MapPin, Settings, Image, Code, FileText,
  BarChart3, Palette, Link, MessageCircle, Calendar, Star, Zap,
  Github, Linkedin, Twitter, Instagram, Youtube, Copy, Check
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { siteConfig as initialConfig } from '../../data/siteConfig';

const SiteConfigManager = ({ onSave }) => {
  const [config, setConfig] = useState(initialConfig);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'hero', label: 'Hero Section', icon: Globe },
    { id: 'social', label: 'Social Links', icon: Link },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'stats', label: 'Stats & Skills', icon: BarChart3 },
    { id: 'seo', label: 'SEO Settings', icon: Settings },
    { id: 'export', label: 'Export/Import', icon: Download }
  ];

  const handleInputChange = useCallback((section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  }, []);

  const handleNestedInputChange = useCallback((section, subsection, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  }, []);

  const handleArrayChange = useCallback((section, index, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
    setHasChanges(true);
  }, []);

  const addArrayItem = useCallback((section, newItem) => {
    setConfig(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
    setHasChanges(true);
  }, []);

  const removeArrayItem = useCallback((section, index) => {
    setConfig(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  }, []);

  const handleSave = () => {
    if (onSave) {
      onSave(config);
    }
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleReset = () => {
    setConfig(initialConfig);
    setHasChanges(false);
    setIsEditing(false);
  };

  const exportConfig = useCallback(() => {
    const configString = `export const siteConfig = ${JSON.stringify(config, null, 2)};

export default siteConfig;`;
    
    navigator.clipboard.writeText(configString);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [config]);

  const importConfig = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target.result);
          setConfig(importedConfig);
          setHasChanges(true);
        } catch (error) {
          alert('Error importing configuration: Invalid JSON format');
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const downloadConfig = () => {
    const configString = JSON.stringify(config, null, 2);
    const blob = new Blob([configString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderPersonalTab = useCallback(() => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={config.personal.name}
            onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={config.personal.title}
            onChange={(e) => handleInputChange('personal', 'title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={config.personal.bio}
          onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tagline
        </label>
        <textarea
          value={config.personal.tagline}
          onChange={(e) => handleInputChange('personal', 'tagline', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={config.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={config.personal.phone}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={config.personal.location}
            onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resume URL
          </label>
          <input
            type="url"
            value={config.personal.resumeUrl}
            onChange={(e) => handleInputChange('personal', 'resumeUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Typing Animation Roles
        </label>
        <div className="space-y-2">
          {config.roles.map((role, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={role}
                onChange={(e) => handleArrayChange('roles', index, null, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Button
                onClick={() => removeArrayItem('roles', index)}
                variant="outline"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => addArrayItem('roles', 'New Role')}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </div>
      </div>
    </div>
  ), [config, handleInputChange, handleArrayChange, addArrayItem, removeArrayItem]);

  const renderHeroTab = useCallback(() => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Greeting
          </label>
          <input
            type="text"
            value={config.hero.greeting}
            onChange={(e) => handleInputChange('hero', 'greeting', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={config.hero.name}
            onChange={(e) => handleInputChange('hero', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subtitle
        </label>
        <input
          type="text"
          value={config.hero.subtitle}
          onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={config.hero.description}
          onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Button Text
          </label>
          <input
            type="text"
            value={config.hero.primaryButton.text}
            onChange={(e) => handleNestedInputChange('hero', 'primaryButton', 'text', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Button URL
          </label>
          <input
            type="text"
            value={config.hero.primaryButton.url}
            onChange={(e) => handleNestedInputChange('hero', 'primaryButton', 'url', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Secondary Button Text
          </label>
          <input
            type="text"
            value={config.hero.secondaryButton.text}
            onChange={(e) => handleNestedInputChange('hero', 'secondaryButton', 'text', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Secondary Button URL
          </label>
          <input
            type="text"
            value={config.hero.secondaryButton.url}
            onChange={(e) => handleNestedInputChange('hero', 'secondaryButton', 'url', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  ), [config, handleInputChange]);

  const renderSocialTab = useCallback(() => (
    <div className="space-y-6">
      {Object.entries(config.social).map(([platform, data]) => (
        <Card key={platform} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {platform}
            </h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.display}
                onChange={(e) => handleNestedInputChange('social', platform, 'display', e.target.checked)}
                className="mr-2"
              />
              Display
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL
              </label>
              <input
                type="url"
                value={data.url}
                onChange={(e) => handleNestedInputChange('social', platform, 'url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={data.username}
                onChange={(e) => handleNestedInputChange('social', platform, 'username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  ), [config, handleNestedInputChange]);

  const renderStatsTab = useCallback(() => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Homepage Stats
        </h3>
        <div className="space-y-4">
          {config.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Value
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => removeArrayItem('stats', index)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            onClick={() => addArrayItem('stats', { label: 'New Stat', value: '0', icon: 'Star' })}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stat
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Skills
        </h3>
        <div className="space-y-4">
          {config.skills.map((skill, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => handleArrayChange('skills', index, 'level', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <select
                  value={skill.color}
                  onChange={(e) => handleArrayChange('skills', index, 'color', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="bg-blue-500">Blue</option>
                  <option value="bg-green-500">Green</option>
                  <option value="bg-purple-500">Purple</option>
                  <option value="bg-orange-500">Orange</option>
                  <option value="bg-red-500">Red</option>
                  <option value="bg-yellow-500">Yellow</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => removeArrayItem('skills', index)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            onClick={() => addArrayItem('skills', { name: 'New Skill', level: 75, color: 'bg-blue-500' })}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>
      </div>
    </div>
  ), [config, handleArrayChange, addArrayItem, removeArrayItem]);

  const renderExportTab = useCallback(() => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Export Configuration
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Export your current configuration to update the siteConfig.js file or create a backup.
        </p>
        <div className="flex gap-4">
          <Button
            onClick={exportConfig}
            variant="primary"
            className="flex items-center"
          >
            {copySuccess ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
          <Button
            onClick={downloadConfig}
            variant="outline"
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Import Configuration
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Import a previously exported configuration file.
        </p>
        <input
          type="file"
          accept=".json"
          onChange={importConfig}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Usage Instructions
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              1. Export Configuration
            </h4>
            <p>
              Click "Copy to Clipboard" to copy the configuration code, then paste it into 
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mx-1">
                data/siteConfig.js
              </code>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              2. Deploy Changes
            </h4>
            <p>
              After updating the file, commit and push your changes to deploy the updates to your live site.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              3. Backup & Restore
            </h4>
            <p>
              Use the download feature to create backups of your configuration, and the import feature to restore them.
            </p>
          </div>
        </div>
      </Card>
    </div>
  ), [copySuccess, exportConfig, importConfig]);

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalTab();
      case 'hero':
        return renderHeroTab();
      case 'social':
        return renderSocialTab();
      case 'stats':
        return renderStatsTab();
      case 'export':
        return renderExportTab();
      default:
        return renderPersonalTab();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Site Configuration
        </h1>
        <div className="flex gap-2">
          {hasChanges && (
            <Button onClick={handleReset} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
          <Button
            onClick={handleSave}
            variant="primary"
            disabled={!hasChanges}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="p-6">
            {renderContent()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteConfigManager; 
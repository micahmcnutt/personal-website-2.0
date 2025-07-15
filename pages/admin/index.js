import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { 
  Settings, FolderOpen, Mail, Globe, BarChart3, FileText, 
  Shield, Key, Users, Heart, Coffee, Zap, Upload, Download,
  Edit, Eye, RefreshCw, Save, Copy, Github, ExternalLink
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import ProjectManager from '../../components/admin/ProjectManager';
import ContactManager from '../../components/admin/ContactManager';
import SiteConfigManager from '../../components/admin/SiteConfigManager';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { authenticateUser, createAuthSession, clearAuthSession } from '../../utils/auth';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeModule, setActiveModule] = useState('overview');
  const [lastSaved, setLastSaved] = useState(null);

  // Authentication using centralized system
  const handleAuth = (e) => {
    e.preventDefault();
    if (authenticateUser(password)) {
      createAuthSession();
      setIsAuthenticated(true);
    } else {
      alert('Invalid password. Please check your credentials.');
    }
  };

  const handleSave = (data, type) => {
    console.log(`${type} data saved:`, data);
    setLastSaved(new Date());
    alert(`${type} updated successfully! Check the console for the updated data.`);
  };

  const modules = [
    {
      id: 'overview',
      title: 'Overview',
      description: 'Dashboard overview and quick stats',
      icon: BarChart3,
      color: 'bg-blue-500'
    },
    {
      id: 'site-config',
      title: 'Site Configuration',
      description: 'Edit personal info, hero section, and site settings',
      icon: Settings,
      color: 'bg-purple-500'
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Manage portfolio projects and showcase',
      icon: FolderOpen,
      color: 'bg-green-500'
    },
    {
      id: 'contact',
      title: 'Contact & Social',
      description: 'Update contact information and social links',
      icon: Mail,
      color: 'bg-orange-500'
    },
    {
      id: 'guide',
      title: 'User Guide',
      description: 'How to use the content management system',
      icon: FileText,
      color: 'bg-indigo-500'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Projects</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">9</p>
            </div>
            <FolderOpen className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Featured Projects</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">3</p>
            </div>
            <Zap className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Social Links</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">6</p>
            </div>
            <Globe className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 dark:text-orange-400">Last Updated</p>
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                {lastSaved ? lastSaved.toLocaleDateString() : 'Never'}
              </p>
            </div>
            <RefreshCw className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button 
              onClick={() => setActiveModule('projects')}
              variant="outline" 
              className="w-full justify-start"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
            <Button 
              onClick={() => setActiveModule('site-config')}
              variant="outline" 
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              Update Site Settings
            </Button>
            <Button 
              onClick={() => setActiveModule('contact')}
              variant="outline" 
              className="w-full justify-start"
            >
              <Mail className="h-4 w-4 mr-2" />
              Edit Contact Info
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Site deployed successfully</span>
              <span className="text-gray-500 dark:text-gray-500">Today</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">GitHub Actions workflow updated</span>
              <span className="text-gray-500 dark:text-gray-500">Today</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Content management system created</span>
              <span className="text-gray-500 dark:text-gray-500">Today</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Site Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Site is live</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">DNS configured</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">HTTPS enabled</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Live site: micahmcnutt.com
            </span>
            <div className="flex gap-2">
              <Button 
                href="https://micahmcnutt.com" 
                target="_blank"
                variant="outline" 
                size="sm"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Site
              </Button>
              <Button 
                href="https://github.com/micahmcnutt/personal-website-2.0" 
                target="_blank"
                variant="outline" 
                size="sm"
              >
                <Github className="h-4 w-4 mr-1" />
                Repository
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderGuide = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Content Management System Guide
        </h3>
        <div className="space-y-6 text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Getting Started
            </h4>
            <p className="mb-2">
              This admin panel allows you to manage all content on your personal website without 
              editing code directly. Here's how to use each module:
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              1. Site Configuration
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Edit your personal information, bio, and contact details</li>
              <li>Update the hero section content and call-to-action buttons</li>
              <li>Manage social media links and their visibility</li>
              <li>Update homepage stats and skills</li>
              <li>Configure SEO settings and meta information</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              2. Projects Management
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Add, edit, and delete portfolio projects</li>
              <li>Set projects as featured to display on homepage</li>
              <li>Organize projects by category (web, mobile, backend, tools)</li>
              <li>Add project descriptions, technologies, and links</li>
              <li>Upload project images and screenshots</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              3. Contact & Social Management
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Update contact information and availability</li>
              <li>Manage social media profiles and links</li>
              <li>Configure contact form settings</li>
              <li>Set up WhatsApp and other messaging platforms</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              4. Deployment Process
            </h4>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Make your changes using the admin interfaces</li>
              <li>Use the "Export" feature to copy the configuration code</li>
              <li>Paste the code into the appropriate data files</li>
              <li>Commit and push your changes to GitHub</li>
              <li>GitHub Actions will automatically deploy your updates</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              5. Best Practices
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Always backup your configuration before making major changes</li>
              <li>Test changes locally before deploying to production</li>
              <li>Keep project images optimized for web (under 500KB)</li>
              <li>Use consistent naming conventions for projects and categories</li>
              <li>Regularly update your portfolio with new projects</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              6. Troubleshooting
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>If deployment fails, check the GitHub Actions log for errors</li>
              <li>Ensure all required fields are filled in before saving</li>
              <li>Verify image URLs are accessible and properly formatted</li>
              <li>Check for JSON syntax errors in exported configurations</li>
              <li>Contact support if you encounter persistent issues</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              File Locations
            </h4>
            <div className="space-y-1 text-sm">
              <div><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">data/siteConfig.js</code> - Site configuration</div>
              <div><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">data/projects.js</code> - Project data</div>
              <div><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">public/images/</code> - Image assets</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Useful Commands
            </h4>
            <div className="space-y-1 text-sm">
              <div><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run dev</code> - Start development server</div>
              <div><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run build</code> - Build for production</div>
              <div><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">git add . && git commit -m "Update content"</code> - Deploy changes</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case 'overview':
        return renderOverview();
      case 'site-config':
        return <SiteConfigManager onSave={(data) => handleSave(data, 'Site Configuration')} />;
      case 'projects':
        return <ProjectManager onSave={(data) => handleSave(data, 'Projects')} />;
      case 'contact':
        return <ContactManager onSave={(data) => handleSave(data, 'Contact Information')} />;
      case 'guide':
        return renderGuide();
      default:
        return renderOverview();
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <Head>
          <title>Admin Login - Micah McNutt</title>
          <meta name="description" content="Admin panel login for content management" />
        </Head>
        
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Admin Access
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Enter your password to access the content management system
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleAuth}>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter admin password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard - Micah McNutt</title>
        <meta name="description" content="Content management system for personal website" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage your website content with ease
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Site
                </Button>
                <Button
                  onClick={() => {
                    clearAuthSession();
                    setIsAuthenticated(false);
                  }}
                  variant="outline"
                >
                  Sign Out
                </Button>
              </div>
            </div>
            
            {/* Module Navigation */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        activeModule === module.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${module.color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                        {module.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {module.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
import { useState, useEffect } from 'react';
import { 
  Settings, Save, TestTube, CheckCircle, AlertCircle, 
  Github, Key, Users, GitBranch, Trash2, RefreshCw,
  Upload, Download, Clock, ExternalLink
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { 
  getGitHubConfig, 
  saveGitHubConfig, 
  clearGitHubConfig,
  GitHubSync 
} from '../../utils/dataManager';

const GitHubSetup = () => {
  const [config, setConfig] = useState({
    token: '',
    owner: '',
    repo: '',
    branch: 'main'
  });
  
  const [validation, setValidation] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  // Load existing configuration
  useEffect(() => {
    const existingConfig = getGitHubConfig();
    if (existingConfig) {
      setConfig(existingConfig);
    }
    
    // Load sync status
    updateSyncStatus();
  }, []);

  const updateSyncStatus = () => {
    const status = GitHubSync.getSyncStatus();
    setSyncStatus(status);
  };

  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation when config changes
    if (validation) {
      setValidation(null);
    }
  };

  const validateConfiguration = async () => {
    if (!config.token || !config.owner || !config.repo) {
      setValidation({
        valid: false,
        error: 'Please fill in all required fields'
      });
      return;
    }

    setIsValidating(true);
    
    try {
      // Temporarily save config to test connection
      const tempSaved = saveGitHubConfig(config);
      if (!tempSaved) {
        throw new Error('Failed to save configuration');
      }

      const result = await GitHubSync.validateConnection();
      setValidation(result);
      
      if (result.valid) {
        updateSyncStatus();
      }
    } catch (error) {
      setValidation({
        valid: false,
        error: error.message
      });
    } finally {
      setIsValidating(false);
    }
  };

  const saveConfiguration = async () => {
    setSaving(true);
    
    try {
      const success = saveGitHubConfig(config);
      if (success) {
        alert('GitHub configuration saved successfully!');
        updateSyncStatus();
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      alert(`Error saving configuration: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const clearConfiguration = () => {
    if (window.confirm('Are you sure you want to remove the GitHub configuration?')) {
      clearGitHubConfig();
      setConfig({
        token: '',
        owner: '',
        repo: '',
        branch: 'main'
      });
      setValidation(null);
      setSyncStatus(null);
    }
  };

  const pullFromGitHub = async () => {
    setIsPulling(true);
    
    try {
      const result = await GitHubSync.pullFromGitHub();
      
      if (result.success) {
        alert(`Content pulled successfully! Updated: Projects (${result.projectsUpdated ? 'Yes' : 'No'}), Site Config (${result.siteConfigUpdated ? 'Yes' : 'No'})`);
        updateSyncStatus();
        
        // Refresh the page to show updated content
        if (result.updated) {
          window.location.reload();
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert(`Error pulling from GitHub: ${error.message}`);
    } finally {
      setIsPulling(false);
    }
  };

  const publishToGitHub = async () => {
    const commitMessage = prompt(
      'Enter a commit message for this update:',
      'Update website content via admin panel'
    );
    
    if (!commitMessage) return;

    setIsPublishing(true);
    
    try {
      const result = await GitHubSync.pushToGitHub(commitMessage);
      
      if (result.success) {
        alert('Content published successfully! Your website will update automatically.');
        updateSyncStatus();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert(`Error publishing to GitHub: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              GitHub Integration Setup
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Key className="h-4 w-4 inline mr-2" />
                Personal Access Token *
              </label>
              <input
                type="password"
                value={config.token}
                onChange={(e) => handleInputChange('token', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="ghp_xxxxxxxxxxxx"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Generate at: GitHub → Settings → Developer settings → Personal access tokens
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Users className="h-4 w-4 inline mr-2" />
                  Repository Owner *
                </label>
                <input
                  type="text"
                  value={config.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="your-username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Settings className="h-4 w-4 inline mr-2" />
                  Repository Name *
                </label>
                <input
                  type="text"
                  value={config.repo}
                  onChange={(e) => handleInputChange('repo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="personal-website-2.0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <GitBranch className="h-4 w-4 inline mr-2" />
                Branch
              </label>
              <input
                type="text"
                value={config.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="main"
              />
            </div>

            {/* Validation Status */}
            {validation && (
              <div className={`p-3 rounded-md ${validation.valid 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {validation.valid ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {validation.valid ? 'Connection successful!' : 'Connection failed'}
                  </span>
                </div>
                {validation.error && (
                  <p className="text-sm mt-1">{validation.error}</p>
                )}
                {validation.valid && validation.repoName && (
                  <p className="text-sm mt-1">
                    Connected to: {validation.repoName}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={validateConfiguration}
                variant="outline"
                disabled={isValidating}
              >
                {isValidating ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <TestTube className="h-4 w-4 mr-2" />
                )}
                Test Connection
              </Button>

              <Button
                onClick={saveConfiguration}
                variant="primary"
                disabled={isSaving || !validation?.valid}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>

              {getGitHubConfig() && (
                <Button
                  onClick={clearConfiguration}
                  variant="outline"
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Sync Status Card */}
      {syncStatus && syncStatus.isConfigured && (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sync Status
              </h3>
              
              {syncStatus.pendingChanges && (
                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs rounded-full">
                  Pending Changes
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Published</p>
                <p className="text-gray-900 dark:text-white">
                  {syncStatus.lastPublished 
                    ? new Date(syncStatus.lastPublished).toLocaleString()
                    : 'Never'
                  }
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Pulled</p>
                <p className="text-gray-900 dark:text-white">
                  {syncStatus.lastPulled 
                    ? new Date(syncStatus.lastPulled).toLocaleString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={publishToGitHub}
                variant="primary"
                disabled={isPublishing || !syncStatus.pendingChanges}
              >
                {isPublishing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Publish Changes
              </Button>

              <Button
                onClick={pullFromGitHub}
                variant="outline"
                disabled={isPulling}
              >
                {isPulling ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Pull Latest
              </Button>

              {syncStatus.lastCommitUrl && (
                <Button
                  as="a"
                  href={syncStatus.lastCommitUrl}
                  target="_blank"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Last Commit
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Instructions Card */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Setup Instructions
          </h3>
          
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">1. Create a Personal Access Token</p>
              <p>Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)</p>
              <p>Create a new token with <strong>repo</strong> permissions.</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-900 dark:text-white">2. Repository Information</p>
              <p>Enter your GitHub username and repository name (e.g., "personal-website-2.0")</p>
            </div>
            
            <div>
              <p className="font-medium text-gray-900 dark:text-white">3. How it Works</p>
              <p>• Make changes in the admin panel (stored locally)</p>
              <p>• Click "Publish Changes" to commit to GitHub</p>
              <p>• Your GitHub Actions workflow will automatically deploy the updates</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GitHubSetup; 
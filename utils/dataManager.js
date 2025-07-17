import { siteConfig as defaultSiteConfig } from '../data/siteConfig';
import { projects as defaultProjects } from '../data/projects';
import githubAPI, { GitHubContent } from './githubApi';

const STORAGE_KEYS = {
  SITE_CONFIG: 'personal_website_site_config',
  PROJECTS: 'personal_website_projects',
  GITHUB_CONFIG: 'personal_website_github_config',
  PUBLISH_STATUS: 'personal_website_publish_status'
};

// GitHub configuration management
export const getGitHubConfig = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GITHUB_CONFIG);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Error reading GitHub config from localStorage:', error);
    return null;
  }
};

export const saveGitHubConfig = (config) => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(STORAGE_KEYS.GITHUB_CONFIG, JSON.stringify(config));
    
    // Initialize GitHub API with new config
    if (config.token && config.owner && config.repo) {
      githubAPI.initialize(config.token, config.owner, config.repo, config.branch || 'main');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving GitHub config to localStorage:', error);
    return false;
  }
};

export const clearGitHubConfig = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.GITHUB_CONFIG);
    return true;
  } catch (error) {
    console.error('Error clearing GitHub config:', error);
    return false;
  }
};

// Initialize GitHub API on load if config exists
if (typeof window !== 'undefined') {
  const githubConfig = getGitHubConfig();
  if (githubConfig?.token && githubConfig?.owner && githubConfig?.repo) {
    githubAPI.initialize(githubConfig.token, githubConfig.owner, githubConfig.repo, githubConfig.branch || 'main');
  }
}

// Publish status management
export const getPublishStatus = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PUBLISH_STATUS);
    return stored ? JSON.parse(stored) : { lastPublished: null, pendingChanges: false };
  } catch (error) {
    console.warn('Error reading publish status:', error);
    return { lastPublished: null, pendingChanges: false };
  }
};

export const savePublishStatus = (status) => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(STORAGE_KEYS.PUBLISH_STATUS, JSON.stringify(status));
    return true;
  } catch (error) {
    console.error('Error saving publish status:', error);
    return false;
  }
};

// Generic function to get data from localStorage with fallback
const getStoredData = (key, defaultData) => {
  if (typeof window === 'undefined') {
    return defaultData; // Server-side rendering fallback
  }
  
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.warn(`Error reading ${key} from localStorage:`, error);
    return defaultData;
  }
};

// Generic function to save data to localStorage
const saveData = (key, data) => {
  if (typeof window === 'undefined') {
    return false; // Can't save on server-side
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
    
    // Mark as having pending changes
    const status = getPublishStatus();
    savePublishStatus({ ...status, pendingChanges: true });
    
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// Site Configuration Management
export const getSiteConfig = () => {
  return getStoredData(STORAGE_KEYS.SITE_CONFIG, defaultSiteConfig);
};

export const saveSiteConfig = (config) => {
  return saveData(STORAGE_KEYS.SITE_CONFIG, config);
};

// Projects Management
export const getProjects = () => {
  try {
    const projects = getStoredData(STORAGE_KEYS.PROJECTS, defaultProjects);
    // Ensure we always return an array
    if (!Array.isArray(projects)) {
      console.warn('Projects data is not an array, returning default projects');
      return Array.isArray(defaultProjects) ? defaultProjects : [];
    }
    return projects;
  } catch (error) {
    console.error('Error in getProjects:', error);
    return Array.isArray(defaultProjects) ? defaultProjects : [];
  }
};

export const saveProjects = (projects) => {
  return saveData(STORAGE_KEYS.PROJECTS, projects);
};

// Utility function to get featured projects
export const getFeaturedProjects = () => {
  try {
    const projects = getProjects();
    if (!Array.isArray(projects)) {
      console.warn('Projects is not an array in getFeaturedProjects');
      return [];
    }
    return projects.filter(project => project && project.featured === true);
  } catch (error) {
    console.error('Error in getFeaturedProjects:', error);
    return [];
  }
};

// GitHub Integration Functions
export const GitHubSync = {
  // Validate GitHub connection
  async validateConnection() {
    try {
      const validation = await githubAPI.validateAccess();
      return validation;
    } catch (error) {
      return { valid: false, error: error.message };
    }
  },

  // Pull latest content from GitHub
  async pullFromGitHub() {
    try {
      const [projects, siteConfig] = await Promise.all([
        GitHubContent.getProjects(),
        GitHubContent.getSiteConfig()
      ]);

      let updated = false;

      if (projects) {
        saveData(STORAGE_KEYS.PROJECTS, projects);
        updated = true;
      }

      if (siteConfig) {
        saveData(STORAGE_KEYS.SITE_CONFIG, siteConfig);
        updated = true;
      }

      if (updated) {
        // Reset pending changes since we just pulled from GitHub
        savePublishStatus({ lastPulled: new Date().toISOString(), pendingChanges: false });
      }

      return {
        success: true,
        updated,
        projectsUpdated: !!projects,
        siteConfigUpdated: !!siteConfig
      };
    } catch (error) {
      console.error('Error pulling from GitHub:', error);
      return { success: false, error: error.message };
    }
  },

  // Push local changes to GitHub with enhanced error handling (single commit)
  async pushToGitHub(commitMessage = 'Update website content via admin panel') {
    try {
      const localProjects = getProjects();
      const localSiteConfig = getSiteConfig();

      console.log('Publishing content in single atomic commit...');

      // Use the new batch update function for atomic commits
      const result = await GitHubContent.saveBoth(localProjects, localSiteConfig, commitMessage);
      
      console.log(`✅ Successfully published in single commit (${result.filesUpdated} files updated)`);

      // Update publish status
      savePublishStatus({
        lastPublished: new Date().toISOString(),
        pendingChanges: false,
        lastCommitSha: result.commitSha,
        lastCommitUrl: result.commitUrl
      });

      return {
        success: true,
        result,
        message: `Content published successfully in single commit! Updated ${result.filesUpdated} files.`,
        singleCommit: true
      };
    } catch (error) {
      console.error('Error in pushToGitHub:', error);
      return { 
        success: false, 
        error: error.message,
        message: `Failed to publish content: ${error.message}`
      };
    }
  },

  // Refresh local data from GitHub (useful for resolving conflicts)
  async refreshFromGitHub() {
    try {
      console.log('🔄 Refreshing local data from GitHub...');
      const result = await this.pullFromGitHub();
      
      if (result.success) {
        console.log('✅ Successfully refreshed from GitHub:', result);
        
        // Provide detailed feedback about what was updated
        const details = [];
        if (result.projectsUpdated) details.push('projects');
        if (result.siteConfigUpdated) details.push('site config');
        
        return {
          success: true,
          updated: result.updated,
          projectsUpdated: result.projectsUpdated,
          siteConfigUpdated: result.siteConfigUpdated,
          message: result.updated 
            ? `Local data refreshed from GitHub (updated: ${details.join(', ')})`
            : 'Local data is already up to date'
        };
      } else {
        console.error('❌ Failed to refresh from GitHub:', result.error);
        return {
          success: false,
          message: `Failed to refresh from GitHub: ${result.error}`
        };
      }
    } catch (error) {
      console.error('💥 Error refreshing from GitHub:', error);
      return {
        success: false,
        message: `Error refreshing data: ${error.message}`
      };
    }
  },

  // Check if there are pending changes
  hasPendingChanges() {
    const status = getPublishStatus();
    return status.pendingChanges;
  },

  // Get sync status
  getSyncStatus() {
    const status = getPublishStatus();
    const githubConfig = getGitHubConfig();
    
    return {
      isConfigured: githubConfig?.token && githubConfig?.owner && githubConfig?.repo,
      pendingChanges: status.pendingChanges,
      lastPublished: status.lastPublished,
      lastPulled: status.lastPulled,
      lastCommitUrl: status.lastCommitUrl
    };
  }
};

// Utility function to reset all data to defaults
export const resetAllData = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error resetting data:', error);
    return false;
  }
};

// Utility function to export all data
export const exportAllData = () => {
  return {
    siteConfig: getSiteConfig(),
    projects: getProjects(),
    githubConfig: getGitHubConfig(),
    publishStatus: getPublishStatus(),
    exportDate: new Date().toISOString()
  };
};

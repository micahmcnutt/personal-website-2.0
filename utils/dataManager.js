import { siteConfig as defaultSiteConfig } from '../data/siteConfig';
import { projects as defaultProjects } from '../data/projects';

const STORAGE_KEYS = {
  SITE_CONFIG: 'personal_website_site_config',
  PROJECTS: 'personal_website_projects'
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
  return getStoredData(STORAGE_KEYS.PROJECTS, defaultProjects);
};

export const saveProjects = (projects) => {
  return saveData(STORAGE_KEYS.PROJECTS, projects);
};

// Contact Information is part of site config - no separate functions needed

// Utility function to get featured projects
export const getFeaturedProjects = () => {
  const projects = getProjects();
  return projects.filter(project => project.featured);
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
    exportDate: new Date().toISOString()
  };
};

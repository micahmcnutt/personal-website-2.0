#!/usr/bin/env node

/**
 * Content Sync Script
 * Converts /content/*.json files to /data/*.js files for static site generation
 * This ensures the website uses the latest data from the admin panel
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const contentDir = path.join(projectRoot, 'content');
const dataDir = path.join(projectRoot, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Converts JSON data to JavaScript format
 * @param {any} data - The data to convert
 * @param {number} indent - Current indentation level
 * @returns {string} - JavaScript representation
 */
function jsonToJs(data, indent = 0) {
  const spaces = '  '.repeat(indent);
  
  if (data === null) return 'null';
  if (typeof data === 'undefined') return 'undefined';
  if (typeof data === 'boolean') return data.toString();
  if (typeof data === 'number') return data.toString();
  if (typeof data === 'string') return `'${data.replace(/'/g, "\\'")}'`;
  
  if (Array.isArray(data)) {
    if (data.length === 0) return '[]';
    const items = data.map(item => `${spaces}  ${jsonToJs(item, indent + 1)}`).join(',\n');
    return `[\n${items}\n${spaces}]`;
  }
  
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys.length === 0) return '{}';
    
    const properties = keys.map(key => {
      const value = jsonToJs(data[key], indent + 1);
      return `${spaces}  ${key}: ${value}`;
    }).join(',\n');
    
    return `{\n${properties}\n${spaces}}`;
  }
  
  return 'undefined';
}

/**
 * Syncs projects data from JSON to JS
 */
function syncProjects() {
  const projectsJsonPath = path.join(contentDir, 'projects.json');
  const projectsJsPath = path.join(dataDir, 'projects.js');
  
  try {
    if (!fs.existsSync(projectsJsonPath)) {
      console.log('⚠️  projects.json not found, skipping...');
      return;
    }
    
    const projectsData = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'));
    const jsContent = `export const projects = ${jsonToJs(projectsData, 0)};\n`;
    
    fs.writeFileSync(projectsJsPath, jsContent, 'utf8');
    console.log('✅ Synced projects.json → projects.js');
  } catch (error) {
    console.error('❌ Error syncing projects:', error.message);
    process.exit(1);
  }
}

/**
 * Syncs site config data from JSON to JS
 */
function syncSiteConfig() {
  const siteConfigJsonPath = path.join(contentDir, 'siteConfig.json');
  const siteConfigJsPath = path.join(dataDir, 'siteConfig.js');
  
  try {
    if (!fs.existsSync(siteConfigJsonPath)) {
      console.log('⚠️  siteConfig.json not found, skipping...');
      return;
    }
    
    const siteConfigData = JSON.parse(fs.readFileSync(siteConfigJsonPath, 'utf8'));
    const jsContent = `export const siteConfig = ${jsonToJs(siteConfigData, 0)};\n`;
    
    fs.writeFileSync(siteConfigJsPath, jsContent, 'utf8');
    console.log('✅ Synced siteConfig.json → siteConfig.js');
  } catch (error) {
    console.error('❌ Error syncing siteConfig:', error.message);
    process.exit(1);
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔄 Starting content sync...');
  
  // Check if content directory exists
  if (!fs.existsSync(contentDir)) {
    console.log('⚠️  Content directory not found, creating default structure...');
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  // Sync both files
  syncProjects();
  syncSiteConfig();
  
  console.log('✅ Content sync completed successfully!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { syncProjects, syncSiteConfig, main }; 
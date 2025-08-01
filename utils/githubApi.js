// GitHub API utilities for content management
class GitHubAPI {
  constructor() {
    this.baseUrl = 'https://api.github.com';
    this.token = null;
    this.owner = null;
    this.repo = null;
    this.branch = 'main';
  }

  // Initialize the GitHub API with authentication
  initialize(token, owner, repo, branch = 'main') {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
  }

  // Check if API is properly configured
  isConfigured() {
    return !!(this.token && this.owner && this.repo);
  }

  // Get authenticated headers
  getHeaders() {
    return {
      'Authorization': `token ${this.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
  }

  // Get file content from repository
  async getFileContent(path) {
    if (!this.isConfigured()) {
      throw new Error('GitHub API not configured');
    }

    try {
      const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`;
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // File doesn't exist
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Decode base64 content
      const content = atob(data.content);
      
      return {
        content,
        sha: data.sha,
        path: data.path
      };
    } catch (error) {
      console.error('Error fetching file content:', error);
      throw error;
    }
  }

  // Update or create file in repository with conflict resolution
  async updateFile(path, content, message, sha = null, retryCount = 0) {
    if (!this.isConfigured()) {
      throw new Error('GitHub API not configured');
    }

    const maxRetries = 3;

    try {
      const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${path}`;
      
      const payload = {
        message,
        content: btoa(content), // Encode to base64
        branch: this.branch
      };

      // Include SHA if updating existing file
      if (sha) {
        payload.sha = sha;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle 409 conflict - file has been updated since we got the SHA
        if (response.status === 409 && retryCount < maxRetries) {
          console.log(`SHA conflict detected, refetching latest version (attempt ${retryCount + 1}/${maxRetries})`);
          
          // Get the latest file to get the current SHA
          const latestFile = await this.getFileContent(path);
          if (latestFile) {
            // Retry with the latest SHA
            return this.updateFile(path, content, message, latestFile.sha, retryCount + 1);
          } else {
            // File was deleted, try creating it (no SHA needed)
            return this.updateFile(path, content, message, null, retryCount + 1);
          }
        }
        
        throw new Error(`GitHub API error: ${response.status} ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        sha: data.content.sha,
        path: data.content.path,
        commitSha: data.commit.sha,
        commitUrl: data.commit.html_url,
        retriesUsed: retryCount
      };
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  }

  // Update multiple files in a single atomic commit
  async updateMultipleFiles(fileUpdates, message) {
    if (!this.isConfigured()) {
      throw new Error('GitHub API not configured');
    }

    try {
      // Step 1: Get the latest commit SHA
      const latestCommitUrl = `${this.baseUrl}/repos/${this.owner}/${this.repo}/git/refs/heads/${this.branch}`;
      const latestCommitResponse = await fetch(latestCommitUrl, {
        headers: this.getHeaders()
      });

      if (!latestCommitResponse.ok) {
        throw new Error(`Failed to get latest commit: ${latestCommitResponse.status}`);
      }

      const latestCommitData = await latestCommitResponse.json();
      const latestCommitSha = latestCommitData.object.sha;

      // Step 2: Get the tree SHA from the latest commit
      const commitUrl = `${this.baseUrl}/repos/${this.owner}/${this.repo}/git/commits/${latestCommitSha}`;
      const commitResponse = await fetch(commitUrl, {
        headers: this.getHeaders()
      });

      if (!commitResponse.ok) {
        throw new Error(`Failed to get commit tree: ${commitResponse.status}`);
      }

      const commitData = await commitResponse.json();
      const baseTreeSha = commitData.tree.sha;

      // Step 3: Create tree entries for all file updates
      const treeEntries = fileUpdates.map(update => ({
        path: update.path,
        mode: '100644',
        type: 'blob',
        content: update.content
      }));

      // Step 4: Create a new tree
      const createTreeUrl = `${this.baseUrl}/repos/${this.owner}/${this.repo}/git/trees`;
      const createTreeResponse = await fetch(createTreeUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: treeEntries
        })
      });

      if (!createTreeResponse.ok) {
        const errorData = await createTreeResponse.json();
        throw new Error(`Failed to create tree: ${createTreeResponse.status} ${errorData.message}`);
      }

      const newTreeData = await createTreeResponse.json();
      const newTreeSha = newTreeData.sha;

      // Step 5: Create a new commit
      const createCommitUrl = `${this.baseUrl}/repos/${this.owner}/${this.repo}/git/commits`;
      const createCommitResponse = await fetch(createCommitUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          message,
          tree: newTreeSha,
          parents: [latestCommitSha]
        })
      });

      if (!createCommitResponse.ok) {
        const errorData = await createCommitResponse.json();
        throw new Error(`Failed to create commit: ${createCommitResponse.status} ${errorData.message}`);
      }

      const newCommitData = await createCommitResponse.json();
      const newCommitSha = newCommitData.sha;

      // Step 6: Update the branch reference
      const updateRefUrl = `${this.baseUrl}/repos/${this.owner}/${this.repo}/git/refs/heads/${this.branch}`;
      const updateRefResponse = await fetch(updateRefUrl, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({
          sha: newCommitSha
        })
      });

      if (!updateRefResponse.ok) {
        const errorData = await updateRefResponse.json();
        throw new Error(`Failed to update branch: ${updateRefResponse.status} ${errorData.message}`);
      }

      return {
        success: true,
        commitSha: newCommitSha,
        commitUrl: `https://github.com/${this.owner}/${this.repo}/commit/${newCommitSha}`,
        filesUpdated: fileUpdates.length,
        message: `Successfully updated ${fileUpdates.length} files in single commit`
      };
    } catch (error) {
      console.error('Error in updateMultipleFiles:', error);
      throw error;
    }
  }

  // Validate repository access
  async validateAccess() {
    if (!this.isConfigured()) {
      return { valid: false, error: 'API not configured' };
    }

    try {
      const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}`;
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        return {
          valid: true,
          repoName: data.name,
          repoUrl: data.html_url,
          permissions: data.permissions
        };
      } else {
        return {
          valid: false,
          error: `Repository access failed: ${response.status} ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        valid: false,
        error: `Network error: ${error.message}`
      };
    }
  }
}

// Create singleton instance
const githubAPI = new GitHubAPI();

// Content-specific helper functions
export const GitHubContent = {
  // Utility function to safely update a file with latest state
  async safeUpdateFile(path, content, message) {
    try {
      // Always get the latest file state first
      const currentFile = await githubAPI.getFileContent(path);
      
      const result = await githubAPI.updateFile(
        path,
        content,
        message,
        currentFile?.sha // Use latest SHA or null for new file
      );
      
      return result;
    } catch (error) {
      console.error(`Error in safeUpdateFile for ${path}:`, error);
      throw error;
    }
  },
  // Projects management
  async getProjects() {
    try {
      const result = await githubAPI.getFileContent('content/projects.json');
      if (result) {
        return JSON.parse(result.content);
      }
      return null;
    } catch (error) {
      console.error('Error fetching projects from GitHub:', error);
      return null;
    }
  },

  async saveProjects(projects, message = 'Update projects data') {
    try {
      const content = JSON.stringify(projects, null, 2);
      const result = await this.safeUpdateFile('content/projects.json', content, message);
      return result;
    } catch (error) {
      console.error('Error saving projects to GitHub:', error);
      throw error;
    }
  },

  // Site configuration management
  async getSiteConfig() {
    try {
      const result = await githubAPI.getFileContent('content/siteConfig.json');
      if (result) {
        return JSON.parse(result.content);
      }
      return null;
    } catch (error) {
      console.error('Error fetching site config from GitHub:', error);
      return null;
    }
  },

  async saveSiteConfig(config, message = 'Update site configuration') {
    try {
      const content = JSON.stringify(config, null, 2);
      const result = await this.safeUpdateFile('content/siteConfig.json', content, message);
      return result;
    } catch (error) {
      console.error('Error saving site config to GitHub:', error);
      throw error;
    }
  },

  // Batch update both projects and site config in a single commit
  async saveBoth(projects, siteConfig, message = 'Update website content via admin panel') {
    try {
      // Generate JS file content for static imports
      const projectsJsContent = `export const projects = ${JSON.stringify(projects, null, 2)};`;
      const siteConfigJsContent = `export const siteConfig = ${JSON.stringify(siteConfig, null, 2)};

export default siteConfig;`;

      const fileUpdates = [
        // JSON files for admin panel consumption
        {
          path: 'content/projects.json',
          content: JSON.stringify(projects, null, 2)
        },
        {
          path: 'content/siteConfig.json', 
          content: JSON.stringify(siteConfig, null, 2)
        },
        // JS files for website static imports (critical for GitHub Pages build)
        {
          path: 'data/projects.js',
          content: projectsJsContent
        },
        {
          path: 'data/siteConfig.js',
          content: siteConfigJsContent
        }
      ];

      const result = await githubAPI.updateMultipleFiles(fileUpdates, message);
      return result;
    } catch (error) {
      console.error('Error saving content to GitHub:', error);
      throw error;
    }
  }
};

export default githubAPI; 
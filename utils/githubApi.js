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

  // Update or create file in repository
  async updateFile(path, content, message, sha = null) {
    if (!this.isConfigured()) {
      throw new Error('GitHub API not configured');
    }

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
        throw new Error(`GitHub API error: ${response.status} ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        sha: data.content.sha,
        path: data.content.path,
        commitSha: data.commit.sha,
        commitUrl: data.commit.html_url
      };
    } catch (error) {
      console.error('Error updating file:', error);
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
      const currentFile = await githubAPI.getFileContent('content/projects.json');
      const content = JSON.stringify(projects, null, 2);
      
      const result = await githubAPI.updateFile(
        'content/projects.json',
        content,
        message,
        currentFile?.sha
      );
      
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
      const currentFile = await githubAPI.getFileContent('content/siteConfig.json');
      const content = JSON.stringify(config, null, 2);
      
      const result = await githubAPI.updateFile(
        'content/siteConfig.json',
        content,
        message,
        currentFile?.sha
      );
      
      return result;
    } catch (error) {
      console.error('Error saving site config to GitHub:', error);
      throw error;
    }
  }
};

export default githubAPI; 
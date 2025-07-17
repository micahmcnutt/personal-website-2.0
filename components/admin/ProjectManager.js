import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Star, Upload, Eye, ExternalLink, Github, AlertCircle, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getProjects, saveProjects, GitHubSync } from '../../utils/dataManager';

const ProjectManager = ({ onSave }) => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    image: ''
  });
  const [newTechnology, setNewTechnology] = useState('');

  const categories = ['web', 'mobile', 'backend', 'tools'];

  // Load initial data and sync status on component mount
  useEffect(() => {
    const initialProjects = getProjects();
    setProjects(initialProjects);
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
      'Enter a commit message for this project update:',
      'Update projects via admin panel'
    );
    
    if (!commitMessage) return;

    setIsPublishing(true);
    
    try {
      const result = await GitHubSync.pushToGitHub(commitMessage);
      
      if (result.success) {
        alert('Projects published successfully! Your website will update automatically.');
        updateSyncStatus();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert(`Error publishing projects: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    if (editingProject) {
      setFormData({
        ...editingProject,
        technologies: [...editingProject.technologies]
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'web',
        technologies: [],
        liveUrl: '',
        githubUrl: '',
        featured: false,
        image: ''
      });
    }
  }, [editingProject]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const projectData = {
      ...formData,
      id: editingProject ? editingProject.id : Date.now(),
      technologies: formData.technologies.filter(tech => tech.trim())
    };

    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map(p => p.id === editingProject.id ? projectData : p);
    } else {
      updatedProjects = [...projects, projectData];
    }

    setProjects(updatedProjects);
    
    // Save to localStorage via dataManager
    saveProjects(updatedProjects);

    setEditingProject(null);
    setIsCreating(false);
    
    // Update sync status since we made changes
    setTimeout(updateSyncStatus, 100);
    
    // Call the onSave callback if provided
    if (onSave) {
      onSave(updatedProjects);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      
      // Save to localStorage via dataManager
      saveProjects(updatedProjects);
      
      // Update sync status since we made changes
      setTimeout(updateSyncStatus, 100);
    }
  };

  const toggleFeatured = (id) => {
    const updatedProjects = projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProjects(updatedProjects);
    
    // Save to localStorage via dataManager
    saveProjects(updatedProjects);
    
    // Update sync status since we made changes
    setTimeout(updateSyncStatus, 100);
  };

  const generateCodeSnippet = () => {
    const code = `export const projects = ${JSON.stringify(projects, null, 2)};`;
    navigator.clipboard.writeText(code);
    alert('Project data copied to clipboard! You can paste this into your projects.js file.');
  };

  const ProjectForm = () => (
    <Card className="mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          <Button
            onClick={() => {
              setEditingProject(null);
              setIsCreating(false);
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
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Live URL
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => handleInputChange('liveUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add a technology"
              />
              <Button onClick={addTechnology} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm flex items-center gap-1"
                >
                  {tech}
                  <button
                    onClick={() => removeTechnology(tech)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Featured Project
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} variant="primary">
            <Save className="h-4 w-4 mr-2" />
            Save Project
          </Button>
          <Button
            onClick={() => {
              setEditingProject(null);
              setIsCreating(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Project Manager
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCreating(true)}
            variant="primary"
            disabled={isCreating || editingProject}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
          <Button
            onClick={generateCodeSnippet}
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

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {projects.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Projects</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {projects.filter(p => p.featured).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Featured</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {projects.filter(p => p.category === 'web').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Web Projects</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {projects.filter(p => p.liveUrl).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Live Projects</div>
        </div>
      </div>

      {(isCreating || editingProject) && <ProjectForm />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center relative">
              <span className="text-white font-semibold">Preview</span>
              {project.featured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                  Featured
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                  {project.category}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleFeatured(project.id)}
                    className={`p-1 rounded ${
                      project.featured
                        ? 'text-yellow-600 hover:text-yellow-700'
                        : 'text-gray-400 hover:text-yellow-600'
                    }`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setEditingProject(project)}
                    className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager; 
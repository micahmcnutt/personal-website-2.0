import { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, Search, Eye, Star, Calendar, Code, Zap, X } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getProjects, getFeaturedProjects } from '../../utils/dataManager';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects', icon: Code },
    { id: 'web', name: 'Web Apps', icon: Zap },
    { id: 'mobile', name: 'Mobile', icon: Calendar },
    { id: 'backend', name: 'Backend', icon: Code },
    { id: 'tools', name: 'Tools', icon: Star }
  ];

  // Load projects from data manager
  useEffect(() => {
    const loadedProjects = getProjects();
    setAllProjects(loadedProjects);
    setFilteredProjects(loadedProjects);
  }, []);

  // Get all technologies from loaded projects
  const allTechnologies = allProjects.reduce((acc, project) => {
    project.technologies.forEach(tech => {
      if (!acc.includes(tech)) {
        acc.push(tech);
      }
    });
    return acc;
  }, []);
  const featuredProjects = allProjects.filter(project => project.featured);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = showFeatured ? featuredProjects : allProjects;
      
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(project => project.category === selectedCategory);
      }
      
      if (searchTerm) {
        filtered = filtered.filter(project => 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm, showFeatured, featuredProjects, allProjects]);

  const ProjectDetailModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white font-semibold text-lg">Project Preview</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Project Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Category: {project.category}</span>
                  </div>
                  {project.featured && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Featured Project</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 space-y-3">
                  {project.liveUrl && (
                    <Button href={project.liveUrl} variant="primary" className="w-full" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button href={project.githubUrl} variant="outline" className="w-full" target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      View Source Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project }) => (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center relative overflow-hidden">
          <span className="text-white font-semibold">Project Preview</span>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
        </div>
        
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="h-3 w-3" />
            Featured
          </div>
        )}
        
        <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
          {project.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setSelectedProject(project)}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="outline" size="sm" target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="outline" size="sm" target="_blank">
              <Github className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive showcase of my work, featuring web applications, mobile apps, 
            backend systems, and development tools I've built.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {projects.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {featuredProjects.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Featured</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {allTechnologies.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {categories.length - 1}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Categories</div>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, technologies, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            {/* Featured Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFeatured(!showFeatured)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  showFeatured
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Star className="h-4 w-4 mr-2 inline" />
                Featured Only
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 dark:bg-gray-700 aspect-video rounded-lg mb-4" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setShowFeatured(false);
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to bring your ideas to life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            I'm always excited to work on new projects and tackle interesting challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg">
              Let's Collaborate
            </Button>
            <Button href="https://github.com/yourusername" variant="outline" size="lg" target="_blank">
              <Github className="h-5 w-5 mr-2" />
              View All Code
            </Button>
          </div>
        </div>
      </div>
      
      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default PortfolioPage; 
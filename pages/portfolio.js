import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { getProjects } from '../utils/dataManager';

export default function Portfolio() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    try {
      console.log('Portfolio page loading...');
      
      // Test actual data loading
      console.log('Calling getProjects...');
      const loadedProjects = getProjects();
      console.log('getProjects returned:', loadedProjects);
      
      setTimeout(() => {
        console.log('Setting projects:', loadedProjects);
        setProjects(loadedProjects);
        setIsLoading(false);
        console.log('Portfolio page loaded successfully');
      }, 100);
    } catch (err) {
      console.error('Portfolio page error:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <Layout>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Error Loading Portfolio
              </h1>
              <p className="text-xl text-red-600 dark:text-red-400 max-w-3xl mx-auto">
                {error}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                My Portfolio
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Loading...
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              My Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              Portfolio page is working! Data loading test:
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Loaded {projects?.length || 0} projects
            </p>
            {projects?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Projects:</h2>
                <div className="space-y-2">
                  {projects.slice(0, 3).map(project => (
                    <div key={project.id} className="p-4 border rounded">
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 
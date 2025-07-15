import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import ProjectManager from '../../components/admin/ProjectManager';
import { authenticateUser, createAuthSession, clearAuthSession } from '../../utils/auth';

export default function ProjectsAdmin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

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

  const handleProjectSave = (projects) => {
    console.log('Updated projects:', projects);
    // In a real application, you would save this to your database
    // For now, we'll just show a success message
    alert('Projects updated successfully! Check the console for the updated data.');
  };

  return (
    <Layout>
      <Head>
        <title>Portfolio Admin - Micah McNutt</title>
        <meta name="description" content="Admin panel for managing portfolio projects" />
      </Head>
      
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Admin Login
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Enter password to access the admin panel
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Portfolio Admin
                  </h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your portfolio projects with ease
                  </p>
                </div>
                <button
                  onClick={() => router.push('/portfolio')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  View Portfolio
                </button>
              </div>
              
              <ProjectManager onSave={handleProjectSave} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 
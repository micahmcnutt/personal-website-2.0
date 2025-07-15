export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A comprehensive e-commerce solution built with modern technologies. Features include user authentication, product catalog with search and filters, shopping cart functionality, secure payment processing with Stripe integration, order tracking, and an admin dashboard for inventory management.',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    liveUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
    image: '/images/projects/ecommerce.jpg'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative project management application with real-time updates. Built with Next.js and TypeScript, featuring drag-and-drop task organization, team collaboration tools, file attachments, time tracking, project templates, and comprehensive reporting dashboard.',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Socket.io', 'Tailwind CSS'],
    liveUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: true,
    image: '/images/projects/taskmanager.jpg'
  },
  {
    id: 3,
    title: 'Real-time Chat Application',
    description: 'A modern messaging platform with real-time communication capabilities. Features include instant messaging, file sharing, group chats, emoji reactions, message search, user status indicators, and optional video calling integration using WebRTC.',
    category: 'web',
    technologies: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://chat-demo.example.com',
    githubUrl: 'https://github.com/yourusername/chat-app',
    featured: true,
    image: '/images/projects/chat.jpg'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A responsive weather application with beautiful UI and comprehensive weather data. Features location-based forecasts, interactive weather maps, historical data visualization, severe weather alerts, and customizable widgets for different locations.',
    category: 'web',
    technologies: ['React', 'OpenWeather API', 'Tailwind CSS', 'Chart.js', 'Geolocation API'],
    liveUrl: 'https://weather-app-demo.example.com',
    githubUrl: 'https://github.com/yourusername/weather-app',
    featured: false,
    image: '/images/projects/weather.jpg'
  },
  {
    id: 5,
    title: 'Mobile Fitness Tracker',
    description: 'A comprehensive fitness tracking mobile application built with React Native. Features include workout logging, nutrition tracking, progress visualization, social features, goal setting, and integration with wearable devices for automatic data sync.',
    category: 'mobile',
    technologies: ['React Native', 'Redux', 'Firebase', 'Chart.js', 'Expo'],
    liveUrl: null,
    githubUrl: 'https://github.com/yourusername/fitness-tracker',
    featured: false,
    image: '/images/projects/fitness.jpg'
  },
  {
    id: 6,
    title: 'REST API Server',
    description: 'A robust and scalable RESTful API server with comprehensive features. Includes JWT authentication, role-based access control, rate limiting, API documentation with Swagger, comprehensive logging, error handling, and automated testing suite.',
    category: 'backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger', 'Jest'],
    liveUrl: 'https://api-demo.example.com/docs',
    githubUrl: 'https://github.com/yourusername/rest-api-server',
    featured: false,
    image: '/images/projects/api.jpg'
  },
  {
    id: 7,
    title: 'Code Generator CLI',
    description: 'A powerful command-line tool for generating boilerplate code across different frameworks and languages. Features customizable templates, project scaffolding, configuration management, plugin system, and integration with popular development tools.',
    category: 'tools',
    technologies: ['Python', 'Click', 'Jinja2', 'PyPI', 'YAML'],
    liveUrl: 'https://pypi.org/project/code-generator-tool/',
    githubUrl: 'https://github.com/yourusername/code-generator',
    featured: false,
    image: '/images/projects/cli.jpg'
  },
  {
    id: 8,
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets with real-time updates. Built with D3.js and React, featuring multiple chart types, data filtering, export functionality, responsive design, and customizable dashboard layouts.',
    category: 'web',
    technologies: ['D3.js', 'React', 'Python', 'Flask', 'PostgreSQL', 'WebSocket'],
    liveUrl: 'https://dashboard-demo.example.com',
    githubUrl: 'https://github.com/yourusername/data-dashboard',
    featured: false,
    image: '/images/projects/dashboard.jpg'
  },
  {
    id: 9,
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features include dark/light mode, smooth animations, contact form, blog integration, SEO optimization, and deployment automation with GitHub Actions.',
    category: 'web',
    technologies: ['Next.js', 'Tailwind CSS', 'MDX', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://micahmcnutt.dev',
    githubUrl: 'https://github.com/yourusername/portfolio',
    featured: false,
    image: '/images/projects/portfolio.jpg'
  }
];

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category) => {
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

export const getRecentProjects = (count = 3) => {
  return projects.slice(0, count);
};

export const getTechnologies = () => {
  const allTechnologies = projects.flatMap(project => project.technologies);
  return [...new Set(allTechnologies)].sort();
}; 
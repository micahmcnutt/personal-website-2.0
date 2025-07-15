export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    liveUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Socket.io'],
    liveUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: true
  },
  {
    id: 3,
    title: 'Weather App',
    description: 'A responsive weather application with location-based forecasts, interactive maps, and weather alerts.',
    category: 'web',
    technologies: ['React', 'OpenWeather API', 'Tailwind CSS', 'Chart.js'],
    liveUrl: 'https://weather-app-demo.example.com',
    githubUrl: 'https://github.com/yourusername/weather-app',
    featured: false
  },
  {
    id: 4,
    title: 'Mobile Fitness Tracker',
    description: 'A React Native mobile app for tracking workouts, nutrition, and fitness goals with data visualization.',
    category: 'mobile',
    technologies: ['React Native', 'Redux', 'Firebase', 'Chart.js'],
    liveUrl: null,
    githubUrl: 'https://github.com/yourusername/fitness-tracker',
    featured: false
  },
  {
    id: 5,
    title: 'REST API Server',
    description: 'A robust RESTful API server with authentication, rate limiting, and comprehensive documentation.',
    category: 'backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    liveUrl: 'https://api-demo.example.com/docs',
    githubUrl: 'https://github.com/yourusername/rest-api-server',
    featured: false
  },
  {
    id: 6,
    title: 'Code Generator Tool',
    description: 'A CLI tool that generates boilerplate code for different frameworks and languages with customizable templates.',
    category: 'tools',
    technologies: ['Python', 'Click', 'Jinja2', 'PyPI'],
    liveUrl: 'https://pypi.org/project/code-generator-tool/',
    githubUrl: 'https://github.com/yourusername/code-generator',
    featured: false
  },
  {
    id: 7,
    title: 'Real-time Chat Application',
    description: 'A modern chat application with real-time messaging, file sharing, and video calling capabilities.',
    category: 'web',
    technologies: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB'],
    liveUrl: 'https://chat-demo.example.com',
    githubUrl: 'https://github.com/yourusername/chat-app',
    featured: true
  },
  {
    id: 8,
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets with charts, graphs, and real-time updates.',
    category: 'web',
    technologies: ['D3.js', 'React', 'Python', 'Flask', 'PostgreSQL'],
    liveUrl: 'https://dashboard-demo.example.com',
    githubUrl: 'https://github.com/yourusername/data-dashboard',
    featured: false
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
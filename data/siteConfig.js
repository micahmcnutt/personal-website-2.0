export const siteConfig = {
  // Personal Information
  personal: {
    name: 'Micah McNutt',
    title: 'Full-Stack Developer',
    bio: "I'm a passionate full-stack developer with a love for creating digital experiences that are both functional and beautiful. My journey in tech started with curiosity and has evolved into a career focused on solving complex problems through elegant code.",
    tagline: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in the power of collaboration and continuous learning.",
    closing: "My approach combines technical expertise with creative problem-solving to deliver solutions that exceed expectations.",
    profileImage: '/images/profile.jpg',
    resumeUrl: '/resume.pdf',
    location: 'Austin, TX',
    timezone: 'Central Time Zone',
    email: 'micah.mcnutt@example.com',
    phone: '+1 (555) 123-4567',
    availability: 'Available 9 AM - 6 PM EST'
  },

  // Typing Animation Roles
  roles: [
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'UI/UX Designer'
  ],

  // Homepage Stats
  stats: [
    { label: 'Projects Completed', value: '25+', icon: 'Code' },
    { label: 'Happy Clients', value: '15+', icon: 'Users' },
    { label: 'Years Experience', value: '3+', icon: 'Award' },
    { label: 'Technologies', value: '20+', icon: 'Zap' }
  ],

  // Skills for Homepage
  skills: [
    { name: 'Frontend Development', level: 90, color: 'bg-blue-500' },
    { name: 'Backend Development', level: 85, color: 'bg-green-500' },
    { name: 'UI/UX Design', level: 80, color: 'bg-purple-500' },
    { name: 'DevOps & Cloud', level: 75, color: 'bg-orange-500' }
  ],

  // Social Links
  social: {
    github: {
      url: 'https://github.com/yourusername',
      username: 'yourusername',
      display: true
    },
    linkedin: {
      url: 'https://linkedin.com/in/yourprofile',
      username: 'yourprofile',
      display: true
    },
    twitter: {
      url: 'https://twitter.com/yourusername',
      username: 'yourusername',
      display: true
    },
    instagram: {
      url: 'https://instagram.com/yourusername',
      username: 'yourusername',
      display: true
    },
    youtube: {
      url: 'https://youtube.com/c/yourchannel',
      username: 'yourchannel',
      display: true
    },
    portfolio: {
      url: 'https://micahmcnutt.dev',
      username: 'micahmcnutt.dev',
      display: true
    }
  },

  // Contact Information
  contact: {
    email: {
      address: 'micah.mcnutt@example.com',
      display: true,
      description: 'Best for project inquiries'
    },
    phone: {
      number: '+1 (555) 123-4567',
      display: true,
      description: 'Available 9 AM - 6 PM EST'
    },
    location: {
      city: 'Austin, TX',
      display: true,
      description: 'Central Time Zone'
    },
    whatsapp: {
      number: '+1 (555) 123-4567',
      display: true,
      description: 'Quick messages'
    }
  },

  // Homepage Content
  hero: {
    greeting: "Hi, I'm",
    name: "Micah McNutt",
    subtitle: "Ready to Build Something Amazing?",
    description: "I'm always excited to take on new challenges and collaborate on innovative projects. Let's turn your ideas into reality.",
    primaryButton: {
      text: 'Start a Project',
      url: '/contact'
    },
    secondaryButton: {
      text: 'Download Resume',
      url: '/resume.pdf'
    }
  },

  // Project Categories
  projectCategories: [
    { id: 'all', name: 'All Projects', icon: 'Code' },
    { id: 'web', name: 'Web Apps', icon: 'Zap' },
    { id: 'mobile', name: 'Mobile', icon: 'Calendar' },
    { id: 'backend', name: 'Backend', icon: 'Code' },
    { id: 'tools', name: 'Tools', icon: 'Star' }
  ],

  // Contact Form Configuration
  contactForm: {
    projectTypes: [
      'Web Development',
      'Mobile App',
      'UI/UX Design',
      'Consulting',
      'Other'
    ],
    budgetRanges: [
      'Under $1,000',
      '$1,000 - $5,000',
      '$5,000 - $10,000',
      '$10,000 - $25,000',
      '$25,000+',
      'Let\'s discuss'
    ],
    timelineOptions: [
      'ASAP',
      '1-2 weeks',
      '1 month',
      '2-3 months',
      '3+ months',
      'Flexible'
    ]
  },

  // SEO Configuration
  seo: {
    title: 'Micah McNutt - Full Stack Developer',
    description: 'Personal website and portfolio of Micah McNutt, a passionate full-stack developer specializing in modern web technologies.',
    keywords: ['full-stack developer', 'web development', 'React', 'Node.js', 'portfolio'],
    author: 'Micah McNutt',
    url: 'https://micahmcnutt.github.io/personal-website-2.0',
    image: '/images/og-image.jpg'
  },

  // Site Configuration
  site: {
    name: 'Micah McNutt',
    domain: 'micahmcnutt.github.io',
    analytics: {
      google: '', // Add Google Analytics ID if needed
      enabled: false
    },
    features: {
      darkMode: true,
      animations: true,
      contactForm: true,
      adminPanel: true
    }
  }
};

export default siteConfig; 
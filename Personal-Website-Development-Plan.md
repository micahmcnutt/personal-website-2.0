# Personal Website Development Plan

## Project Overview
Build a modern, elegant personal website hosted on GitHub Pages featuring:
- Personal profile homepage
- Portfolio showcase
- Socials and contact page
- Light/dark mode support
- Semi-static content management
- Responsive design

## Technology Stack
- **Frontend**: React with Next.js (static export)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React or Heroicons
- **Deployment**: GitHub Pages
- **Version Control**: Git/GitHub

---

## Task 1: Project Setup and Repository Creation

### 1.1 Create GitHub Repository
1. Go to GitHub and create a new repository named `[username].github.io`
2. Make it public (required for GitHub Pages)
3. Initialize with README
4. Clone to local machine: `git clone https://github.com/[username]/[username].github.io.git`

### 1.2 Set Up Local Development Environment
1. Navigate to project directory: `cd [username].github.io`
2. Initialize Node.js project: `npm init -y`
3. Install Next.js and dependencies:
   ```bash
   npm install next react react-dom
   npm install -D tailwindcss postcss autoprefixer
   npm install lucide-react
   ```

### 1.3 Configure Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "start": "next start"
  }
}
```

---

## Task 2: Technology Stack Configuration

### 2.1 Configure Next.js for Static Export
Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 2.2 Set Up Tailwind CSS
1. Initialize Tailwind: `npx tailwindcss init -p`
2. Configure `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2.3 Create Global Styles
Create `styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .theme-transition {
    @apply transition-colors duration-300 ease-in-out;
  }
}
```

---

## Task 3: Project Structure Creation

### 3.1 Create Directory Structure
```
project-root/
├── pages/
│   ├── index.js          # Homepage
│   ├── portfolio.js      # Portfolio page
│   ├── contact.js        # Contact page
│   └── _app.js          # App wrapper
├── components/
│   ├── Layout.js         # Main layout
│   ├── Navbar.js         # Navigation
│   ├── ThemeToggle.js    # Dark/light mode toggle
│   ├── Hero.js           # Homepage hero section
│   ├── ProjectCard.js    # Portfolio project cards
│   └── ContactForm.js    # Contact components
├── data/
│   ├── projects.js       # Project data
│   └── social-links.js   # Social media links
├── styles/
│   └── globals.css
└── public/
    └── images/           # Profile and project images
```

### 3.2 Create Base App Component
Create `pages/_app.js`:
```javascript
import '../styles/globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

---

## Task 4: Theme System Implementation

### 4.1 Create Theme Context
Create `contexts/ThemeContext.js`:
```javascript
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 4.2 Create Theme Toggle Component
Create `components/ThemeToggle.js`:
```javascript
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 theme-transition hover:bg-gray-300 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
}
```

---

## Task 5: Homepage Development

### 5.1 Create Layout Component
Create `components/Layout.js`:
```javascript
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 theme-transition">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
```

### 5.2 Create Navigation Component
Create `components/Navbar.js`:
```javascript
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg theme-transition">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Name
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/portfolio" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Portfolio
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
```

### 5.3 Create Hero Section
Create `components/Hero.js`:
```javascript
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <img
          src="/images/profile.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-8 object-cover"
        />
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Hi, I'm Your Name
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Brief introduction about yourself, your passions, and what you do.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/portfolio"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
          >
            View My Work
          </a>
          <a
            href="/contact"
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}
```

### 5.4 Create Homepage
Create `pages/index.js`:
```javascript
import Layout from '../components/Layout'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <Layout>
      <Hero />
    </Layout>
  )
}
```

---

## Task 6: Portfolio Page Development

### 6.1 Create Project Data Structure
Create `data/projects.js`:
```javascript
export const projects = [
  {
    id: 1,
    title: "Project Title 1",
    description: "Brief description of the project",
    image: "/images/project1.jpg",
    category: "design", // design, photography, hobby
    technologies: ["React", "CSS", "JavaScript"],
    liveUrl: "https://project1.com",
    githubUrl: "https://github.com/username/project1"
  },
  // Add more projects...
]

export const categories = ["all", "design", "photography", "hobby"]
```

### 6.2 Create Project Card Component
Create `components/ProjectCard.js`:
```javascript
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden theme-transition">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
```

### 6.3 Create Portfolio Page
Create `pages/portfolio.js`:
```javascript
import { useState } from 'react'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import { projects, categories } from '../data/projects'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          My Portfolio
        </h1>
        
        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
```

---

## Task 7: Contact Page Development

### 7.1 Create Social Links Data
Create `data/social-links.js`:
```javascript
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone,
  MapPin
} from 'lucide-react'

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/username',
    icon: Github,
    color: 'hover:text-gray-600'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/username',
    icon: Linkedin,
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/username',
    icon: Twitter,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/username',
    icon: Instagram,
    color: 'hover:text-pink-600'
  }
]

export const contactInfo = [
  {
    type: 'email',
    value: 'your.email@example.com',
    icon: Mail,
    href: 'mailto:your.email@example.com'
  },
  {
    type: 'phone',
    value: '+1 (555) 123-4567',
    icon: Phone,
    href: 'tel:+15551234567'
  },
  {
    type: 'location',
    value: 'Your City, State',
    icon: MapPin,
    href: null
  }
]
```

### 7.2 Create Contact Page
Create `pages/contact.js`:
```javascript
import Layout from '../components/Layout'
import { socialLinks, contactInfo } from '../data/social-links'

export default function Contact() {
  return (
    <Layout>
      <div className="py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Get In Touch
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300">
                        {info.value}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Follow Me
            </h3>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 ${link.color} transition-colors`}
                    aria-label={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Send Message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
```

---

## Task 8: Responsive Design and Styling

### 8.1 Add Responsive Breakpoints
Update components with responsive classes:
- `sm:` for mobile landscape (640px+)
- `md:` for tablet (768px+)
- `lg:` for desktop (1024px+)
- `xl:` for large desktop (1280px+)

### 8.2 Mobile Navigation (if needed)
Create hamburger menu for mobile devices:
```javascript
// Add to Navbar.js
const [isMenuOpen, setIsMenuOpen] = useState(false)

// Add mobile menu toggle button and responsive menu
```

### 8.3 Optimize Images and Performance
1. Add image optimization
2. Implement lazy loading for project images
3. Add loading states for better UX

---

## Task 9: GitHub Pages Deployment Setup

### 9.1 Create GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### 9.2 Configure Repository Settings
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as source
3. Ensure repository is public

### 9.3 Add .nojekyll File
Create `public/.nojekyll` (empty file) to prevent Jekyll processing

---

## Task 10: Content Management System

### 10.1 Create Easy Update System
Structure data files for easy updates:
- `data/projects.js` - Add/remove projects
- `data/social-links.js` - Update social media links
- `data/personal-info.js` - Update personal information

### 10.2 Image Management
1. Create organized folder structure in `public/images/`
2. Add placeholder images
3. Document image requirements and naming conventions

### 10.3 Content Update Documentation
Create `CONTENT_GUIDE.md` with instructions for:
- Adding new projects
- Updating social links
- Changing personal information
- Adding new pages

---

## Task 11: Testing and Quality Assurance

### 11.1 Testing Checklist
- [ ] All links work correctly
- [ ] Theme toggle functions properly
- [ ] Responsive design works on all devices
- [ ] Images load correctly
- [ ] Navigation works smoothly
- [ ] Performance is optimized

### 11.2 Cross-browser Testing
Test on:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

### 11.3 Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Alt text for images

---

## Task 12: Deployment and Launch

### 12.1 Pre-deployment Checklist
- [ ] All content is updated
- [ ] Images are optimized
- [ ] Links are tested
- [ ] SEO meta tags are added
- [ ] Favicon is created and added

### 12.2 Deploy to GitHub Pages
1. Push all changes to main branch
2. GitHub Actions will automatically build and deploy
3. Site will be available at `https://[username].github.io`

### 12.3 Post-deployment Testing
1. Test live site functionality
2. Check all links and images
3. Verify mobile responsiveness
4. Test theme switching

---

## Maintenance and Updates

### Regular Tasks
- Update project portfolio
- Refresh social media links
- Update personal information
- Add new features as needed

### Performance Monitoring
- Monitor site speed
- Check for broken links
- Update dependencies regularly

### Content Updates
- Follow the Content Guide for easy updates
- Test changes locally before deploying
- Use branching for major updates

---

## Additional Features (Optional)

### Analytics
- Add Google Analytics or similar
- Track visitor behavior
- Monitor popular content

### SEO Optimization
- Add meta descriptions
- Implement structured data
- Create sitemap.xml

### Advanced Features
- Add blog functionality
- Implement search feature
- Add newsletter signup
- Create downloadable resume

---

## Conclusion

This plan provides a comprehensive roadmap for building a modern, elegant personal website hosted on GitHub Pages. Each task is designed to be actionable and straightforward, allowing for easy implementation and future updates.

Remember to:
- Test thoroughly at each stage
- Keep content updated regularly
- Monitor performance and user experience
- Continuously improve based on feedback

Your website will serve as a professional showcase of your work and personality, providing visitors with an engaging and informative experience across all devices and themes. 
import { useState, useEffect } from 'react';
import { ArrowRight, Download, Code, Zap, Users, Award, Github, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getFeaturedProjects } from '../../data/projects';

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const roles = [
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'UI/UX Designer'
  ];
  
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    setFeaturedProjects(getFeaturedProjects());
    setIsVisible(true);
    
    // Typing animation for roles
    const typeRole = () => {
      const role = roles[currentRole];
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < role.length) {
          setTypedText(role.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            const erasingInterval = setInterval(() => {
              if (i > 0) {
                setTypedText(role.substring(0, i - 1));
                i--;
              } else {
                clearInterval(erasingInterval);
                setCurrentRole((prev) => (prev + 1) % roles.length);
              }
            }, 50);
          }, 2000);
        }
      }, 100);
    };

    typeRole();
    const roleInterval = setInterval(typeRole, 4000);
    return () => clearInterval(roleInterval);
  }, [currentRole]);

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '25+' },
    { icon: Users, label: 'Happy Clients', value: '15+' },
    { icon: Award, label: 'Years Experience', value: '3+' },
    { icon: Zap, label: 'Technologies', value: '20+' }
  ];

  const skills = [
    { name: 'Frontend Development', level: 90, color: 'bg-blue-500' },
    { name: 'Backend Development', level: 85, color: 'bg-green-500' },
    { name: 'UI/UX Design', level: 80, color: 'bg-purple-500' },
    { name: 'DevOps & Cloud', level: 75, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 theme-transition">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                MM
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
              Hi, I'm <span className="gradient-primary bg-clip-text text-transparent">Micah McNutt</span>
            </h1>
            
            <div className="text-2xl md:text-3xl text-secondary mb-8 h-12 flex items-center justify-center">
              <span className="mr-2">I'm a</span>
              <span className="gradient-primary bg-clip-text text-transparent font-semibold min-w-[280px] text-left">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <p className="text-xl md:text-2xl text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating <span className="text-blue-600 dark:text-blue-400 font-semibold">innovative solutions</span> and 
              building <span className="text-purple-600 dark:text-purple-400 font-semibold">beautiful user experiences</span> that make a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href="/portfolio" variant="gradient" size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="group">
                Get In Touch
                <span className="ml-2 transition-transform group-hover:scale-110">👋</span>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-primary shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-secondary">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
                About Me
              </h2>
              
              <div className="space-y-6 text-lg text-secondary leading-relaxed">
                <p>
                  I'm a passionate <span className="text-blue-600 dark:text-blue-400 font-semibold">full-stack developer</span> with 
                  a love for creating digital experiences that are both functional and beautiful. 
                  My journey in tech started with curiosity and has evolved into a career focused on solving complex problems through elegant code.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community. I believe in the power of collaboration and continuous learning.
                </p>
                
                <p>
                  My approach combines <span className="text-purple-600 dark:text-purple-400 font-semibold">technical expertise</span> with 
                  <span className="text-green-600 dark:text-green-400 font-semibold"> creative problem-solving</span> to deliver solutions that exceed expectations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button href="/resume.pdf" variant="gradient" target="_blank" className="group">
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                  Download Resume
                </Button>
                <Button href="/about" variant="outline" className="group">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <div className="w-full h-96 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <p className="text-xl font-semibold">Profile Image</p>
                    <p className="text-sm opacity-90">Coming Soon</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Skills & Expertise
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              A comprehensive skill set built through years of hands-on experience and continuous learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary">{skill.name}</span>
                  <span className="text-sm text-secondary">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Frontend</h3>
              <p className="text-secondary mb-4">React, Next.js, TypeScript, Tailwind CSS</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-tertiary text-tertiary text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
            
            <Card hover className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Backend</h3>
              <p className="text-secondary mb-4">Node.js, Python, PostgreSQL, MongoDB</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Node.js', 'Python', 'PostgreSQL', 'MongoDB'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-tertiary text-tertiary text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
            
            <Card hover className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Tools</h3>
              <p className="text-secondary mb-4">Git, Docker, AWS, VS Code</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Git', 'Docker', 'AWS', 'VS Code'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-tertiary text-tertiary text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              A showcase of my recent work and technical capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <Card key={project.id} hover className="group overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <span className="text-white font-semibold text-lg z-10">
                    {project.title}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-secondary mb-4 text-sm leading-relaxed">
                  {project.description.substring(0, 100)}...
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-tertiary text-tertiary text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <Button href={project.liveUrl} variant="primary" size="sm" target="_blank" className="group/btn">
                      <ExternalLink className="h-4 w-4 mr-1 transition-transform group-hover/btn:scale-110" />
                      Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button href={project.githubUrl} variant="outline" size="sm" target="_blank" className="group/btn">
                      <Github className="h-4 w-4 mr-1 transition-transform group-hover/btn:scale-110" />
                      Code
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button href="/portfolio" variant="gradient" size="lg" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate on innovative projects. 
            Let's turn your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg" className="group">
              Start a Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/resume.pdf" variant="outline" size="lg" target="_blank" className="group border-white text-white hover:bg-white hover:text-blue-600">
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
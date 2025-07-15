import { useState, useEffect } from 'react';
import { ArrowRight, Download, Code, Zap, Users, Award, Github, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { getSiteConfig, getFeaturedProjects } from '../../utils/dataManager';

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [siteConfig, setSiteConfig] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    // Load data from localStorage or fallback to defaults
    const config = getSiteConfig();
    setSiteConfig(config);
    setFeaturedProjects(getFeaturedProjects());
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!siteConfig || !siteConfig.roles) return;
    
    // Typing animation for roles
    const typeRole = () => {
      const role = siteConfig.roles[currentRole];
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
                setCurrentRole((prev) => (prev + 1) % siteConfig.roles.length);
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

  // Get icon component from string name
  const getIcon = (iconName) => {
    const iconMap = {
      'Code': Code,
      'Users': Users,
      'Award': Award,
      'Zap': Zap
    };
    return iconMap[iconName] || Code;
  };

  // Use siteConfig data or fallback to defaults
  const stats = siteConfig?.stats || [
    { icon: 'Code', label: 'Projects Completed', value: '25+' },
    { icon: 'Users', label: 'Happy Clients', value: '15+' },
    { icon: 'Award', label: 'Years Experience', value: '3+' },
    { icon: 'Zap', label: 'Technologies', value: '20+' }
  ];

  const skills = siteConfig?.skills || [
    { name: 'Frontend Development', level: 90, color: 'bg-blue-500' },
    { name: 'Backend Development', level: 85, color: 'bg-green-500' },
    { name: 'UI/UX Design', level: 80, color: 'bg-purple-500' },
    { name: 'DevOps & Cloud', level: 75, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-0">
      {/* Enhanced Hero Section */}
      <section className="min-h-screen flex items-center justify-center container-responsive bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 theme-transition">
        <div className="w-full max-w-6xl mx-auto text-center mobile-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 lg:mb-12">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-4xl lg:text-5xl font-bold mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-glow animate-float">
                MM
              </div>
            </div>
            
            <h1 className="text-fluid-4xl lg:text-fluid-5xl font-bold text-primary mb-4 lg:mb-6 leading-tight">
              Hi, I'm <span className="gradient-primary bg-clip-text text-transparent">{siteConfig?.personal?.name || 'Micah McNutt'}</span>
            </h1>
            
            <div className="text-fluid-lg lg:text-fluid-xl text-secondary mb-6 lg:mb-8 h-10 lg:h-12 flex items-center justify-center mobile-center">
              <span className="mr-2">I'm a</span>
              <span className="gradient-primary bg-clip-text text-transparent font-semibold min-w-[240px] sm:min-w-[280px] lg:min-w-[320px] text-left">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <p className="text-fluid-base lg:text-fluid-lg text-secondary mb-8 lg:mb-10 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mobile-padding">
              {siteConfig?.personal?.bio || 'Passionate about creating innovative solutions and building beautiful user experiences that make a difference.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-8 lg:mb-12 mobile-stack">
              <Button href="/portfolio" variant="gradient" size="lg" className="group touch-target">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="group touch-target">
                Get In Touch
                <span className="ml-2 transition-transform group-hover:scale-110">👋</span>
              </Button>
            </div>
            
            {/* Enhanced Stats Grid */}
            <div className="responsive-grid max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = getIcon(stat.icon);
                return (
                  <div
                    key={stat.label}
                    className={`text-center p-4 lg:p-6 rounded-lg glass border border-primary shadow-sm hover-lift transition-all duration-300 animate-scale-in ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mx-auto mb-2 lg:mb-3 text-blue-600 dark:text-blue-400 hover-scale" />
                    <div className="text-fluid-xl lg:text-fluid-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-fluid-xs lg:text-fluid-sm text-secondary">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-16 lg:py-20 xl:py-24 container-responsive bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="space-y-6 lg:space-y-8 animate-slide-in-left">
              <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-primary mb-6 lg:mb-8 mobile-center lg:text-left">
                About Me
              </h2>
              
              <div className="space-y-4 lg:space-y-6 text-fluid-base lg:text-fluid-lg text-secondary leading-relaxed">
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
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-6 lg:pt-8 mobile-stack">
                <Button href="/resume.pdf" variant="gradient" target="_blank" className="group touch-target">
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                  Download Resume
                </Button>
                <Button href="/about" variant="outline" className="group touch-target">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="relative z-10">
                <div className="w-full h-80 sm:h-96 lg:h-[28rem] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300 hover-glow">
                  <div className="text-white text-center">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">👨‍💻</div>
                    <p className="text-fluid-lg lg:text-fluid-xl font-semibold">Profile Image</p>
                    <p className="text-fluid-sm opacity-90">Coming Soon</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-24 lg:h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 w-20 h-20 lg:w-32 lg:h-32 bg-purple-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-2 lg:-left-4 w-8 h-8 lg:w-12 lg:h-12 bg-pink-500 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="py-16 lg:py-20 xl:py-24 container-responsive bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-primary mb-4 lg:mb-6 animate-fade-in">
              Skills & Expertise
            </h2>
            <p className="text-fluid-base lg:text-fluid-lg text-secondary max-w-2xl lg:max-w-3xl mx-auto animate-fade-in">
              A comprehensive skill set built through years of hands-on experience and continuous learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2 lg:space-y-3 animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex justify-between items-center">
                  <span className="text-fluid-base lg:text-fluid-lg font-semibold text-primary">{skill.name}</span>
                  <span className="text-fluid-sm text-secondary">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 lg:h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${skill.color} transition-all duration-1000 ease-out hover-glow`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="responsive-grid gap-6 lg:gap-8">
            <Card className="text-center group hover-lift">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-fluid-lg lg:text-fluid-xl font-semibold text-primary mb-3 lg:mb-4">Frontend</h3>
              <p className="text-secondary mb-4 lg:mb-6 text-fluid-sm lg:text-fluid-base">React, Next.js, TypeScript, Tailwind CSS</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-2 py-1 lg:px-3 lg:py-1 bg-tertiary text-tertiary text-fluid-xs lg:text-fluid-sm rounded-full hover-scale">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
            
            <Card className="text-center group hover-lift">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-fluid-lg lg:text-fluid-xl font-semibold text-primary mb-3 lg:mb-4">Backend</h3>
              <p className="text-secondary mb-4 lg:mb-6 text-fluid-sm lg:text-fluid-base">Node.js, Python, PostgreSQL, MongoDB</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Node.js', 'Python', 'PostgreSQL', 'MongoDB'].map((tech) => (
                  <span key={tech} className="px-2 py-1 lg:px-3 lg:py-1 bg-tertiary text-tertiary text-fluid-xs lg:text-fluid-sm rounded-full hover-scale">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
            
            <Card className="text-center group hover-lift">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-fluid-lg lg:text-fluid-xl font-semibold text-primary mb-3 lg:mb-4">Design</h3>
              <p className="text-secondary mb-4 lg:mb-6 text-fluid-sm lg:text-fluid-base">Figma, Adobe Creative Suite, UI/UX</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Figma', 'Adobe XD', 'UI/UX', 'Prototyping'].map((tech) => (
                  <span key={tech} className="px-2 py-1 lg:px-3 lg:py-1 bg-tertiary text-tertiary text-fluid-xs lg:text-fluid-sm rounded-full hover-scale">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Projects Section */}
      <section className="py-16 lg:py-20 xl:py-24 container-responsive bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-primary mb-4 lg:mb-6 animate-fade-in">
              Featured Projects
            </h2>
            <p className="text-fluid-base lg:text-fluid-lg text-secondary max-w-2xl lg:max-w-3xl mx-auto animate-fade-in">
              A showcase of my recent work and technical capabilities.
            </p>
          </div>
          
          <div className="responsive-grid gap-6 lg:gap-8 mb-8 lg:mb-12">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <Card key={project.id} className="group overflow-hidden hover-lift animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-4 lg:mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <span className="text-white font-semibold text-fluid-base lg:text-fluid-lg z-10">
                    {project.title}
                  </span>
                </div>
                
                <h3 className="text-fluid-lg lg:text-fluid-xl font-semibold text-primary mb-2 lg:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="text-secondary mb-4 lg:mb-6 text-fluid-sm lg:text-fluid-base leading-relaxed line-clamp-3">
                  {project.description.substring(0, 100)}...
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-tertiary text-tertiary text-fluid-xs rounded hover-scale">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 lg:gap-3">
                  <Button href={project.liveUrl} variant="primary" size="sm" className="flex-1 touch-target">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </Button>
                  <Button href={project.githubUrl} variant="outline" size="sm" className="touch-target">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button href="/portfolio" variant="outline" size="lg" className="touch-target">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 lg:py-20 xl:py-24 container-responsive bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center mobile-center">
          <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold mb-4 lg:mb-6 animate-fade-in">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-fluid-base lg:text-fluid-lg mb-6 lg:mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in">
            I'm always excited to take on new challenges and collaborate on innovative projects. 
            Let's turn your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mobile-stack">
            <Button href="/contact" variant="secondary" size="lg" className="group touch-target">
              Start a Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/resume.pdf" variant="outline" size="lg" target="_blank" className="group border-white text-white hover:bg-white hover:text-blue-600 touch-target">
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
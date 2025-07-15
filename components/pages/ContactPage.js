import { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, 
  Youtube, MessageCircle, Calendar, Clock, CheckCircle, AlertCircle,
  Globe, Heart, Coffee, Zap, Users, Award, Download, Copy
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    projectType: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (formData.message.length < 10) errors.message = 'Message must be at least 10 characters';
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle form submission here
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        budget: '',
        timeline: '',
        projectType: ''
      });
      setFormErrors({});
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
    alert(`${type} copied to clipboard!`);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'micah.mcnutt@example.com',
      href: 'mailto:micah.mcnutt@example.com',
      description: 'Best for project inquiries'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      description: 'Available 9 AM - 6 PM EST'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Austin, TX',
      href: null,
      description: 'Central Time Zone'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+1 (555) 123-4567',
      href: 'https://wa.me/15551234567',
      description: 'Quick messages'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white',
      description: 'Check out my code'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourprofile',
      icon: Linkedin,
      color: 'hover:text-blue-600',
      description: 'Professional network'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourusername',
      icon: Twitter,
      color: 'hover:text-blue-400',
      description: 'Latest updates'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/yourusername',
      icon: Instagram,
      color: 'hover:text-pink-600',
      description: 'Behind the scenes'
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/c/yourchannel',
      icon: Youtube,
      color: 'hover:text-red-600',
      description: 'Tech tutorials'
    },
    {
      name: 'Portfolio',
      href: 'https://micahmcnutt.dev',
      icon: Globe,
      color: 'hover:text-green-600',
      description: 'View my work'
    }
  ];

  const projectTypes = [
    'Web Development',
    'Mobile App',
    'UI/UX Design',
    'Consulting',
    'Other'
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
    'Let\'s discuss'
  ];

  const timelineOptions = [
    'ASAP',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3+ months',
    'Flexible'
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Let's Work Together
              </h1>
              <div className="absolute -top-2 -right-2">
                <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`}></div>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            I'm passionate about creating amazing digital experiences. Whether you have a project in mind 
            or just want to chat about technology, I'd love to hear from you!
          </p>
          
          {/* Status Bar */}
          <div className="inline-flex items-center space-x-4 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800 dark:text-green-400">Available for new projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Usually responds in 24 hours
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="group">
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex-shrink-0">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {item.label}
                          </p>
                          <div className="flex items-center space-x-2">
                            {item.href ? (
                              <a 
                                href={item.href}
                                className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.value}
                              </span>
                            )}
                            <button
                              onClick={() => copyToClipboard(item.value, item.label)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Copy className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Social Links */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 text-gray-400 group-hover:text-current ${link.color} transition-colors`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {link.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Fun Facts */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Fun Facts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Coffee className="h-4 w-4 text-amber-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Powered by coffee ☕
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Fast response time
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Team player
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Quality focused
                  </span>
                </div>
              </div>
            </Card>

            {/* Download Resume */}
            <Card>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Want to know more?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Download my resume for a detailed overview of my experience and skills.
                </p>
                <Button 
                  href="/resume.pdf" 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  target="_blank"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Start a Conversation
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Local time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 dark:text-green-400">
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-800 dark:text-red-400">
                      Something went wrong. Please try again or contact me directly.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                      formErrors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="What's this about?"
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Tell me about your project or idea..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {formErrors.message && (
                      <p className="text-sm text-red-600">{formErrors.message}</p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                      {formData.message.length} characters
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    * Required fields
                  </p>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={isSubmitting}
                    className="min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Alternative Contact Options */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Prefer a different way to connect?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  href="mailto:micah.mcnutt@example.com" 
                  variant="outline" 
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Directly
                </Button>
                <Button 
                  href="https://calendly.com/yourusername" 
                  variant="outline" 
                  size="sm"
                  target="_blank"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule a Call
                </Button>
                <Button 
                  href="https://wa.me/15551234567" 
                  variant="outline" 
                  size="sm"
                  target="_blank"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
          <Heart className="h-12 w-12 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-4">
            Ready to create something amazing together?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            I'm always excited to work with passionate people on meaningful projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contact-form" variant="secondary" size="lg">
              Start Your Project
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View My Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 
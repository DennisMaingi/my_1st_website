import React, { useState, useEffect } from 'react';
import { EditableText } from './components/EditableText';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { useContentEditor } from './hooks/useContentEditor';
import { useAuth } from './hooks/useAuth';
import { 
  Shield, 
  Code, 
  Bot, 
  FileText, 
  Database,
  Menu,
  X,
  Mail,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  ArrowRight,
  Check,
  Star,
  Globe,
  Zap
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const {
    content,
    isAdminMode: contentAdminMode,
    updateContent,
    saveContent,
    exportContent,
    importContent,
    toggleAdminMode
  } = useContentEditor();

  // Admin mode should only be available to admin users
  const isAdminMode = contentAdminMode && isAdmin;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const expertiseAreas = [
    {
      icon: Code,
      title: "Software Engineering",
      description: "Full-stack development with modern frameworks and scalable architecture",
      skills: ["React & Node.js", "Cloud Architecture", "API Development"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions and risk assessment for digital assets",
      skills: ["Penetration Testing", "Security Audits", "Compliance"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Bot,
      title: "Virtual Assistant",
      description: "AI-powered automation and intelligent business process optimization",
      skills: ["Process Automation", "AI Integration", "Workflow Design"],
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: FileText,
      title: "Journalism",
      description: "Strategic content creation and digital storytelling for modern media",
      skills: ["Content Strategy", "Digital Media", "Brand Storytelling"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Database,
      title: "Information Systems",
      description: "Data architecture and system integration for enterprise solutions",
      skills: ["Database Design", "System Integration", "Analytics"],
      color: "from-indigo-500 to-blue-600"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? isDarkMode 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700' 
            : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Renaissance
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a href="#expertise" className="hover:text-blue-600 transition-colors">Expertise</a>
              <a href="#portal" className="hover:text-blue-600 transition-colors">Portal</a>
              <a href="#insights" className="hover:text-blue-600 transition-colors">Insights</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {isAuthenticated ? (
                <UserProfile user={user} onLogout={logout} />
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  Sign In
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`lg:hidden mt-4 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <div className="flex flex-col space-y-3">
                <a href="#expertise" className="hover:text-blue-600 transition-colors">Expertise</a>
                <a href="#portal" className="hover:text-blue-600 transition-colors">Portal</a>
                <a href="#insights" className="hover:text-blue-600 transition-colors">Insights</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                {!isAuthenticated && (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <EditableText
              text={content.hero.title}
              onSave={(newText) => updateContent('hero.title', newText)}
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight block"
              multiline
              isEditing={isAdminMode}
            />
            <EditableText
              text={content.hero.subtitle}
              onSave={(newText) => updateContent('hero.subtitle', newText)}
              className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed block"
              multiline
              isEditing={isAdminMode}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg">
                Explore Services
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <button 
                onClick={() => !isAuthenticated && setShowAuthModal(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all"
              >
                {isAuthenticated ? 'View Portfolio' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white transform rotate-90" />
        </div>
      </section>

      {/* Expertise Cards */}
      <section id="expertise" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise Areas
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Comprehensive solutions across technology, security, automation, and content creation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {content.expertise.map((area, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-2xl`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${area.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <EditableText
                    text={area.title}
                    onSave={(newText) => updateContent(`expertise[${index}].title`, newText)}
                    className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors block"
                    isEditing={isAdminMode}
                  />
                  
                  <EditableText
                    text={area.description}
                    onSave={(newText) => updateContent(`expertise[${index}].description`, newText)}
                    className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed block`}
                    multiline
                    isEditing={isAdminMode}
                  />
                  
                  <div className="space-y-2">
                    {area.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <EditableText
                          text={skill}
                          onSave={(newText) => {
                            const newSkills = [...area.skills];
                            newSkills[skillIndex] = newText;
                            updateContent(`expertise[${index}].skills`, newSkills);
                          }}
                          className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          isEditing={isAdminMode}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="font-semibold">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Portal Preview */}
      <section id="portal" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Client Portal
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Secure, streamlined access to your projects and communications
              </p>
            </div>

            <div className={`rounded-2xl overflow-hidden shadow-2xl ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Dashboard Preview</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} border-l-4 border-blue-500`}>
                    <h4 className="font-semibold text-blue-600 mb-2">Active Projects</h4>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-emerald-50'} border-l-4 border-emerald-500`}>
                    <h4 className="font-semibold text-emerald-600 mb-2">Completed Tasks</h4>
                    <p className="text-3xl font-bold">47</p>
                  </div>
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-purple-50'} border-l-4 border-purple-500`}>
                    <h4 className="font-semibold text-purple-600 mb-2">Messages</h4>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    Access Portal
                  </button>
                  <button className={`flex-1 border-2 py-3 px-6 rounded-lg transition-all ${
                    isDarkMode 
                      ? 'border-gray-600 hover:bg-gray-800' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Insights */}
      <section id="insights" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Latest Insights
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Thoughts on technology, security, productivity, and digital transformation
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {content.blog.map((post, index) => (
                <article
                  key={index}
                  className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <EditableText
                        text={post.category}
                        onSave={(newText) => updateContent(`blog[${index}].category`, newText)}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full"
                        isEditing={isAdminMode}
                      />
                      <EditableText
                        text={post.date}
                        onSave={(newText) => updateContent(`blog[${index}].date`, newText)}
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        isEditing={isAdminMode}
                      />
                    </div>
                    
                    <EditableText
                      text={post.title}
                      onSave={(newText) => updateContent(`blog[${index}].title`, newText)}
                      className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors block"
                      isEditing={isAdminMode}
                    />
                    
                    <EditableText
                      text={post.excerpt}
                      onSave={(newText) => updateContent(`blog[${index}].excerpt`, newText)}
                      className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed block`}
                      multiline
                      isEditing={isAdminMode}
                    />
                    
                    <div className="flex items-center justify-between">
                      <EditableText
                        text={post.readTime}
                        onSave={(newText) => updateContent(`blog[${index}].readTime`, newText)}
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        isEditing={isAdminMode}
                      />
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="font-semibold text-sm">Read More</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Client Success Stories
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Trusted by innovative companies and forward-thinking leaders
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <EditableText
                    text={testimonial.content}
                    onSave={(newText) => updateContent(`testimonials[${index}].content`, newText)}
                    className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed italic block`}
                    multiline
                    isEditing={isAdminMode}
                  />
                  
                  <div>
                    <EditableText
                      text={testimonial.name}
                      onSave={(newText) => updateContent(`testimonials[${index}].name`, newText)}
                      className="font-bold block"
                      isEditing={isAdminMode}
                    />
                    <EditableText
                      text={testimonial.role}
                      onSave={(newText) => updateContent(`testimonials[${index}].role`, newText)}
                      className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} block`}
                      isEditing={isAdminMode}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Booking */}
      <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-12`}>
              Let's discuss how we can bring your vision to life with cutting-edge technology and strategic expertise.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  Send us a message and we'll respond within 24 hours.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                  Send Message
                </button>
              </div>

              <div className={`p-8 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Schedule Consultation</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  Book a free 30-minute strategy session to discuss your needs.
                </p>
                <button 
                  onClick={() => !isAuthenticated && setShowAuthModal(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all"
                >
                  {isAuthenticated ? 'Book Meeting' : 'Sign Up to Book'}
                </button>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Globe className="w-4 h-4" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Zap className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Renaissance
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Transforming ideas into digital excellence through innovation, security, and strategic storytelling.
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2025 Digital Renaissance. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Admin Panel */}
      {isAdmin && (
        <AdminPanel
          isAdminMode={isAdminMode}
          onToggleAdmin={toggleAdminMode}
          onSaveContent={saveContent}
          onExportContent={exportContent}
          onImportContent={importContent}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={(userData) => {
          login(userData);
          setShowAuthModal(false);
        }}
      />
    </div>
  );
}

export default App;
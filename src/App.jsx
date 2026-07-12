import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Mail, 
  Terminal, 
  Layers, 
  Cpu, 
  Database,
  ArrowRight,
  Menu,
  X,
  FileText,
  Users,
  Lightbulb,
  MessageSquare,
  Zap
} from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TechStack = ({ techStack }) => {
  if (!techStack) return null;

  const categories = [
    { key: 'frontend', title: 'Frontend' },
    { key: 'backend', title: 'Backend' },
    { key: 'coreIntegrations', title: 'Core Integrations' },
    { key: 'securityAndUtilities', title: 'Security & Utilities' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map(({ key, title }) => {
        const items = techStack[key];
        if (!items || items.length === 0) return null;

        return (
          <div key={key} className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-blue border-b border-navy/15 pb-1.5">
              {title}
            </h4>
            <ul className="space-y-2">
              {items.map((tech) => (
                <li key={tech} className="text-xs font-semibold text-navy flex items-start gap-2 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-mauve rounded-full mt-1.5 flex-shrink-0" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const SectionHeader = ({ num, title }) => (
  <div className="text-center mb-16 space-y-2">
    <span className="font-serif italic text-base text-gold block">{num}</span>
    <h2 className="font-serif font-medium text-4xl md:text-5xl text-navy">{title}</h2>
    <div className="flex items-center gap-4 max-w-[200px] mx-auto pt-2">
      <div className="flex-1 h-[1px] bg-line" />
      <div className="w-1.5 h-1.5 rounded-full bg-gold-line" />
      <div className="flex-1 h-[1px] bg-line" />
    </div>
  </div>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDeepDive, setActiveDeepDive] = useState(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  React.useEffect(() => {
    let active = true;
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shrutimundhe22')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch Medium feed');
        return res.json();
      })
      .then(data => {
        if (active) {
          if (data && data.items && data.items.length > 0) {
            const formatted = data.items.slice(0, 3).map(item => {
              const cleanContent = item.description || item.content || '';
              const snippet = cleanContent.replace(/<[^>]*>/g, '').substring(0, 130) + '...';
              return {
                title: item.title,
                link: item.link,
                pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }),
                snippet: snippet
              };
            });
            setArticles(formatted);
          } else {
            throw new Error('No articles found');
          }
          setLoadingArticles(false);
        }
      })
      .catch(err => {
        console.error(err);
        if (active) {
          setArticles([
            {
              title: "Demystifying RAG: Building High-Precision Legal AI Workspaces",
              snippet: "An in-depth look at how Retrieval-Augmented Generation (RAG) is transforming legal consultancy, minimizing hallucinations, and scaling document search.",
              link: "https://medium.com/@shrutimundhe22",
              pubDate: "March 15, 2026"
            },
            {
              title: "Scaling Skincare Recommendations with Gemini AI & Weather Data",
              snippet: "How we leveraged real-time weather APIs and Google Gemini AI SDK to build Rasa, a climate-adaptive beauty recommendation platform.",
              link: "https://medium.com/@shrutimundhe22",
              pubDate: "June 2, 2026"
            },
            {
              title: "Upgrading to React 19 and Vite 8: Practical Architecture Insights",
              snippet: "A developer's guide to transitioning to React 19's new features and Vite 8's speedups in production-grade MERN stack applications.",
              link: "https://medium.com/@shrutimundhe22",
              pubDate: "June 28, 2026"
            }
          ]);
          setLoadingArticles(false);
        }
      });
    return () => { active = false; };
  }, []);

  const projects = [
    {
      id: 'futura',
      title: 'Futura',
      subtitle: 'MERN Stack Platform',
      status: 'In Development',
      statusColor: 'bg-blue text-cream border-blue',
      desc: 'An intelligent career guidance platform designed specifically for Indian graduates navigating the modern job landscape.',
      details: [
        'AI-powered Career Analyzer (Claude API integration) for path recommendation',
        'ATS-optimized Resume Studio with template parser',
        'Interactive Skill Gap Heatmaps with targeted learning suggestions'
      ],
      github: 'https://github.com/shrutimundhe/futura',
      tags: ['MERN', 'Claude AI', 'Redux', 'D3.js'],
      techStack: {
        frontend: ['React 19', 'Vite 8', 'React Router DOM v7', 'Framer Motion v12', 'Recharts v3', 'Lucide React', 'Vanilla CSS with custom theme variables'],
        backend: ['Node.js', 'Express 5', 'MongoDB (Mongoose ODM)'],
        coreIntegrations: ['Google Gemini AI SDK', 'Multer', 'PDF-parse', 'Nodemailer'],
        securityAndUtilities: ['Helmet', 'CORS', 'express-rate-limit']
      }
    },
    {
      id: 'legal-reach',
      title: 'Legal Reach',
      subtitle: 'AI Consultancy Platform',
      status: 'Shipped (March 2026)',
      statusColor: 'bg-mauve text-cream border-mauve',
      desc: 'An automated legal workspace enabling high-precision consultancy, search, and dynamic workflow management.',
      details: [
        'RAG (Retrieval-Augmented Generation) chatbot for fast document analysis',
        'JWT-secured enterprise backend with access control layers',
        'Role-based dashboards for clients, lawyers, and administrators'
      ],
      github: 'https://github.com/shrutimundhe/legal-reach',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'RAG'],
      techStack: {
        frontend: ['React.js'],
        backend: ['Node.js', 'Express.js', 'MongoDB'],
        coreIntegrations: ['RAG-based AI Chatbot', 'Role-based Dashboards'],
        securityAndUtilities: ['JWT Authentication']
      }
    },
    {
      id: 'rasa',
      title: 'Rasa',
      subtitle: 'Climate-Adaptive Beauty Intelligence',
      status: 'Shipped (June 2026)',
      statusColor: 'bg-mauve text-cream border-mauve',
      desc: 'A personalized beauty recommendations platform that adapts dynamically to environmental and local weather conditions.',
      details: [
        'Real-time weather integration using OpenWeatherMap API',
        'Personalized Gemini AI skincare recommendation engines',
        'Dynamic styling and microclimate adaptivity modules'
      ],
      github: 'https://github.com/ShrutiMundhe/Rasa-Beauty',
      tags: ['React', 'Gemini AI', 'OpenWeatherMap', 'Tailwind'],
      techStack: {
        frontend: ['React 19', 'React Router DOM v7', 'Vanilla CSS', 'Leaflet/React Leaflet', 'Axios'],
        backend: ['Node.js', 'Express 5', 'Mongoose (MongoDB)'],
        coreIntegrations: ['Google Gemini AI SDK (@google/genai)', 'Razorpay SDK', 'Nodemailer'],
        securityAndUtilities: ['Helmet', 'express-rate-limit', 'CORS', 'express-validator', 'JWT', 'bcryptjs', 'dotenv', 'nodemon']
      }
    }
  ];

  const experiences = [
    {
      role: 'Software Developer Intern',
      company: 'XtrazCon Pvt Ltd',
      duration: 'Present',
      description: 'Developing high-performance client applications and internal dashboards across multiple project cycles.',
      bullets: [
        'Collaborated in Agile sprints to iterate and release critical feature pipelines',
        'Engineered responsive web applications using MERN stack (MongoDB, Express, React, Node.js)',
        'Built cross-platform mobile modules utilizing React Native for internal tooling and client access'
      ]
    }
  ];

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Layers className="w-5 h-5 text-mauve" />,
      items: ['React', 'React Native', 'Redux', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3', 'JavaScript (ES6+)']
    },
    {
      title: 'Backend',
      icon: <Terminal className="w-5 h-5 text-mauve" />,
      items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'JWT Authentication', 'MVC Architecture']
    },
    {
      title: 'AI / Integrations',
      icon: <Cpu className="w-5 h-5 text-mauve" />,
      items: ['Gemini AI API', 'Claude (Anthropic) API', 'RAG Implementations', 'OpenWeatherMap API', 'Third-party Gateways']
    },
    {
      title: 'Databases',
      icon: <Database className="w-5 h-5 text-mauve" />,
      items: ['MongoDB', 'Mongoose ODM', 'PostgreSQL', 'Redis (Caching)', 'Firebase']
    }
  ];

  const softSkills = [
    {
      title: 'Agile Collaboration',
      desc: 'Experience in sprint planning, Git-based code reviews, and cross-functional team delivery cycles.',
      icon: <Users className="w-6 h-6 text-mauve" />
    },
    {
      title: 'Problem Solving',
      desc: 'Proven ability to engineer scalable solutions and optimize API performance.',
      icon: <Lightbulb className="w-6 h-6 text-mauve" />
    },
    {
      title: 'Strategic Communication',
      desc: 'Ability to translate complex technical requirements into user-friendly features.',
      icon: <MessageSquare className="w-6 h-6 text-mauve" />
    },
    {
      title: 'Adaptability',
      desc: 'Capacity to learn and integrate new AI tools and APIs quickly.',
      icon: <Zap className="w-6 h-6 text-mauve" />
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream text-navy selection:bg-navy selection:text-cream flex flex-col font-sans">
      {/* Editorial Grid Background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#181D45_1px,transparent_1px),linear-gradient(to_bottom,#181D45_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 ${
        scrolled 
          ? 'bg-cream/92 backdrop-blur-md border-b border-line shadow-sm py-3.5' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">
          <a href="#" className="w-[38px] h-[38px] rounded-full border border-gold-line flex items-center justify-center font-serif italic text-sm text-gold select-none font-medium">
            SM
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-wider uppercase">
            <a href="#experience" className="text-secondary hover:text-navy transition-colors">Experience</a>
            <a href="#projects" className="text-secondary hover:text-navy transition-colors">Work</a>
            <a href="#skills" className="text-secondary hover:text-navy transition-colors">Skill Sets</a>
            <a href="#insights" className="text-secondary hover:text-navy transition-colors">Insights</a>
            <a href="#publications" className="text-secondary hover:text-navy transition-colors">Publications</a>
            <a href="#contact" className="text-secondary hover:text-navy transition-colors">Contact Me</a>
          </div>

          <button 
            className="md:hidden border border-line rounded px-3 py-1.5 font-mono text-[11px] text-navy cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 top-[70px] bg-surface text-navy border-b border-line z-40 p-8 flex flex-col space-y-4 font-mono text-[11px] tracking-wider uppercase md:hidden shadow-lg"
        >
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold py-1">Experience</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold py-1">Work</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold py-1">Skill Sets</a>
          <a href="#insights" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold py-1">Insights</a>
          <a href="#publications" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold py-1">Publications</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold py-1">Contact Me</a>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 lg:px-16 py-12 md:py-24 space-y-24 md:space-y-36">
        
        {/* HERO SECTION */}
        <motion.section 
          id="hero"
          initial="initial"
          animate="animate"
          variants={stagger}
          className="border-b border-navy/15 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">

            <motion.span 
              variants={fadeInUp}
              className="font-mono text-[11px] tracking-widest text-faint uppercase block"
            >
              Full-Stack Developer · India
            </motion.span>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-navy font-medium"
            >
              Shruti <span className="italic font-normal text-gold">Mundhe</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-2xl text-secondary font-light leading-relaxed max-w-3xl"
            >
              Building considered, production-grade software — from MongoDB schema to the interface people actually touch.
            </motion.p>

            <motion.div variants={fadeInUp} className="w-[44px] h-[1px] bg-gold-line mx-auto lg:mx-0 my-6" />

            <motion.div variants={fadeInUp} className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start font-mono text-[11px] tracking-wider uppercase">
              <a 
                href="#projects" 
                className="bg-navy hover:bg-gold border border-navy hover:border-gold text-cream px-8 py-3.5 transition-all rounded block hover:shadow-md cursor-pointer"
              >
                View the Work
              </a>
              <a 
                href="#contact" 
                className="border-2 border-line text-navy hover:border-navy px-8 py-3.5 transition-all rounded block cursor-pointer bg-transparent"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-navy/15 lg:pl-8 pt-8 lg:pt-0 space-y-6 text-sm text-navy/80">
            <div>
              <h4 className="font-serif text-navy font-bold text-lg mb-1">Based In</h4>
              <p>India — Open to Remote Work</p>
            </div>
            <div>
              <h4 className="font-serif text-navy font-bold text-lg mb-1">Focus Areas</h4>
              <p>MERN Development, SaaS Architecture, RAG, Generative AI Integration</p>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/shrutimundhe" target="_blank" rel="noopener noreferrer" className="p-2 border border-navy/20 hover:border-navy text-navy hover:bg-navy/5 rounded-full transition-all">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-navy/20 hover:border-navy text-navy hover:bg-navy/5 rounded-full transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="mailto:shrutimundhe22@gmail.com" className="p-2 border border-navy/20 hover:border-navy text-navy hover:bg-navy/5 rounded-full transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.section>
        <section id="experience" className="space-y-12 border-t border-navy/15 pt-16 max-w-3xl mx-auto w-full">
          <SectionHeader num="I" title="Experience" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4 border-l-2 border-navy pl-6 md:pl-8 relative"
              >
                <div className="absolute w-3.5 h-3.5 bg-navy rounded-full -left-[8px] top-1.5" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-navy">{exp.role}</h3>
                    <p className="text-sm font-semibold tracking-wider uppercase text-mauve">{exp.company}</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 bg-navy/5 border border-navy/10 text-navy w-fit rounded-full">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-sm text-navy/90 font-light leading-relaxed">{exp.description}</p>
                <ul className="space-y-2 pt-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-navy/80 flex items-start gap-2 leading-relaxed">
                      <span className="text-mauve font-semibold mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-12 border-t border-navy/15 pt-16">
          <SectionHeader num="II" title="Selected Work" />

          {/* 3 Project Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col justify-between p-8 border-2 border-navy bg-surface hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(24,29,69,0.1)] transition-all duration-300 rounded-lg min-h-[460px] relative overflow-hidden"
              >
                {/* Visual subtle card pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-25 group-hover:opacity-50 transition-opacity duration-300">
                  <span className="font-serif text-8xl font-black italic select-none text-navy">0{idx + 1}</span>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="space-y-1 border-b border-navy/20 pb-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs uppercase tracking-wider text-mauve font-bold block">{project.subtitle}</span>
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 border rounded-full ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold tracking-tight text-navy">{project.title}</h3>
                  </div>
                  
                  <p className="text-sm text-navy/80 font-light leading-relaxed">{project.desc}</p>
                  
                  <ul className="space-y-2.5 pt-2">
                    {project.details.map((detail, index) => (
                      <li key={index} className="text-xs text-navy/70 flex items-start gap-2 leading-relaxed">
                        <span className="text-mauve font-bold mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 relative z-10">
                  {/* Tag List */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-navy/5 text-navy border border-navy/10 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-[11px] tracking-wider uppercase">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center border-2 border-navy text-navy py-2.5 transition-all rounded block hover:bg-navy hover:text-cream"
                    >
                      Repository
                    </a>
                    <button 
                      onClick={() => setActiveDeepDive(activeDeepDive === project.id ? null : project.id)}
                      className={`text-center py-2.5 transition-all rounded block cursor-pointer border-2 ${
                        activeDeepDive === project.id 
                          ? 'bg-gold text-cream border-gold' 
                          : 'bg-navy hover:bg-gold text-cream hover:shadow-md border-navy hover:border-gold'
                      }`}
                    >
                      {activeDeepDive === project.id ? 'Close' : 'Deep-Dive'}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Deep-Dive Area */}
          <AnimatePresence mode="wait">
            {activeDeepDive && (
              <motion.div
                key={activeDeepDive}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full border-2 border-navy bg-surface p-8 rounded-lg shadow-md relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-navy/20 pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-mauve">Technical Deep-Dive</span>
                    <h3 className="font-serif text-3xl font-bold text-navy mt-1">
                      {projects.find(p => p.id === activeDeepDive)?.title} Stack Details
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveDeepDive(null)}
                    className="text-xs uppercase tracking-widest font-bold border border-navy/20 hover:border-navy text-navy px-4 py-2 rounded transition-all cursor-pointer"
                  >
                    Close Panel
                  </button>
                </div>
                <TechStack techStack={projects.find(p => p.id === activeDeepDive)?.techStack} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="space-y-12 border-t border-navy/15 pt-16">
          <SectionHeader num="III" title="Skill Sets" />

          {/* Clean Grid Layout for Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 border border-navy/20 hover:border-navy bg-surface hover:shadow-[0_8px_16px_rgba(24,29,69,0.05)] rounded-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 border-b border-navy/10 pb-4 mb-4">
                  <div className="p-2 bg-navy/5 rounded text-mauve">
                    {category.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy">{category.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {category.items.map((item) => (
                    <li key={item} className="text-xs text-navy/80 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-mauve rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SOFT SKILLS SECTION */}
        <section id="soft-skills" className="space-y-12 border-t border-navy/15 pt-16">
          <SectionHeader num="III-B" title="Professional Practices" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, idx) => (
              <motion.div 
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 border border-navy/10 hover:border-navy bg-surface hover:shadow-[0_8px_16px_rgba(24,29,69,0.05)] rounded-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-navy/5 rounded">
                      {skill.icon}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy leading-tight">{skill.title}</h3>
                  </div>
                  <p className="text-xs text-navy/80 leading-relaxed font-light">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INSIGHTS & ARTICLES SECTION */}
        <section id="insights" className="space-y-12 border-t border-navy/15 pt-16">
          <SectionHeader num="IV" title="Insights & Articles" />
          <div className="text-center -mt-8 mb-6">
            <a 
              href="https://medium.com/@shrutimundhe22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-gold hover:text-navy transition-colors font-bold inline-flex items-center gap-1 font-mono"
            >
              View Medium Profile <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {loadingArticles ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-8 h-8 border-4 border-mauve border-t-transparent rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-wider text-mauve font-bold">Fetching latest articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, idx) => (
                <motion.article 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group flex flex-col justify-between p-8 border-2 border-navy bg-surface hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(24,29,69,0.1)] transition-all duration-300 rounded-lg min-h-[320px] relative overflow-hidden"
                >
                  <div className="space-y-4 relative z-10">
                    <div className="border-b border-navy/10 pb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-mauve">
                        {article.pubDate}
                      </span>
                      <h3 className="font-serif text-xl font-bold tracking-tight text-navy mt-1 group-hover:text-blue transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                    <p className="text-xs text-navy/80 font-light leading-relaxed line-clamp-4">
                      {article.snippet}
                    </p>
                  </div>

                  <div className="pt-6 relative z-10">
                    <a 
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-navy hover:bg-gold border border-navy hover:border-gold text-cream py-2.5 font-mono text-[11px] tracking-wider uppercase hover:shadow-md transition-all rounded block"
                    >
                      Read on Medium
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* RESEARCH & PUBLICATIONS SECTION */}
        <section id="publications" className="space-y-12 border-t border-navy/15 pt-16">
          <SectionHeader num="V" title="Research & Publications" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 border-2 border-navy bg-surface rounded-lg shadow-sm hover:shadow-[0_12px_24px_rgba(24,29,69,0.08)] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <FileText className="w-24 h-24 text-navy" />
            </div>

            <div className="space-y-6 relative z-10 max-w-4xl">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-navy/5 text-navy border border-navy/10 rounded">
                  IJIRT Journal — April 2026
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-navy mt-4 leading-tight">
                  Legalreach: A Multi-Tier AI-Augmented Platform for Democratizing Legal Consultation Access in India
                </h3>
                <p className="text-xs text-mauve font-semibold uppercase tracking-wider mt-2">
                  Published in the International Journal of Innovative Research in Technology (IJIRT), Volume 12, Issue 11
                </p>
              </div>

              <div className="space-y-2 border-t border-navy/10 pt-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-blue">Abstract Summary</h4>
                <p className="text-sm text-navy/90 font-light leading-relaxed">
                  The paper presents Legal Reach, a multi-tier web platform unifying RAG-based legal guidance, freemium-gated chat, and WebRTC video consultation.
                </p>
              </div>

              <div className="pt-4">
                <a 
                  href="https://github.com/ShrutiMundhe/Shruti-Portfolio/blob/main/IJIRT196404_PAPER%20(1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-navy hover:bg-gold border-2 border-navy hover:border-gold text-cream px-8 py-3.5 font-mono text-[11px] tracking-wider uppercase hover:shadow-md transition-all rounded"
                >
                  View Publication
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTACT / CONTACT ME */}
        <section id="contact" className="border-t border-navy/15 pt-16 pb-8 space-y-16 max-w-3xl mx-auto w-full">
          <SectionHeader num="VI" title="Contact Me" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center">
            <div className="md:col-span-12 flex flex-col justify-center space-y-6">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=shrutimundhe22@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-2 border-navy p-6 hover:bg-navy hover:text-cream transition-all duration-300 rounded"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider block opacity-75">Send Email</span>
                  <span className="text-base font-semibold">shrutimundhe22@gmail.com</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/shrutimundhe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-navy/20 hover:border-navy p-4 text-xs font-semibold uppercase tracking-wider hover:bg-navy/5 text-navy transition-all rounded"
                >
                  <GithubIcon className="w-4 h-4 text-mauve" />
                  GitHub Profile
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-navy/20 hover:border-navy p-4 text-xs font-semibold uppercase tracking-wider hover:bg-navy/5 text-navy transition-all rounded"
                >
                  <LinkedinIcon className="w-4 h-4 text-mauve" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer (Deep Contrast: Dark Navy #181D45) */}
      <footer className="bg-navy text-cream border-t border-[#252c64] px-6 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-cream/70 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Shruti Mundhe. All rights reserved.
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#experience" className="hover:text-mauve">Experience</a>
            <a href="#projects" className="hover:text-mauve">Work</a>
            <a href="#skills" className="hover:text-mauve">Skill Sets</a>
            <a href="#insights" className="hover:text-mauve">Insights</a>
            <a href="#publications" className="hover:text-mauve">Publications</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

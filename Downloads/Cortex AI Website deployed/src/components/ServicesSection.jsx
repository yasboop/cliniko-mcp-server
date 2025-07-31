import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  Workflow, 
  Mic, 
  Share2,
  PenTool,
  BarChart3,
  Users,
  Zap,
  Cpu,
  ChevronRight,
  TrendingUp,
  Target,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Sales AI Agents',
    description: 'AI-powered sales representatives that qualify leads, schedule meetings, and close deals 24/7. Increase your sales pipeline by 300%.',
    results: 'Average: +300% qualified leads',
    bgClass: 'from-green-500/10 to-emerald-500/5',
    link: '/services/sales-ai-agents'
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: 'Marketing AI Agents',
    description: 'Intelligent marketing assistants that create campaigns, manage social media, and optimize ad spend for maximum ROI.',
    results: 'Average: +150% campaign ROI',
    bgClass: 'from-purple-500/10 to-violet-500/5',
    link: '/services/marketing-ai-agents'
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Customer Service AI',
    description: 'Advanced chatbots and support agents that resolve 90% of customer inquiries instantly, boosting satisfaction.',
    results: 'Average: 90% automated resolution',
    bgClass: 'from-blue-500/10 to-cyan-500/5',
    link: '/services/customer-service-ai'
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: 'Voice AI Agents',
    description: 'Human-like voice assistants for calls, appointments, and customer interactions. Never miss a business opportunity.',
    results: 'Average: 80% appointment show rate',
    bgClass: 'from-indigo-500/10 to-blue-500/5',
    link: '/services/voice-ai-agents'
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Content Creation AI',
    description: 'AI content generators that produce blog posts, social media, ads, and marketing materials at scale.',
    results: 'Average: 10x content output',
    bgClass: 'from-orange-500/10 to-red-500/5',
    link: '/services/content-creation-ai'
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'Lead Generation AI',
    description: 'Automated lead generation systems that find, qualify, and nurture prospects across multiple channels.',
    results: 'Average: +500% lead volume',
    bgClass: 'from-pink-500/10 to-purple-500/5',
    link: '/services/lead-generation-ai'
  }
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="pt-12 pb-20 -mt-10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 w-[1200px] h-[1200px]">
        <div className="absolute inset-0 border-[1px] border-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-[15%] border-[1px] border-primary/15 rounded-full animate-spin-slow [animation-direction:reverse]"></div>
        <div className="absolute inset-[30%] border-[1px] border-primary/10 rounded-full animate-spin-slow"></div>
      </div>
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_50%)] opacity-70"></div>
      <div className="cyber-grid absolute inset-0 opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* AI Agency badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-5 py-2 shadow-lg shadow-primary/5">
            <Zap size={16} className="mr-2 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide">AI AGENCY SOLUTIONS</span>
          </div>
        </motion.div>
        
        {/* Updated heading for AI agency positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
            Our&nbsp;<span className="gradient-text font-extrabold">AI Agent Solutions</span>
          </h2>
        </motion.div>
        
        {/* Animated underline */}
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          whileInView={{ width: "120px", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-blue-600/50 via-primary to-blue-600/50 rounded-full mx-auto mb-10"
        />
        
        {/* AI Agency focused description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-16 font-light text-center"
        >
          Our specialized AI agents work around the clock to grow your business. From generating leads to closing sales, 
          our intelligent systems deliver results while you sleep.
        </motion.p>
        
        {/* Updated stats for AI agency */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 mb-20 perspective-1000"
        >
          {[
            { value: '300%', label: 'More Qualified Leads', icon: <TrendingUp size={24} className="text-emerald-400" /> },
            { value: '24/7', label: 'AI Agent Uptime', icon: <Zap size={24} className="text-blue-400" /> },
            { value: '10x', label: 'Faster Deployment', icon: <Target size={24} className="text-purple-400" /> }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ translateY: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative group w-full sm:w-auto sm:flex-1 max-w-[240px]"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-xl blur-md group-hover:opacity-100 opacity-70 transition-opacity duration-300"></div>
              
              {/* Card content */}
              <div className="relative bg-slate-900/90 border border-white/10 rounded-xl px-6 py-8 backdrop-blur-sm shadow-xl overflow-hidden h-full">
                {/* Background decoration */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/5 blur-md"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2 gradient-text">{stat.value}</div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Services Grid */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <Link to={service.link} className="block h-full">
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.bgClass} rounded-2xl blur-sm group-hover:opacity-100 opacity-70 transition-opacity duration-300`}></div>
                
                {/* Card content */}
                <div className="relative glass-effect backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full shadow-xl overflow-hidden group-hover:border-primary/30 transition-all duration-300">
                  {/* Background decoration */}
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-primary/5 blur-lg group-hover:scale-110 transition-transform duration-500"></div>
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-primary/40"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      {service.icon}
                      <ChevronRight className="w-5 h-5 text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Results badge */}
                    <div className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-sm font-medium text-primary">
                      <DollarSign size={14} className="mr-1" />
                      {service.results}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-20"
        >
          <div className="glass-effect rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Deploy Your <span className="gradient-text">AI Workforce</span>?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Schedule a strategy session and discover which AI agents can transform your business in the next 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg neon-glow hover-glow transition-all duration-300"
                >
                  Book Strategy Session
                </motion.button>
              </Link>
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-primary/30 hover:bg-primary/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

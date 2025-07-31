import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Instagram,
  Mail, 
  Phone, 
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="relative pt-16 pb-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-black/80"></div>
      <div className="cyber-grid absolute inset-0 opacity-10 -z-10"></div>
      <div className="blob top-0 left-[10%] opacity-10 -z-10"></div>
      <div className="blob bottom-0 right-[10%] opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <motion.div variants={itemVariants} className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold flex items-center gap-2">
                <Globe className="text-primary w-6 h-6" />
                <span className="gradient-text">Cortex</span>
                <span className="text-white">AI</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Empowering businesses with cutting-edge AI solutions to transform operations and drive innovation.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/company/cortex-ai-sound/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 transition-colors border border-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://www.instagram.com/cortexai_org/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 transition-colors border border-white/10"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-6 gradient-text">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Services', 'About Us', 'Pricing', 'Contact'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item === 'Home' ? '/' : item === 'About Us' ? '/about' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-6 gradient-text">Services</h3>
            <ul className="space-y-3">
              {[
                'Sales AI Agents',
                'Marketing AI Agents',
                'Customer Service AI',
                'Voice AI Agents',
                'Content Creation AI',
                'Lead Generation AI'
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to="/services" 
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-6 gradient-text">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <Phone size={20} className="text-primary mr-3 flex-shrink-0 group-hover:text-primary/80 transition-colors" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">+91 8861817032</span>
              </li>
              <li className="flex items-center group">
                <Mail size={20} className="text-primary mr-3 flex-shrink-0 group-hover:text-primary/80 transition-colors" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">yash@cortexai.org.in</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} CortexAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Bot, Cpu, Brain, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ParticlesBackground from '@/components/ParticlesBackground';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const features = [
    { icon: <Bot className="w-6 h-6" />, text: "Sales AI Agents" },
    { icon: <Brain className="w-6 h-6" />, text: "Marketing AI" },
    { icon: <MessageSquare className="w-6 h-6" />, text: "Lead Generation" },
    { icon: <Cpu className="w-6 h-6" />, text: "Voice Agents" },
  ];

  return (
    <section className="relative min-h-screen pt-36 pb-24 overflow-hidden cyber-grid">
      <ParticlesBackground />
      
      {/* Background Elements */}
      <div className="hero-glow left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="blob top-20 right-[10%] opacity-50" />
      <div className="blob bottom-20 left-[10%] opacity-30" />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <Sparkles size={16} className="mr-2" /> Next-Generation AI Solutions
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-glow leading-[1.1]"
          >
            Deploy <span className="gradient-text font-extrabold">AI Agents</span>
            <br className="hidden sm:block" />
            <motion.span 
              className="block sm:inline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {" That Work While You Sleep"}
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl leading-relaxed font-light"
          >
            Our specialized AI agents handle sales, marketing, customer service, and lead generation 24/7.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <Link key={index} to="/services">
              <motion.div
                className="group relative flex items-center gap-3 text-primary bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 px-6 py-4 rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/50"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.15,
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -4,
                  boxShadow: "0 15px 30px rgba(124, 58, 237, 0.3)",
                  backgroundColor: "rgba(124, 58, 237, 0.1)",
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15 
                  }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-800 ease-out" />
                
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/40"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                
                <div className="relative z-10 flex items-center gap-3">
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.2,
                      transition: { 
                        rotate: { duration: 0.6 },
                        scale: { duration: 0.3 }
                      }
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <span className="text-sm md:text-base font-semibold tracking-wide transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              </motion.div>
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-violet-600 opacity-100"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-blue-500/80 to-violet-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-[2px] bg-gradient-to-r from-primary via-blue-500 to-violet-600 rounded-[10px] opacity-100"></div>
              
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out"></div>
              
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="relative bg-primary hover:bg-transparent text-white px-10 py-8 text-lg font-bold rounded-xl tracking-wide border-0 w-full group-hover:text-white transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your AI Journey 
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-violet-600/20 rounded-xl"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700"></div>
              
              <Link to="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="relative border-primary/30 hover:border-primary/70 bg-transparent hover:bg-primary/10 px-10 py-8 text-lg font-semibold rounded-xl tracking-wide transition-all duration-300 w-full group-hover:text-primary group-hover:shadow-lg group-hover:shadow-primary/20"
                >
                  <span className="relative z-10">Explore Solutions</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;

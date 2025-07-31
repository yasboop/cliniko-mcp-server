import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="blob top-20 right-[20%] opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass-effect rounded-3xl overflow-hidden p-6 md:p-8 lg:p-10 border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            >
              Ready to Transform Your Business with <span className="gradient-text">AI</span>?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base text-gray-300 mb-6"
            >
              Join the AI revolution today and stay ahead of the competition with our cutting-edge solutions tailored to your business needs.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/pricing">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-6 py-5 neon-glow">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 px-6 py-5">
                  Schedule a Demo
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 blur-3xl"
          ></motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/10 to-primary/10 blur-3xl"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;

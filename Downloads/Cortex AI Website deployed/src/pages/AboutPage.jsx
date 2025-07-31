import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Lightbulb, 
  Target, 
  Shield, 
  Heart,
  CheckCircle
} from 'lucide-react';
import CtaSection from '@/components/CtaSection';

const AboutPage = () => {
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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <div className="hero-glow left-1/2 top-64 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About <span className="gradient-text">Cortex AI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg"
          >
            We're on a mission to transform businesses through the power of artificial intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our <span className="gradient-text">Story</span></h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded by a small collective of AI engineers and growth strategists, Cortex AI began as a boutique agency focused on one goal: turning advanced language-model research into revenue-generating products for everyday companies.
              </p>
              <p>
                Our first projects—sales-enablement chatbots and predictive lead-scoring models—helped clients cut response times by 70 % and double qualified pipeline. Word spread, and we steadily expanded our toolkit and talent bench.
              </p>
              <p>
                Today we operate as a tight, senior-only team spread across three time zones, partnering with select B2B and consumer brands. Every engagement is bespoke, hands-on, and measured against the business metrics that matter—revenue, margin, and customer experience.
              </p>
              <p>
                We remain deliberately small so we can move quickly, stay close to our clients, and build ethically-aligned AI that creates measurable value—never technology theatre.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-2xl blur-3xl opacity-30"></div>
            <div className="relative rounded-2xl overflow-hidden gradient-border w-full h-full">
              <img  
                alt="Cortex AI team" 
                className="w-full h-full object-cover"
               src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">Our <span className="gradient-text">Values</span></h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-12">
            These core principles guide everything we do at Cortex AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <Lightbulb className="h-10 w-10 text-primary" />, 
                title: "Innovation", 
                description: "We constantly push the boundaries of what's possible with AI technology." 
              },
              { 
                icon: <Shield className="h-10 w-10 text-primary" />, 
                title: "Integrity", 
                description: "We develop AI responsibly, with transparency and ethical considerations at the forefront." 
              },
              { 
                icon: <Target className="h-10 w-10 text-primary" />, 
                title: "Impact", 
                description: "We focus on delivering solutions that create measurable business value." 
              },
              { 
                icon: <Users className="h-10 w-10 text-primary" />, 
                title: "Collaboration", 
                description: "We work closely with our clients to ensure solutions meet their specific needs." 
              },
              { 
                icon: <Award className="h-10 w-10 text-primary" />, 
                title: "Excellence", 
                description: "We strive for the highest standards in everything we do." 
              },
              { 
                icon: <Heart className="h-10 w-10 text-primary" />, 
                title: "Empathy", 
                description: "We understand the human impact of AI and design solutions with people in mind." 
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose <span className="gradient-text">Cortex AI</span></h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We're committed to delivering exceptional AI solutions that drive real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Industry-leading AI expertise and research",
              "Customized solutions tailored to your specific business needs",
              "Transparent development process with regular updates",
              "Comprehensive support and maintenance",
              "Scalable solutions that grow with your business",
              "Ethical AI development with privacy and security by design",
              "Proven track record of successful implementations",
              "Continuous innovation and improvement"
            ].map((point, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex items-start"
              >
                <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <CtaSection />
    </div>
  );
};

export default AboutPage;

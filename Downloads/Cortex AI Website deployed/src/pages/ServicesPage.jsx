import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Shield, Cpu, Bot, Zap, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CtaSection from '@/components/CtaSection';

const services = [
  {
    icon: <Bot className="h-12 w-12 text-primary" />,
    title: 'Sales AI Agents',
    description: '24/7 AI sales reps that qualify leads, handle objections, and book meetings—boosting pipeline by 300%+.',
    features: [
      'Automatic lead qualification',
      'Real-time objection handling',
      'Calendar scheduling',
      'CRM integration',
      'Deal analytics dashboard'
    ]
  },
  {
    icon: <Brain className="h-12 w-12 text-primary" />,
    title: 'Marketing AI Agents',
    description: 'AI-driven campaign optimization that increases marketing ROI by 150%—your always-on growth hacker.',
    features: [
      'Audience segmentation',
      'Predictive spend allocation',
      'Ad creative generation',
      'A/B testing automation',
      'Cross-channel reporting'
    ]
  },
  {
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: 'Lead Generation AI',
    description: 'Predictive lead sourcing & outreach delivering up to 500% more qualified leads every month.',
    features: [
      'Ideal-customer persona mining',
      'Contact enrichment',
      'Personalized multi-channel outreach',
      'Engagement scoring',
      'Pipeline forecasting'
    ]
  },
  {
    icon: <Cpu className="h-12 w-12 text-primary" />,
    title: 'Voice AI Agents',
    description: 'Human-like phone agents that achieve 80% appointment show rates and reduce no-shows.',
    features: [
      'Natural-sounding speech synthesis',
      'Real-time call routing',
      'Calendar & CRM sync',
      'Multi-language support',
      'Compliance & call recording'
    ]
  },
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: 'Customer Service AI',
    description: 'Conversational agents that resolve 90% of tickets automatically, slashing response times.',
    features: [
      '24/7 omni-channel support',
      'Sentiment detection',
      'Ticket triage & escalation',
      'Knowledge-base generation',
      'CSAT analytics'
    ]
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: 'Content Creation AI',
    description: 'Generate on-brand content 10x faster—from blogs to social posts—with consistent voice.',
    features: [
      'Long-form article drafts',
      'SEO keyword optimization',
      'Social & email copy',
      'Brand tone fine-tuning',
      'Plagiarism & quality checks'
    ]
  }
];

const ServicesPage = () => {
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
            Our <span className="gradient-text">AI Agent Solutions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg"
          >
            Discover our comprehensive range of AI solutions designed to transform your business operations and drive innovation.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="service-card flex flex-col h-full"
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              
              <div className="mt-auto">
                <h4 className="text-sm font-medium text-primary mb-3">KEY FEATURES</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <Zap size={14} className="text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">Our <span className="gradient-text">Process</span></h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-12">
            We follow a structured approach to deliver AI solutions that meet your specific business needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                icon: <Headphones className="h-10 w-10 text-primary" />, 
                title: "Discovery", 
                description: "We start by understanding your business needs and objectives." 
              },
              { 
                icon: <Brain className="h-10 w-10 text-primary" />, 
                title: "Design", 
                description: "We design a custom AI solution tailored to your specific requirements." 
              },
              { 
                icon: <Cpu className="h-10 w-10 text-primary" />, 
                title: "Development", 
                description: "Our team develops and tests the solution to ensure optimal performance." 
              },
              { 
                icon: <Zap className="h-10 w-10 text-primary" />, 
                title: "Deployment", 
                description: "We deploy the solution and provide ongoing support and optimization." 
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl relative"
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <CtaSection />
    </div>
  );
};

export default ServicesPage;

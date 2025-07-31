import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Send,
  MessageSquare,
  Calendar,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const { toast } = useToast();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing again
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        'service_0tfyaeo', // Your EmailJS service ID
        'template_puefj0j', // Your EmailJS template ID
        formRef.current,
        'v78a1fu97I68L1pcg' // Your EmailJS public key
      );
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        service: 'general'
      });
    } catch (err) {
      console.error('Form submission error:', err);
      
      // Show error message
      setError(err.message || 'There was a problem sending your message. Please try again.');
      
      toast({
        title: "Error",
        description: err.message || 'There was a problem sending your message. Please try again.',
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Us",
      details: "yash@cortexai.org.in",
      description: "For general inquiries and information"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Us",
      details: "+91 8861817032",
      description: "Monday to Friday, 9am to 6pm IST"
    }
  ];

  const otherWays = [
    <div className="flex items-start">
      <MessageSquare className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium">Live Chat</h4>
        <p className="text-sm text-gray-400">Chat with our AI specialists in real-time</p>
      </div>
    </div>,
    <div className="flex items-start">
      <Calendar className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium">Schedule a Demo</h4>
        <p className="text-sm text-gray-400">Book a personalized demonstration of our AI solutions</p>
      </div>
    </div>,
    <div className="flex items-start">
      <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium">Support Hours</h4>
        <p className="text-sm text-gray-400">Monday to Friday: 9am - 6pm EST</p>
        <p className="text-sm text-gray-400">Saturday: 10am - 2pm EST</p>
      </div>
    </div>
  ];

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
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg"
          >
            Have questions about our AI solutions? We're here to help. Reach out to our team.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a <span className="gradient-text">Message</span></h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-transparent text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-transparent text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-transparent text-white"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-transparent text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  Service of Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass-effect border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-transparent text-white"
                >
                  <option value="general" className="bg-gray-900">General Inquiry</option>
                  <option value="sales-ai" className="bg-gray-900">Sales AI Agents</option>
                  <option value="marketing-ai" className="bg-gray-900">Marketing AI Agents</option>
                  <option value="customer-service-ai" className="bg-gray-900">Customer Service AI</option>
                  <option value="voice-ai" className="bg-gray-900">Voice AI Agents</option>
                  <option value="content-creation-ai" className="bg-gray-900">Content Creation AI</option>
                  <option value="lead-generation-ai" className="bg-gray-900">Lead Generation AI</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg glass-effect border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-transparent text-white"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message <Send size={16} className="ml-2" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold mb-6">Contact <span className="gradient-text">Information</span></h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    className="flex items-start gap-5"
                  >
                    <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-primary text-md">{item.details}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">Other Ways to Connect</h3>
              
              <div className="space-y-4">
                {otherWays.map((item, index) => (
                  <div key={index} className="flex items-start">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

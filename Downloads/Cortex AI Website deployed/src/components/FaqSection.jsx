
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What is Cortex AI and how can it help my business?",
    answer: "Cortex AI is a premium AI solutions provider that offers a range of services including machine learning, natural language processing, computer vision, and predictive analytics. Our AI solutions can help automate processes, gain insights from data, enhance customer experiences, and drive innovation in your business."
  },
  {
    question: "Do I need technical expertise to implement your AI solutions?",
    answer: "No, you don't need technical expertise. Our team handles the technical implementation while working closely with you to understand your business needs. We provide user-friendly interfaces and comprehensive training to ensure your team can effectively use our AI solutions."
  },
  {
    question: "How long does it take to implement an AI solution?",
    answer: "Implementation timelines vary depending on the complexity of the solution and your specific requirements. Simple implementations can be completed in a few weeks, while more complex enterprise solutions may take 2-3 months. We provide detailed timelines during our initial consultation."
  },
  {
    question: "How do you ensure the security and privacy of our data?",
    answer: "We implement enterprise-grade security measures including data encryption, secure access controls, and regular security audits. We comply with industry standards and regulations such as GDPR and CCPA. All data handling processes are transparent and documented in our service agreements."
  },
  {
    question: "Can your AI solutions integrate with our existing systems?",
    answer: "Yes, our AI solutions are designed to integrate seamlessly with your existing systems and workflows. We support integration with major enterprise software, databases, and custom applications through secure APIs and connectors."
  },
  {
    question: "What kind of support do you provide after implementation?",
    answer: "We provide comprehensive post-implementation support including 24/7 technical assistance, regular maintenance updates, performance monitoring, and continuous optimization. Our support packages can be tailored to your specific needs and service level requirements."
  }
];

const FaqSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="blob bottom-20 right-[20%] opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Find answers to common questions about our AI solutions and services.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto glass-effect rounded-xl p-6"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800">
                <AccordionTrigger className="text-left font-medium py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles, Users, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Arvind Kumar Shukla',
    position: 'Managing Partner, Pinnacle Law Firm',
    content: 'The AI-powered legal assistant and lead generation system transformed our practice. We now capture and qualify leads 24/7, significantly increasing our client acquisition rate.',
    rating: 5,
    stats: {
      label: 'Lead Generation',
      value: '+400%',
      icon: <Users className="h-5 w-5 text-blue-400" />
    },
    image: '/images/clients/arvind-kumar-shukla.png',
    bgAccent: 'from-blue-600/20 to-indigo-600/10'
  },
  {
    name: 'Debasish Dutta',
    position: 'Co-Founder & Executive Director, Emmersive Technologies',
    content: 'The AI-powered lead generation system revolutionized our client acquisition process. We now have a consistent pipeline of qualified prospects coming in automatically.',
    rating: 5,
    stats: {
      label: 'Lead Quality',
      value: '+350%',
      icon: <Clock className="h-5 w-5 text-purple-400" />
    },
    image: '/images/clients/debasish-dutta.png',
    bgAccent: 'from-purple-600/20 to-fuchsia-600/10'
  }
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Dynamic background elements */}
      <div className="blob top-20 right-[10%] opacity-30 animate-pulse" style={{ animationDuration: '15s' }}></div>
      <div className="blob bottom-20 left-[30%] opacity-20 animate-pulse" style={{ animationDuration: '20s' }}></div>
      <div className="cyber-grid absolute inset-0 opacity-10"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 mb-6 border border-primary/20"
          >
            <Sparkles size={16} className="mr-2 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Real Client Results</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Success <span className="gradient-text">Stories</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            See how businesses are transforming their operations with our AI solutions
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 10, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`glass-card rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl 
                         relative overflow-hidden backdrop-blur-lg bg-gradient-radial ${testimonials[current].bgAccent}`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Abstract shapes in background */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-lg"></div>
              <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-md"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
                  <div className="md:w-1/3 flex flex-col items-center md:items-start">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20"
                           style={{ transform: 'translateZ(20px)' }}>
                        <img 
                          src={testimonials[current].image} 
                          alt={testimonials[current].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 bg-background rounded-full p-2 border border-primary/30 shadow-lg"
                           style={{ transform: 'translateZ(30px)' }}>
                        <Quote className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center md:text-left"
                         style={{ transform: 'translateZ(15px)' }}>
                      <h4 className="font-semibold text-white text-xl">{testimonials[current].name}</h4>
                      <p className="text-gray-400">{testimonials[current].position}</p>
                    </div>
                    
                    <div className="flex mt-4 justify-center md:justify-start"
                         style={{ transform: 'translateZ(25px)' }}>
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-md" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 flex flex-col">
                    <div className="relative pl-6 border-l-2 border-primary/30"
                         style={{ transform: 'translateZ(10px)' }}>
                      <p className="text-xl md:text-2xl mb-6 text-white leading-relaxed font-light italic">
                        "{testimonials[current].content}"
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-6 flex justify-center md:justify-end">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="stat-card bg-white/5 px-6 py-4 rounded-xl border border-primary/20 shadow-lg"
                        style={{ transform: 'translateZ(30px)' }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {testimonials[current].stats.icon}
                          <p className="text-sm text-gray-400">{testimonials[current].stats.label}</p>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold gradient-text">{testimonials[current].stats.value}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center items-center mt-12 gap-6">
            <Button 
              variant="glow"
              size="icon"
              onClick={prev}
              className="rounded-full border border-primary/20 hover:bg-primary/20 shadow-md shadow-primary/20 w-12 h-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrent(index);
                  }}
                  className={`relative h-3 rounded-full transition-all duration-500 overflow-hidden ${
                    index === current ? 'bg-primary/20 w-10' : 'bg-gray-600/40 w-3 hover:bg-gray-500/40'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                >
                  {index === current && (
                    <motion.div 
                      className="absolute inset-0 bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, repeat: autoplay ? Infinity : 0 }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <Button 
              variant="glow"
              size="icon"
              onClick={next}
              className="rounded-full border border-primary/20 hover:bg-primary/20 shadow-md shadow-primary/20 w-12 h-12"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

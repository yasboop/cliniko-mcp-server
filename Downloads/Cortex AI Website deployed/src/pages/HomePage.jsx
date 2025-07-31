
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import FaqSection from '@/components/FaqSection';

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;

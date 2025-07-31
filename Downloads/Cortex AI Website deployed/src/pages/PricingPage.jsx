import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Star, Sparkles, TrendingUp, DollarSign, Users, Bot, UserCheck, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import CtaSection from '@/components/CtaSection';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  // AI Agency focused pricing tiers
  const plans = [
    {
      name: 'AI Launch Pack',
      description: 'Consultation & basic feature implementation for teams taking their first step into AI automation',
      setupFee: 2500,
      monthlyPrice: 750,
      yearlyPrice: 7500, // 2 months free implicitly (10x monthly)
      maxAgents: 'Up to 2 AI Workflows',
      popular: true,
      features: [
        'Strategy workshop & roadmap',
        'Deploy up to 2 foundational AI workflows',
        'Basic CRM / email integration',
        'Performance dashboard & monthly report',
        'Email support (48 h response)'
      ],
      results: 'Typical ROI: 3–5× within 90 days',
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: 'Custom AI Solutions',
      description: 'Bespoke AI strategy, development & optimisation for high-growth or enterprise teams',
      setupFee: 'Custom',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      maxAgents: 'Unlimited',
      popular: false,
      features: [
        'Unlimited AI agents & channels',
        'Dedicated AI strategist & engineering pod',
        'Custom integrations & on-prem options',
        '24/7 priority support & SLA',
        'Performance-based bonus structures',
        'Quarterly business reviews'
      ],
      results: 'Outcome-based engagement aligned to your KPIs',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  // ROI Calculator section
  const roiMetrics = [
    { label: 'Avg. Lead Increase', value: '400%', icon: <Users className="w-5 h-5 text-emerald-500" /> },
    { label: 'Cost Per Lead Reduction', value: '75%', icon: <DollarSign className="w-5 h-5 text-blue-500" /> },
    { label: 'Response Time', value: '< 30 sec', icon: <Zap className="w-5 h-5 text-purple-500" /> },
    { label: 'Client Satisfaction', value: '94%', icon: <Star className="w-5 h-5 text-yellow-500" /> }
  ];

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
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-6"
          >
            <Zap size={16} className="mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">AI AGENCY PRICING</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Invest in <span className="gradient-text">AI Agents</span><br />
            That Pay for Themselves
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg"
          >
            Our AI agents typically generate 3-10x ROI within 90 days. Choose your investment level and watch your business transform.
          </motion.p>
        </div>

        {/* ROI Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {roiMetrics.map((metric, index) => (
            <div key={index} className="glass-effect rounded-xl p-6 text-center border border-white/10">
              <div className="flex justify-center mb-3">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Billing Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <Tabs 
            defaultValue="monthly" 
            className="inline-flex"
            onValueChange={setBillingCycle}
          >
            <TabsList className="glass-effect">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (2 Months Free)</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`glass-effect rounded-xl overflow-hidden relative border-2 ${
                plan.popular ? 'border-primary shadow-xl shadow-primary/20' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-bl-lg rounded-tr-lg">
                    🔥 MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-primary">{plan.maxAgents}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                {/* Setup Fee */}
                <div className="mb-4">
                  <div className="text-sm text-slate-300">Setup Investment</div>
                  <div className="text-lg font-semibold">
                    {typeof plan.setupFee === 'number' ? `$${plan.setupFee.toLocaleString()}` : plan.setupFee}
                  </div>
                </div>
                
                {/* Monthly Pricing */}
                <div className="mb-6">
                  <div className="text-sm text-slate-300">Then</div>
                  <span className="text-3xl font-bold">
                    {(() => {
                      const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                      if (typeof price === 'number') {
                        return `Starting at $${price.toLocaleString()}`;
                      }
                      return price; // e.g. 'Custom'
                    })()}
                  </span>
                  {typeof (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice) === 'number' && (
                    <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  )}
                </div>
                
                {/* Results Promise */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                  <div className="text-sm font-medium text-primary mb-1">Results Promise:</div>
                  <div className="text-sm text-gray-300">{plan.results}</div>
                </div>
                
                <Link to="/contact">
                  <Button className={`w-full mb-6 ${plan.popular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                    {plan.monthlyPrice === 'Custom' ? 'Schedule Discovery Call' : 'Book Strategy Call'}
                  </Button>
                </Link>
                
                {/* Features */}
                <div className="space-y-3">
                  <p className="font-medium text-sm text-gray-300 uppercase tracking-wide">What's Included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto mb-20 px-4"
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            Feature <span className="gradient-text">Comparison</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="py-4 px-4 text-left font-medium text-slate-300">Features</th>
                  <th className="py-4 px-4 text-center font-medium text-primary">AI Launch Pack</th>
                  <th className="py-4 px-4 text-center font-medium text-primary">Custom AI Solutions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { feature: "AI Agents & Workflows", basic: "Up to 2", premium: "Unlimited" },
                  { feature: "Dedicated AI Strategist", basic: "During setup", premium: "Ongoing dedicated support" },
                  { feature: "Response Time", basic: "48 hours", premium: "Priority (24/7)" },
                  { feature: "CRM Integration", basic: "Basic integration", premium: "Advanced & custom integrations" },
                  { feature: "Performance Analytics", basic: "Monthly reports", premium: "Real-time dashboard & insights" },
                  { feature: "Training & Onboarding", basic: "Basic", premium: "Comprehensive & team-wide" },
                  { feature: "Custom Development", basic: "Limited", premium: "Full custom solutions" },
                  { feature: "Quarterly Business Reviews", basic: "—", premium: "✓" },
                  { feature: "Performance-Based Bonuses", basic: "—", premium: "Optional" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-slate-300">{row.basic}</td>
                    <td className="py-4 px-4 text-center text-slate-300">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-6">
              Not seeing what you need? Our custom solutions can be tailored to any specific requirement.
            </p>
            <Link to="/contact">
              <Button className="bg-primary/20 hover:bg-primary/30 text-primary font-medium">
                Contact Us For Custom Requirements
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center my-20 py-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Your Path to <span className="gradient-text">AI-Powered Growth</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8 max-w-5xl mx-auto relative px-4">
            {/* Connecting Dashed Line */}
            <div className="absolute top-10 left-1/2 w-4/5 h-px -translate-x-1/2 bg-[repeating-linear-gradient(90deg,var(--tw-color-slate-700),var(--tw-color-slate-700)_6px,transparent_6px,transparent_12px)] hidden md:block"></div>

            {[
              {
                icon: <UserCheck className="w-8 h-8 text-primary" />,
                title: "1. Strategy Session",
                description: "We dive deep into your business goals to map out the perfect AI strategy and define success metrics."
              },
              {
                icon: <BrainCircuit className="w-8 h-8 text-primary" />,
                title: "2. AI Implementation",
                description: "Our expert team builds, trains, and integrates your custom AI agents seamlessly into your workflow."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-primary" />,
                title: "3. Launch & Optimise",
                description: "We deploy your AI workforce, monitor performance 24/7, and continuously optimise for peak ROI."
              }
            ].map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border-2 border-slate-700 mb-6">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h3>
          
          <div className="space-y-6">
            {[
              {
                q: "How quickly can AI agents be deployed?",
                a: "Most AI agents can be deployed within 7-14 days. We handle all the technical setup, training, and integration with your existing systems."
              },
              {
                q: "What if my team needs training?",
                a: "All plans include comprehensive training and onboarding. We ensure your team is comfortable managing and optimizing the AI agents."
              },
              {
                q: "Can I scale up or down my plan?",
                a: "Absolutely. You can upgrade or modify your AI agent setup at any time. We'll work with you to adjust based on your business needs."
              },
              {
                q: "What kind of ROI can I expect?",
                a: "Our clients typically see 300-1000% ROI within the first 90 days. Results vary by industry, but our guarantee ensures you'll see significant returns."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-effect rounded-lg p-6 border border-white/10">
                <h4 className="font-semibold text-lg mb-3 text-primary">{faq.q}</h4>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <CtaSection />
    </div>
  );
};

export default PricingPage;

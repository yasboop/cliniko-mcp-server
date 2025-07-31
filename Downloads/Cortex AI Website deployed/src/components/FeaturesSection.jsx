import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  ShieldCheck, 
  Puzzle, 
  UserCheck, 
  BarChart,
  BrainCircuit
} from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: 'Performance-Driven Results',
    description: 'We focus on delivering tangible outcomes. Our success is tied to yours, ensuring we are motivated to drive real growth.'
  },
  {
    icon: <UserCheck className="h-6 w-6 text-primary" />,
    title: 'Dedicated AI Strategist',
    description: 'You get a human expert to ensure your agents are perfectly tuned to your business goals from day one.'
  },
  {
    icon: <Puzzle className="h-6 w-6 text-primary" />,
    title: 'Seamless CRM Integration',
    description: 'Our agents connect directly to your existing tools like Salesforce and HubSpot in minutes, not months.'
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: 'Continuous Self-Improvement',
    description: 'Agents learn from every interaction, becoming more effective and valuable to your operations over time.'
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: 'Transparent Analytics',
    description: 'A real-time dashboard showing you exactly how your agents are performing and the value they\'re creating.'
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: 'Bank-Grade Security',
    description: 'Your data and operations are protected with enterprise-level security and compliance protocols.'
  }
];

const DashboardMockup = () => (
  <div className="relative w-full h-[380px] md:h-[480px] rounded-2xl bg-[#0f1729] border border-slate-700/30 p-3 md:p-6 shadow-xl overflow-hidden">
    {/* Subtle background grid */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiMxMDIwNDAiIGZpbGwtb3BhY2l0eT0iLjAyIiBmaWxsPSIjMTAyMDQwIi8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHoiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZT0iIzEwMjA0MCIgZmlsbC1vcGFjaXR5PSIuMDIiIGZpbGw9IiMxMDIwNDAiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiMxMDIwNDAiIGZpbGwtb3BhY2l0eT0iLjAyIiBmaWxsPSIjMTAyMDQwIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
    
    {/* Header with realistic UI elements */}
    <div className="relative z-10 flex items-center justify-between mb-4 md:mb-6">
      <div className="flex items-center">
        <div className="w-2 h-6 md:h-8 bg-indigo-500 rounded-sm mr-2 md:mr-3"></div>
        <div>
          <h3 className="font-semibold text-base md:text-lg text-white">Enterprise Analytics</h3>
          <div className="flex items-center text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
            <span className="hidden sm:inline">Live Data</span>
            <span className="sm:inline hidden mx-2">•</span>
            <span className="hidden sm:inline">Last updated:</span>
            <span className="sm:hidden">Live</span>
            <span className="ml-1">2 min ago</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded-md flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
          <span>Production</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        </div>
      </div>
    </div>
    
    {/* KPI blocks with realistic enterprise metrics */}
    <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
      {[
        { label: 'CONVERSATIONS', value: '12,487', change: '+12.4%', up: true },
        { label: 'CONVERSION RATE', value: '27.3%', change: '+3.8%', up: true },
        { label: 'AVG RESOLUTION TIME', value: '1m 42s', change: '-8.5%', up: true },
      ].map((kpi, i) => (
        <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-2 md:px-4 py-2 md:py-3">
          <div className="flex justify-between items-start">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1 leading-tight">{kpi.label}</div>
            <div className={`text-xs ${kpi.up ? 'text-emerald-500' : 'text-rose-500'} flex items-center`}>
              <span className="hidden sm:inline">{kpi.change}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="ml-0.5">
                <path d={kpi.up ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="text-lg md:text-xl font-semibold text-white">{kpi.value}</div>
        </div>
      ))}
    </div>
    
    {/* Realistic chart visualization */}
    <div className="relative z-10 bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm font-medium text-white">Performance Metrics</div>
          <div className="text-xs text-slate-400">30-day rolling average</div>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5"></div>
            <span className="text-xs text-slate-400">Conversations</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></div>
            <span className="text-xs text-slate-400">Conversions</span>
          </div>
        </div>
      </div>
      
      {/* Chart visualization */}
      <div className="relative h-32">
        {/* Chart grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0,1,2,3].map((i) => (
            <div key={i} className="w-full h-px bg-slate-700/30"></div>
          ))}
        </div>
        
        {/* Chart data - line 1 */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path 
            d="M0,80 C20,70 40,90 60,75 C80,60 100,80 120,65 C140,50 160,60 180,45 C200,30 220,50 240,40 C260,30 280,45 300,30" 
            fill="none" 
            stroke="rgb(99, 102, 241)" 
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        {/* Chart data - line 2 */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path 
            d="M0,100 C20,95 40,105 60,90 C80,80 100,95 120,85 C140,75 160,85 180,70 C200,60 220,75 240,65 C260,55 280,65 300,50" 
            fill="none" 
            stroke="rgb(16, 185, 129)" 
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        {/* Data points */}
        {[45, 60, 30, 75, 50, 65, 40].map((pos, i) => (
          <div 
            key={i} 
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${i * 16.6}%`,
              top: `${pos}%`
            }}
          ></div>
        ))}
      </div>
    </div>
    
    {/* Bottom metrics panel */}
    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      {[
        { label: 'ACTIVE AGENTS', value: '24', icon: 'users' },
        { label: 'RESPONSE TIME', value: '3.2s', icon: 'clock' },
        { label: 'SATISFACTION', value: '94%', icon: 'smile' },
        { label: 'EFFICIENCY', value: '87%', icon: 'zap' }
      ].map((metric, i) => (
        <div key={i} className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-2 md:p-3 flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-slate-700/50 flex items-center justify-center mr-2 md:mr-3">
            <svg width="14" height="14" md:width="16" md:height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-300">
              {metric.icon === 'users' && <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>}
              {metric.icon === 'users' && <circle cx="9" cy="7" r="4"></circle>}
              {metric.icon === 'users' && <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>}
              {metric.icon === 'users' && <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>}
              
              {metric.icon === 'clock' && <circle cx="12" cy="12" r="10"></circle>}
              {metric.icon === 'clock' && <polyline points="12 6 12 12 16 14"></polyline>}
              
              {metric.icon === 'smile' && <circle cx="12" cy="12" r="10"></circle>}
              {metric.icon === 'smile' && <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>}
              {metric.icon === 'smile' && <line x1="9" y1="9" x2="9.01" y2="9"></line>}
              {metric.icon === 'smile' && <line x1="15" y1="9" x2="15.01" y2="9"></line>}
              
              {metric.icon === 'zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>}
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-400 truncate">{metric.label}</div>
            <div className="text-sm font-medium text-white">{metric.value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative">
      <div className="blob top-20 right-[10%] opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The <span className="gradient-text">Cortex AI Advantage</span>
              </h2>
              <p className="text-gray-400 mb-8">
                We're more than a software provider; we're your strategic partner in AI automation. Our entire model is built to ensure your success.
              </p>
            </motion.div>

            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <div className="mr-3 md:mr-4 p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            {/* Divider - now positioned absolutely to the left of the dashboard */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 hidden lg:block h-64 w-0.5 bg-gradient-to-b from-primary/20 to-transparent" />
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

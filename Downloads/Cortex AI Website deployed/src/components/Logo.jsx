
import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-12 h-12"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Brain Pattern */}
        <motion.path
          d="M35 40 C35 30, 50 25, 65 40 C80 55, 65 70, 50 65 C35 60, 35 50, 35 40"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        {/* Neural Network Points */}
        {[
          { cx: 50, cy: 30 },
          { cx: 35, cy: 50 },
          { cx: 65, cy: 50 },
          { cx: 50, cy: 70 }
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.cx}
            cy={point.cy}
            r="3"
            fill="url(#logoGradient)"
            filter="url(#glow)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
        
        {/* Connecting Lines */}
        {[
          "M50 30 L35 50",
          "M50 30 L65 50",
          "M35 50 L50 70",
          "M65 50 L50 70"
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#logoGradient)"
            strokeWidth="1"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full filter blur-xl"></div>
    </motion.div>
  );
};

export default Logo;

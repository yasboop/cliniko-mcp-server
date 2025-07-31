import React from 'react';

const BrainAnimation = () => {
  return (
    <div className="brain-animation-container w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md aspect-square relative overflow-visible">
        {/* Brain container with gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg shadow-blue-500/50 flex items-center justify-center">
          {/* Brain texture and details */}
          <div className="w-[90%] h-[90%] rounded-full border-4 border-blue-300/40 bg-gradient-to-b from-blue-500/20 to-indigo-600/50 flex items-center justify-center">
            {/* Brain hemisphere divider */}
            <div className="absolute h-[85%] w-[2px] bg-blue-200/30" />
            
            {/* Left hemisphere neurons */}
            <div className="absolute left-[25%] top-[30%] w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50 animate-pulse" />
            <div className="absolute left-[35%] top-[40%] w-2 h-2 rounded-full bg-amber-300 shadow-lg shadow-amber-300/50 animate-pulse" style={{ animationDelay: '0.7s' }} />
            <div className="absolute left-[20%] top-[60%] w-4 h-4 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" style={{ animationDelay: '1.2s' }} />
            
            {/* Right hemisphere neurons */}
            <div className="absolute right-[25%] top-[35%] w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="absolute right-[30%] top-[50%] w-2 h-2 rounded-full bg-amber-300 shadow-lg shadow-amber-300/50 animate-pulse" style={{ animationDelay: '0.9s' }} />
            <div className="absolute right-[20%] top-[65%] w-4 h-4 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" style={{ animationDelay: '1.6s' }} />
            
            {/* Neural connections (lines) */}
            <div className="absolute w-[25%] h-[1px] bg-gradient-to-r from-amber-400 to-transparent left-[25%] top-[32%] rotate-12 animate-pulse" />
            <div className="absolute w-[15%] h-[1px] bg-gradient-to-r from-amber-400 to-transparent left-[25%] top-[40%] -rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute w-[20%] h-[1px] bg-gradient-to-r from-amber-400 to-transparent right-[25%] top-[38%] -rotate-12 animate-pulse" style={{ animationDelay: '1.1s' }} />
            <div className="absolute w-[18%] h-[1px] bg-gradient-to-r from-amber-400 to-transparent right-[25%] top-[55%] rotate-45 animate-pulse" style={{ animationDelay: '1.3s' }} />
          </div>
        </div>
        
        {/* Glowing aura around the brain */}
        <div className="absolute inset-[-10%] rounded-full bg-blue-500/10 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>
    </div>
  );
};

export default BrainAnimation; 
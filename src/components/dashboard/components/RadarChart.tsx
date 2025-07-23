import React from 'react';

export function RadarChart() {
  return (
    <div className="h-64 flex items-center justify-center">
      <svg width="250" height="250" viewBox="0 0 250 250" className="transform rotate-90">
        {/* Grid circles */}
        <circle cx="125" cy="125" r="20" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        <circle cx="125" cy="125" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        <circle cx="125" cy="125" r="60" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        <circle cx="125" cy="125" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        <circle cx="125" cy="125" r="100" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        
        {/* Grid lines */}
        <line x1="125" y1="25" x2="125" y2="225" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        <line x1="25" y1="125" x2="225" y2="125" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        <line x1="54" y1="54" x2="196" y2="196" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        <line x1="196" y1="54" x2="54" y2="196" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
        
        {/* Data polygon */}
        <polygon 
          points="125,55 175,95 165,165 85,165 75,95" 
          fill="hsl(var(--primary))" 
          fillOpacity="0.2" 
          stroke="hsl(var(--primary))" 
          strokeWidth="2"
        />
        
        {/* Data points */}
        <circle cx="125" cy="55" r="4" fill="hsl(var(--primary))" />
        <circle cx="175" cy="95" r="4" fill="hsl(var(--primary))" />
        <circle cx="165" cy="165" r="4" fill="hsl(var(--primary))" />
        <circle cx="85" cy="165" r="4" fill="hsl(var(--primary))" />
        <circle cx="75" cy="95" r="4" fill="hsl(var(--primary))" />
      </svg>
      
      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-xs font-medium">
            Data Foundation
          </div>
          <div className="absolute top-6 right-0 transform translate-x-4 text-xs font-medium">
            AI Strategy
          </div>
          <div className="absolute bottom-6 right-0 transform translate-x-4 text-xs font-medium">
            Technology Stack
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 text-xs font-medium">
            Talent & Culture
          </div>
          <div className="absolute top-6 left-0 transform -translate-x-4 text-xs font-medium">
            Governance & Ethics
          </div>
        </div>
      </div>
    </div>
  );
}
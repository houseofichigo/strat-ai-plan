import React from 'react';

export function RadarChart() {
  const pillars = [
    { name: 'Data Foundation', score: 3.5, angle: 0 },
    { name: 'AI Strategy', score: 2.8, angle: 72 },
    { name: 'Technology', score: 3.2, angle: 144 },
    { name: 'Talent & Culture', score: 2.9, angle: 216 },
    { name: 'Governance', score: 3.1, angle: 288 }
  ];

  const center = 125;
  const maxRadius = 100;
  
  // Convert score to radius (score of 5 = maxRadius)
  const getRadius = (score: number) => (score / 5) * maxRadius;
  
  // Convert polar to cartesian coordinates
  const getPoint = (angle: number, radius: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian)
    };
  };

  // Generate polygon points
  const polygonPoints = pillars.map(pillar => {
    const point = getPoint(pillar.angle, getRadius(pillar.score));
    return `${point.x},${point.y}`;
  }).join(' ');

  return (
    <div className="relative h-80 flex items-center justify-center">
      <svg width="280" height="280" viewBox="0 0 250 250">
        {/* Grid circles */}
        {[1, 2, 3, 4, 5].map(level => (
          <circle 
            key={level}
            cx={center} 
            cy={center} 
            r={(level / 5) * maxRadius} 
            fill="none" 
            stroke="hsl(var(--border))" 
            strokeWidth="1" 
            opacity="0.3" 
          />
        ))}
        
        {/* Grid lines to each pillar */}
        {pillars.map((pillar, index) => {
          const endPoint = getPoint(pillar.angle, maxRadius);
          return (
            <line 
              key={index}
              x1={center} 
              y1={center} 
              x2={endPoint.x} 
              y2={endPoint.y} 
              stroke="hsl(var(--border))" 
              strokeWidth="1" 
              opacity="0.3" 
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon 
          points={polygonPoints}
          fill="hsl(var(--primary))" 
          fillOpacity="0.15" 
          stroke="hsl(var(--primary))" 
          strokeWidth="2"
        />
        
        {/* Data points */}
        {pillars.map((pillar, index) => {
          const point = getPoint(pillar.angle, getRadius(pillar.score));
          return (
            <circle 
              key={index}
              cx={point.x} 
              cy={point.y} 
              r="4" 
              fill="hsl(var(--primary))" 
              stroke="hsl(var(--background))"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Center point */}
        <circle cx={center} cy={center} r="2" fill="hsl(var(--muted-foreground))" />
      </svg>
      
      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-72 h-72">
          {pillars.map((pillar, index) => {
            const labelPoint = getPoint(pillar.angle, maxRadius + 25);
            const isRightSide = labelPoint.x > center;
            const isTopHalf = labelPoint.y < center;
            
            return (
              <div 
                key={index}
                className="absolute text-xs font-medium text-center"
                style={{
                  left: `${((labelPoint.x - center) / 280) * 100 + 50}%`,
                  top: `${((labelPoint.y - center) / 280) * 100 + 50}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '80px'
                }}
              >
                <div className="font-semibold">{pillar.name}</div>
                <div className="text-xs text-primary font-bold mt-1">{pillar.score}/5</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-primary/20"></div>
            <span>Current Score</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-border"></div>
            <span>Target: 5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
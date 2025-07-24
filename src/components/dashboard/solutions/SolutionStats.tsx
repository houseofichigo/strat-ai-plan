import React from 'react';
import { Solution } from '../Solutions';

interface SolutionStatsProps {
  solutions: Solution[];
}

export function SolutionStats({ solutions }: SolutionStatsProps) {
  const agentCount = solutions.filter(s => s.type === 'agent').length;
  const workflowCount = solutions.filter(s => s.type === 'workflow').length;
  const featuredCount = solutions.filter(s => s.featured).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="text-center p-4 bg-background/80 rounded-lg">
        <div className="text-2xl font-bold text-primary">{agentCount}</div>
        <div className="text-sm text-muted-foreground">AI Agents</div>
      </div>
      <div className="text-center p-4 bg-background/80 rounded-lg">
        <div className="text-2xl font-bold text-primary">{workflowCount}</div>
        <div className="text-sm text-muted-foreground">Workflows</div>
      </div>
      <div className="text-center p-4 bg-background/80 rounded-lg">
        <div className="text-2xl font-bold text-primary">{featuredCount}</div>
        <div className="text-sm text-muted-foreground">Featured Solutions</div>
      </div>
    </div>
  );
}
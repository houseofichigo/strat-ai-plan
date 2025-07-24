import React from 'react';
import { Button } from '@/components/ui/button';
import { AgentTemplateCard } from '../agents/AgentTemplateCard';
import { WorkflowSolutionCard } from './WorkflowSolutionCard';
import { Solution } from '../Solutions';
import { ChevronRight } from 'lucide-react';

interface SolutionCategoryRowProps {
  title: string;
  solutions: Solution[];
  onPreview: (solution: Solution) => void;
  onCopy: (solution: Solution) => void;
  onFavorite: (solution: Solution) => void;
  onViewAll?: () => void;
}

export function SolutionCategoryRow({ 
  title, 
  solutions, 
  onPreview, 
  onCopy, 
  onFavorite, 
  onViewAll 
}: SolutionCategoryRowProps) {
  if (solutions.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {onViewAll && (
          <Button variant="ghost" onClick={onViewAll} className="text-primary hover:text-primary/80">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-background">
        {solutions.map((solution) => (
          <div key={solution.id} className="flex-none w-80">
            {solution.type === 'agent' ? (
              <AgentTemplateCard
                agent={solution.data}
                onPreview={() => onPreview(solution)}
                onCopy={() => onCopy(solution)}
                onFavorite={() => onFavorite(solution)}
                className="h-full"
              />
            ) : (
              <WorkflowSolutionCard
                workflow={solution.data}
                onPreview={() => onPreview(solution)}
                onCopy={() => onCopy(solution)}
                onFavorite={() => onFavorite(solution)}
                className="h-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
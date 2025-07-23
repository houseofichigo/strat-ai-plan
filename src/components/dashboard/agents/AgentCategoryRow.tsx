import React from 'react';
import { Button } from '@/components/ui/button';
import { AgentTemplateCard } from './AgentTemplateCard';
import { AgentTemplate } from '@/data/agentTemplatesData';
import { ChevronRight } from 'lucide-react';

interface AgentCategoryRowProps {
  title: string;
  agents: AgentTemplate[];
  onPreview: (agent: AgentTemplate) => void;
  onCopy: (agent: AgentTemplate) => void;
  onFavorite: (agent: AgentTemplate) => void;
  onViewAll?: () => void;
}

export function AgentCategoryRow({ title, agents, onPreview, onCopy, onFavorite, onViewAll }: AgentCategoryRowProps) {
  if (agents.length === 0) return null;

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
        {agents.map((agent) => (
          <div key={agent.id} className="flex-none w-80">
            <AgentTemplateCard
              agent={agent}
              onPreview={onPreview}
              onCopy={onCopy}
              onFavorite={onFavorite}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
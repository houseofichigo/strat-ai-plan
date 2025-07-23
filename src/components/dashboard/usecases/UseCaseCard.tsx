import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Eye, GitBranch } from 'lucide-react';
import { UseCase } from '@/data/useCasesData';
import { cn } from '@/lib/utils';

interface UseCaseCardProps {
  useCase: UseCase;
  onViewDetails: (useCase: UseCase) => void;
  onAddToRoadmap: (useCase: UseCase) => void;
  className?: string;
}

export function UseCaseCard({ useCase, onViewDetails, onAddToRoadmap, className }: UseCaseCardProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'Scale': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pilot': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Beta': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border cursor-pointer",
      className
    )}>
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <div className="text-6xl">{useCase.thumbnail}</div>
          {(useCase.featured || useCase.trending) && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              {useCase.featured ? 'Featured' : 'Trending'}
            </Badge>
          )}
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(useCase);
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onAddToRoadmap(useCase);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add to Roadmap
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Summary */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{useCase.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{useCase.summaryValue}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {useCase.industry.slice(0, 2).map((industry) => (
              <Badge key={industry} variant="secondary" className="text-xs">
                {industry}
              </Badge>
            ))}
            {useCase.aiType.slice(0, 1).map((type) => (
              <Badge key={type} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {Object.entries(useCase.impactMetrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-center p-2 bg-secondary/50 rounded-md">
                <div className="text-sm font-semibold text-primary">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">{key}</div>
              </div>
            ))}
          </div>

          {/* Bottom Row - Badges */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge className={cn("text-xs", getComplexityColor(useCase.complexity))}>
                {useCase.complexity}
              </Badge>
              <Badge className={cn("text-xs", getMaturityColor(useCase.maturity))}>
                {useCase.maturity}
              </Badge>
            </div>
            <Badge variant="outline" className="text-xs">
              {useCase.suitability}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
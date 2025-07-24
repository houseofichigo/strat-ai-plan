import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Heart, Clock, TrendingUp } from 'lucide-react';
import { WorkflowTemplate } from '@/data/workflowTemplatesData';
import { cn } from '@/lib/utils';

interface WorkflowSolutionCardProps {
  workflow: WorkflowTemplate;
  onPreview: (workflow: WorkflowTemplate) => void;
  onCopy: (workflow: WorkflowTemplate) => void;
  onFavorite: (workflow: WorkflowTemplate) => void;
  className?: string;
}

export function WorkflowSolutionCard({ workflow, onPreview, onCopy, onFavorite, className }: WorkflowSolutionCardProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getROIColor = (roi: string) => {
    switch (roi) {
      case 'Very High': return 'bg-green-100 text-green-800 border-green-200';
      case 'High': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border cursor-pointer",
      className
    )}>
      <CardContent className="p-0">
        {/* Solution Type Badge */}
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
            Workflow
          </Badge>
        </div>

        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            {workflow.appIcons && Object.values(workflow.appIcons).slice(0, 3).map((icon, index) => (
              <div key={index} className="text-2xl">{icon}</div>
            ))}
          </div>
          
          {/* Status Badges */}
          {(workflow.featured || workflow.trending || workflow.quickWin) && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              {workflow.featured ? 'Featured' : workflow.trending ? 'Trending' : 'Quick Win'}
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
                onPreview(workflow);
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onCopy(workflow);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add to Roadmap
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Description */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{workflow.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{workflow.description}</p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {workflow.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
            {workflow.department.slice(0, 2).map((dept) => (
              <Badge key={dept} variant="outline" className="text-xs">
                {dept}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-center p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                <Clock className="w-3 h-3" />
                {workflow.timeSaved}
              </div>
              <div className="text-xs text-muted-foreground">Time Saved</div>
            </div>
            <div className="text-center p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                <TrendingUp className="w-3 h-3" />
                {workflow.roi}
              </div>
              <div className="text-xs text-muted-foreground">ROI</div>
            </div>
          </div>

          {/* Bottom Row - Complexity and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge className={cn("text-xs", getComplexityColor(workflow.complexity))}>
                {workflow.complexity}
              </Badge>
              <Badge className={cn("text-xs", getROIColor(workflow.roi))}>
                {workflow.roi}
              </Badge>
            </div>
            
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="p-1 h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(workflow);
                }}
              >
                <Heart className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Setup Time */}
          <div className="mt-3 pt-3 border-t">
            <div className="text-xs text-muted-foreground">
              Setup time: <span className="font-medium">{workflow.setupTime}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Similar Workflows Section - This will be added by parent component */}
    </Card>
  );
}
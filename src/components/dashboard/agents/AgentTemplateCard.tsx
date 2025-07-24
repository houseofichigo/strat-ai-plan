import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AgentTemplate } from '@/data/agentTemplatesData';
import { Eye, Copy, Heart, Share2, Play, Clock, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentTemplateCardProps {
  agent: AgentTemplate;
  onPreview: (agent: AgentTemplate) => void;
  onCopy: (agent: AgentTemplate) => void;
  onFavorite: (agent: AgentTemplate) => void;
  className?: string;
}

export function AgentTemplateCard({ agent, onPreview, onCopy, onFavorite, className }: AgentTemplateCardProps) {
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
      case 'Very High': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'High': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Medium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryTheme = (theme: string) => {
    const themes = {
      blue: 'from-blue-500/20 to-blue-600/10',
      green: 'from-green-500/20 to-green-600/10',
      orange: 'from-orange-500/20 to-orange-600/10',
      yellow: 'from-yellow-500/20 to-yellow-600/10',
      red: 'from-red-500/20 to-red-600/10',
      purple: 'from-purple-500/20 to-purple-600/10',
      indigo: 'from-indigo-500/20 to-indigo-600/10'
    };
    return themes[theme as keyof typeof themes] || themes.blue;
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border cursor-pointer",
      className
    )}>
      <CardContent className="p-0">
        {/* Header with Stack Icons */}
        <div className={cn(
          "relative h-32 bg-gradient-to-br flex items-center justify-center p-4",
          getCategoryTheme(agent.colorTheme)
        )}>
          {/* Stack Icons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {agent.stackIcons && Object.entries(agent.stackIcons).slice(0, 4).map(([name, icon]) => (
              <div key={name} className="text-2xl" title={name}>
                {icon}
              </div>
            ))}
          </div>
          
          {/* Solution Type Badge */}
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
              Agent
            </Badge>
          </div>

          {/* Status Badges */}
          <div className="absolute top-2 right-2 flex gap-1">
            {agent.featured && (
              <Badge className="bg-accent text-accent-foreground text-xs">Featured</Badge>
            )}
            {agent.trending && (
              <Badge className="bg-primary text-primary-foreground text-xs">Trending</Badge>
            )}
            {agent.newArrival && (
              <Badge className="bg-secondary text-secondary-foreground text-xs">New</Badge>
            )}
          </div>

          {/* Hover Actions Overlay */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(agent);
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
                onCopy(agent);
              }}
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name and Description */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{agent.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{agent.shortDescription}</p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {agent.category.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-center p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                <Clock className="w-3 h-3" />
                {agent.setupTime}
              </div>
              <div className="text-xs text-muted-foreground">Setup</div>
            </div>
            <div className="text-center p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                <Users className="w-3 h-3" />
                {agent.usage}
              </div>
              <div className="text-xs text-muted-foreground">Deployed</div>
            </div>
          </div>

          {/* Bottom Row - Badges and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge className={cn("text-xs", getComplexityColor(agent.complexity))}>
                {agent.complexity}
              </Badge>
              <Badge className={cn("text-xs", getROIColor(agent.estimatedROI))}>
                {agent.estimatedROI} ROI
              </Badge>
            </div>
            
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="p-1 h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(agent);
                }}
              >
                <Heart className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-1 h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.share && navigator.share({ title: agent.name, text: agent.shortDescription });
                }}
              >
                <Share2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Similar Agents Section - This will be added by parent component */}
    </Card>
  );
}
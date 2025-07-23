import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RoadmapItem } from '@/data/roadmapData';
import { Calendar, Clock, Users, Star, Target, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapCardProps {
  item: RoadmapItem;
  onEdit: (item: RoadmapItem) => void;
  onDelete: (id: string) => void;
  onClick: (item: RoadmapItem) => void;
  isDragging?: boolean;
}

export function RoadmapCard({ item, onEdit, onDelete, onClick, isDragging }: RoadmapCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'High': return 'bg-warning/10 text-warning border-warning/20';
      case 'Medium': return 'bg-accent/10 text-accent border-accent/20';
      case 'Low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Use Case': return 'bg-primary/10 text-primary border-primary/20';
      case 'Agent': return 'bg-accent/10 text-accent border-accent/20';
      case 'Workflow': return 'bg-success/10 text-success border-success/20';
      case 'Training': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card 
      className={cn(
        "mb-4 cursor-pointer transition-all duration-300 hover:shadow-medium border-l-4 group",
        item.priority === 'Critical' && "border-l-destructive bg-gradient-to-r from-destructive/5 to-transparent",
        item.priority === 'High' && "border-l-warning bg-gradient-to-r from-warning/5 to-transparent",
        item.priority === 'Medium' && "border-l-accent bg-gradient-to-r from-accent/5 to-transparent",
        item.priority === 'Low' && "border-l-success bg-gradient-to-r from-success/5 to-transparent",
        isDragging && "opacity-50 rotate-2 shadow-strong scale-105"
      )}
      onClick={() => onClick(item)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="p-2 bg-primary/10 rounded-md shrink-0">
              <div className="text-lg">{item.icon}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="p-1.5 h-7 w-7 opacity-60 hover:opacity-100 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Enhanced Tags with Source Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={cn("text-xs font-medium border", getCategoryColor(item.category))}>
            {item.category}
          </Badge>
          <Badge variant="outline" className={cn("text-xs font-medium border", getPriorityColor(item.priority))}>
            {item.priority}
          </Badge>
          <Badge variant="secondary" className="text-xs bg-muted/60">
            {item.type}
          </Badge>
          {item.tags && item.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Source Connection */}
        <div className="mb-3 p-2 bg-muted/30 rounded-md border">
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground font-medium">Source:</div>
            <Badge variant="outline" className="text-xs">
              {item.source === 'use-cases' ? '📋 Use Case' : 
               item.source === 'agents' ? '🤖 AI Agent' : 
               item.source === 'workflows' ? '⚡ Workflow' : '📚 Training'}
            </Badge>
            <div className="text-xs text-muted-foreground">ID: {item.sourceId}</div>
          </div>
        </div>

        {/* Progress */}
        {item.progress > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-1" />
          </div>
        )}

        {/* Enhanced Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{item.timeline}</span>
            </div>
            <div className="text-xs text-muted-foreground">Timeline</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{item.assignees.length}</span>
            </div>
            <div className="text-xs text-muted-foreground">Team Size</div>
          </div>
        </div>

        {/* Due Date */}
        {item.dueDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3 h-3" />
            Due {formatDate(item.dueDate)}
          </div>
        )}

        {/* Owner */}
        {item.owner && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Target className="w-3 h-3" />
            {item.owner}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
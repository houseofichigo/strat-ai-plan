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
  isDragging?: boolean;
}

export function RoadmapCard({ item, onEdit, onDelete, isDragging }: RoadmapCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Use Case': return 'bg-blue-100 text-blue-800';
      case 'Agent': return 'bg-purple-100 text-purple-800';
      case 'Workflow': return 'bg-green-100 text-green-800';
      case 'Training': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className={cn(
      "mb-3 cursor-pointer transition-all duration-200 hover:shadow-md",
      isDragging && "opacity-50 rotate-3 shadow-lg"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="text-lg">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="p-1 h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
          >
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge className={cn("text-xs", getCategoryColor(item.category))}>
            {item.category}
          </Badge>
          <Badge className={cn("text-xs", getPriorityColor(item.priority))}>
            {item.priority}
          </Badge>
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

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center p-2 bg-secondary/30 rounded-md">
            <div className="flex items-center justify-center gap-1 text-xs font-medium">
              <Clock className="w-3 h-3" />
              {item.timeline}
            </div>
            <div className="text-xs text-muted-foreground">Timeline</div>
          </div>
          <div className="text-center p-2 bg-secondary/30 rounded-md">
            <div className="flex items-center justify-center gap-1 text-xs font-medium">
              <Users className="w-3 h-3" />
              {item.assignees.length}
            </div>
            <div className="text-xs text-muted-foreground">Assignees</div>
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
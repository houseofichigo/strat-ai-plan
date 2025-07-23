import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RoadmapCard } from './RoadmapCard';
import { RoadmapColumn as RoadmapColumnType, RoadmapItem } from '@/data/roadmapData';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapColumnProps {
  column: RoadmapColumnType;
  onDropItem: (item: RoadmapItem, targetStatus: string) => void;
  onEditItem: (item: RoadmapItem) => void;
  onDeleteItem: (id: string) => void;
  onViewItem: (item: RoadmapItem) => void;
  draggedItem: RoadmapItem | null;
}

export function RoadmapColumn({ 
  column, 
  onDropItem, 
  onEditItem, 
  onDeleteItem,
  onViewItem,
  draggedItem 
}: RoadmapColumnProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (draggedItem) {
      const targetStatus = column.title;
      onDropItem(draggedItem, targetStatus);
    }
  };

  const getStatusCount = () => {
    return column.items.length;
  };

  return (
    <Card className={cn(
      "h-full min-h-[700px] transition-all duration-300 shadow-soft",
      "bg-gradient-to-b from-background to-muted/20",
      column.color,
      isDragOver && "ring-2 ring-primary ring-offset-2 bg-primary/10 shadow-medium"
    )}>
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">{column.title}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {getStatusCount()} {getStatusCount() === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-medium bg-background">
            {getStatusCount()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent 
        className="pt-0 space-y-3"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {column.items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-muted-foreground/20 rounded-lg mx-2">
            <div className="text-5xl mb-3 opacity-50">📋</div>
            <p className="text-sm font-medium mb-1">No items in {column.title.toLowerCase()}</p>
            <p className="text-xs opacity-75">Drag items here or create new ones</p>
          </div>
        )}
        
        {column.items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', item.id);
            }}
          >
            <RoadmapCard
              item={item}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
              onClick={onViewItem}
              isDragging={draggedItem?.id === item.id}
            />
          </div>
        ))}
        
        {/* Enhanced Add new item placeholder */}
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 cursor-pointer group mx-2">
          <div className="p-2 bg-muted/50 rounded-full w-fit mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors font-medium">
            Add new item
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Click to create
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
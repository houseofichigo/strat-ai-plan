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
  draggedItem: RoadmapItem | null;
}

export function RoadmapColumn({ 
  column, 
  onDropItem, 
  onEditItem, 
  onDeleteItem, 
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
      "h-full min-h-[600px] transition-all duration-200",
      column.color,
      isDragOver && "ring-2 ring-primary ring-offset-2 bg-primary/5"
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{column.title}</CardTitle>
          <Badge variant="secondary" className="text-xs">
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
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm">No items yet</p>
            <p className="text-xs">Drag items here or add new ones</p>
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
              isDragging={draggedItem?.id === item.id}
            />
          </div>
        ))}
        
        {/* Add new item placeholder */}
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Plus className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Add new item</p>
        </div>
      </CardContent>
    </Card>
  );
}
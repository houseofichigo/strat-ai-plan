import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RoadmapColumn } from './roadmap/RoadmapColumn';
import { RoadmapItemModal } from './roadmap/RoadmapItemModal';
import { RoadmapDetailModal } from './roadmap/RoadmapDetailModal';
import { roadmapColumns, RoadmapItem, RoadmapColumn as RoadmapColumnType, roadmapManager } from '@/data/roadmapData';
import { Search, Filter, Calendar, Users, Target, TrendingUp, Plus } from 'lucide-react';

export function RoadmapBuilder() {
  const [columns, setColumns] = useState<RoadmapColumnType[]>(roadmapColumns);
  const [allItems, setAllItems] = useState<RoadmapItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<RoadmapItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  // Load roadmap data
  useEffect(() => {
    const loadRoadmapData = () => {
      const items = roadmapManager.getItems();
      setAllItems(items);
      
      // Organize items into columns
      const updatedColumns = roadmapColumns.map(column => ({
        ...column,
        items: items.filter(item => 
          item.status.toLowerCase().replace(' ', '-') === column.id
        )
      }));
      
      setColumns(updatedColumns);
    };

    loadRoadmapData();
    
    // Subscribe to roadmap changes
    const unsubscribe = roadmapManager.subscribe(loadRoadmapData);
    return unsubscribe;
  }, []);

  // Filter items based on search and filters
  const filteredColumns = columns.map(column => ({
    ...column,
    items: column.items.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = !filterPriority || item.priority === filterPriority;
      const matchesCategory = !filterCategory || item.category === filterCategory;
      
      return matchesSearch && matchesPriority && matchesCategory;
    })
  }));

  const handleDragStart = (item: RoadmapItem) => {
    setDraggedItem(item);
  };

  const handleDropItem = (item: RoadmapItem, targetStatus: string) => {
    roadmapManager.updateItem(item.id, { status: targetStatus as any });
    setDraggedItem(null);
    toast.success(`"${item.title}" moved to ${targetStatus}`);
  };

  const handleViewItem = (item: RoadmapItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleEditItem = (item: RoadmapItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItem = (item: RoadmapItem) => {
    roadmapManager.updateItem(item.id, item);
    toast.success(`"${item.title}" updated successfully`);
  };

  const handleDeleteItem = (id: string) => {
    const item = allItems.find(i => i.id === id);
    if (item) {
      roadmapManager.removeItem(id);
      toast.success(`"${item.title}" removed from roadmap`);
    }
    setIsModalOpen(false);
  };

  const getTotalItems = () => {
    return allItems.length;
  };

  const getCompletedItems = () => {
    return allItems.filter(item => item.status === 'Completed').length;
  };

  const getInProgressItems = () => {
    return allItems.filter(item => item.status === 'In Progress').length;
  };

  const getAverageProgress = () => {
    if (allItems.length === 0) return 0;
    const totalProgress = allItems.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / allItems.length);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">AI Implementation Roadmap</h1>
            <p className="text-muted-foreground">Track and manage your AI initiatives from planning to completion</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-background to-muted/30 border-l-4 border-l-primary shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">{getTotalItems()}</div>
                  <div className="text-sm font-medium text-muted-foreground">Total Items</div>
                  <div className="text-xs text-muted-foreground/80">Across all stages</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-background to-muted/30 border-l-4 border-l-success shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">{getInProgressItems()}</div>
                  <div className="text-sm font-medium text-muted-foreground">In Progress</div>
                  <div className="text-xs text-success">Active development</div>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-background to-muted/30 border-l-4 border-l-accent shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">{getCompletedItems()}</div>
                  <div className="text-sm font-medium text-muted-foreground">Completed</div>
                  <div className="text-xs text-accent">Ready for use</div>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-background to-muted/30 border-l-4 border-l-warning shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">{getAverageProgress()}%</div>
                  <div className="text-sm font-medium text-muted-foreground">Avg Progress</div>
                  <div className="text-xs text-warning">Overall completion</div>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Users className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search roadmap items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">All Categories</option>
              <option value="Use Case">Use Cases</option>
              <option value="Agent">Agents</option>
              <option value="Workflow">Workflows</option>
              <option value="Training">Training</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Kanban Board */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Implementation Board</h2>
          <div className="text-sm text-muted-foreground">
            Showing {filteredColumns.reduce((acc, col) => acc + col.items.length, 0)} of {getTotalItems()} items
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[700px]">
          {filteredColumns.map((column) => (
            <RoadmapColumn
              key={column.id}
              column={column}
              onDropItem={handleDropItem}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              onViewItem={handleViewItem}
              draggedItem={draggedItem}
            />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {getTotalItems() === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold mb-2">Your roadmap is empty</h3>
          <p className="text-muted-foreground mb-6">
            Start by adding use cases, agents, or workflows from other pages to build your implementation roadmap.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">Browse Use Cases</Button>
            <Button variant="outline">Explore Agents</Button>
            <Button variant="outline">View Workflows</Button>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      <RoadmapItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateItem}
        onDelete={handleDeleteItem}
      />

      {/* Detailed View Modal */}
      <RoadmapDetailModal
        item={selectedItem}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEditItem}
        onUpdate={handleUpdateItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}
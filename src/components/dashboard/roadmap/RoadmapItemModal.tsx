import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoadmapItem } from '@/data/roadmapData';
import { 
  Calendar, 
  Clock, 
  Users, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  ArrowRight,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapItemModalProps {
  item: RoadmapItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (item: RoadmapItem) => void;
  onDelete: (id: string) => void;
}

export function RoadmapItemModal({ item, isOpen, onClose, onUpdate, onDelete }: RoadmapItemModalProps) {
  if (!item) return null;

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

  const handleStatusChange = (newStatus: string) => {
    const updatedItem = { ...item, status: newStatus as any, updatedAt: new Date() };
    onUpdate(updatedItem);
  };

  const handleProgressUpdate = (increment: number) => {
    const newProgress = Math.max(0, Math.min(100, item.progress + increment));
    const updatedItem = { ...item, progress: newProgress, updatedAt: new Date() };
    onUpdate(updatedItem);
  };

  const statusOptions = ['To Plan', 'Ready', 'In Progress', 'Testing', 'Completed', 'On Hold'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{item.icon}</div>
              <div>
                <DialogTitle className="text-2xl mb-2">{item.title}</DialogTitle>
                <div className="flex gap-2">
                  <Badge className={cn("text-xs", getCategoryColor(item.category))}>
                    {item.category}
                  </Badge>
                  <Badge className={cn("text-xs", getPriorityColor(item.priority))}>
                    {item.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Completion</span>
                    <span className="text-sm font-bold">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                  <div className="flex gap-1 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleProgressUpdate(-10)}
                      disabled={item.progress <= 0}
                    >
                      -10%
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleProgressUpdate(10)}
                      disabled={item.progress >= 100}
                    >
                      +10%
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{item.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{item.assignees.length} assignees</span>
                  </div>
                  {item.dueDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Due {item.dueDate.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    variant={item.status === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                    {item.status === status && <CheckCircle className="w-3 h-3 ml-1" />}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Prerequisites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {item.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{prereq}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Implementation Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {item.implementationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics and Dependencies */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {item.successMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {item.dependencies.map((dependency, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{dependency}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team and Notes */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team & Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Owner</label>
                    <p className="text-sm text-muted-foreground">{item.owner}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Assignees</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.assignees.map((assignee) => (
                        <Badge key={assignee} variant="outline" className="text-xs">
                          {assignee}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {item.notes || 'No notes added yet.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
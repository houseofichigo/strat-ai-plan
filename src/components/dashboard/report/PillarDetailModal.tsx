import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  User, 
  Target,
  Zap,
  ArrowRight,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface PillarDetail {
  id: string;
  title: string;
  score: number;
  status: 'strong' | 'good' | 'developing' | 'needs_focus';
  description: string;
  dimensions: {
    id: string;
    name: string;
    description: string;
    score: number;
    questions: {
      id: string;
      text: string;
      answer: string;
      impact: string;
    }[];
  }[];
  recommendations: {
    id: string;
    title: string;
    description: string;
    impact: string;
    effort: string;
    priority: string;
    owner?: string;
    timeline?: string;
  }[];
}

interface PillarDetailModalProps {
  pillar: PillarDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PillarDetailModal({ pillar, open, onOpenChange }: PillarDetailModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ owner: string; timeline: string; priority: string }>({
    owner: '',
    timeline: '',
    priority: ''
  });

  if (!pillar) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong': return 'text-success';
      case 'good': return 'text-primary';
      case 'developing': return 'text-warning';
      case 'needs_focus': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'strong': return CheckCircle;
      case 'good': return TrendingUp;
      case 'developing': return AlertTriangle;
      case 'needs_focus': return TrendingDown;
      default: return AlertTriangle;
    }
  };

  const StatusIcon = getStatusIcon(pillar.status);

  const handleEdit = (recommendation: any) => {
    setEditingId(recommendation.id);
    setEditForm({
      owner: recommendation.owner || '',
      timeline: recommendation.timeline || '',
      priority: recommendation.priority || 'medium'
    });
  };

  const handleSave = () => {
    // In a real app, this would update the recommendation
    console.log('Saving recommendation:', editingId, editForm);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ owner: '', timeline: '', priority: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <StatusIcon className={`w-6 h-6 ${getStatusColor(pillar.status)}`} />
            <div>
              <DialogTitle className="text-2xl">{pillar.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-2xl font-bold ${getStatusColor(pillar.status)}`}>
                  {pillar.score.toFixed(1)}/5.0
                </span>
                <Badge variant="outline" className="capitalize">
                  {pillar.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{pillar.description}</p>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round((pillar.score / 5) * 100)}%</span>
                </div>
                <Progress value={(pillar.score / 5) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Dimensions Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Dimension Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {pillar.dimensions.map((dimension) => (
                  <div key={dimension.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{dimension.name}</h4>
                        <p className="text-sm text-muted-foreground">{dimension.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{dimension.score.toFixed(1)}/5</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((dimension.score / 5) * 100)}%
                        </div>
                      </div>
                    </div>
                    
                    <Progress value={(dimension.score / 5) * 100} className="mb-3" />
                    
                    {/* Assessment Questions */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-muted-foreground">Assessment Details:</h5>
                      {dimension.questions.map((question) => (
                        <div key={question.id} className="bg-muted/50 rounded p-3 text-sm">
                          <div className="font-medium mb-1">{question.text}</div>
                          <div className="text-muted-foreground mb-2">Answer: {question.answer}</div>
                          <div className="text-xs text-primary">{question.impact}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pillar.recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{recommendation.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            <span>Impact: {recommendation.impact}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>Effort: {recommendation.effort}</span>
                          </div>
                        </div>
                      </div>
                      
                      {editingId !== recommendation.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(recommendation)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    {editingId === recommendation.id ? (
                      <div className="space-y-3 pt-3 border-t">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Owner</label>
                            <Input
                              value={editForm.owner}
                              onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                              placeholder="Assign owner"
                              className="h-8"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Timeline</label>
                            <Input
                              value={editForm.timeline}
                              onChange={(e) => setEditForm({ ...editForm, timeline: e.target.value })}
                              placeholder="e.g., 2 weeks"
                              className="h-8"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Priority</label>
                            <Select value={editForm.priority} onValueChange={(value) => setEditForm({ ...editForm, priority: value })}>
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="w-3 h-3 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 pt-3 border-t text-xs">
                        {recommendation.owner && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{recommendation.owner}</span>
                          </div>
                        )}
                        {recommendation.timeline && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{recommendation.timeline}</span>
                          </div>
                        )}
                        <Badge variant="outline" className="h-5 text-xs">
                          {recommendation.priority}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
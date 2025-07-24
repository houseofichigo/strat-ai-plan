import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoadmapItem } from '@/data/roadmapData';
import { useCasesData } from '@/data/useCasesData';
import { agentTemplatesData } from '@/data/agentTemplatesData';
import { workflowTemplatesData } from '@/data/workflowTemplatesData';
import { 
  Calendar, 
  Clock, 
  Users, 
  Target, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Zap,
  TrendingUp,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapDetailModalProps {
  item: RoadmapItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: RoadmapItem) => void;
  onUpdate: (item: RoadmapItem) => void;
  onDelete: (id: string) => void;
}

export function RoadmapDetailModal({ 
  item, 
  isOpen, 
  onClose, 
  onEdit,
  onUpdate, 
  onDelete 
}: RoadmapDetailModalProps) {
  const [sourceData, setSourceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item && isOpen) {
      setLoading(true);
      // Find the original source data
      let data = null;
      
      if (item.source === 'use-cases') {
        data = useCasesData.find(uc => uc.id === item.sourceId);
      } else if (item.source === 'agents') {
        data = agentTemplatesData.find(agent => agent.id === item.sourceId);
      } else if (item.source === 'workflows') {
        data = workflowTemplatesData.find(wf => wf.id === item.sourceId);
      }
      
      setSourceData(data);
      setLoading(false);
    }
  }, [item, isOpen]);

  if (!item) return null;

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
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSourceIcon = () => {
    switch (item.source) {
      case 'use-cases': return '📋';
      case 'agents': return '🤖';
      case 'workflows': return '⚡';
      case 'training': return '📚';
      default: return '📄';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl">{item.icon}</div>
              </div>
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold mb-2">{item.title}</DialogTitle>
                <p className="text-muted-foreground mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={cn("border", getCategoryColor(item.category))}>
                    {item.category}
                  </Badge>
                  <Badge variant="outline" className={cn("border", getPriorityColor(item.priority))}>
                    {item.priority}
                  </Badge>
                  <Badge variant="secondary">
                    {getSourceIcon()} {item.source === 'use-cases' ? 'Use Case' : 
                     item.source === 'agents' ? 'AI Agent' : 
                     item.source === 'workflows' ? 'Workflow' : 'Training'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onEdit(item)}>
                <Settings className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="source">Original Source</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="tracking">Progress Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Status & Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Completion</span>
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{item.timeline}</div>
                      <div className="text-xs text-muted-foreground">Timeline</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{item.assignees.length}</div>
                      <div className="text-xs text-muted-foreground">Team Members</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Timeline & Ownership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.owner && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Owner: {item.owner}</span>
                    </div>
                  )}
                  {item.dueDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Due: {formatDate(item.dueDate)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Effort: {item.estimatedEffort}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Success Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.successMetrics.map((metric, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="source" className="space-y-6 mt-6">
            {loading ? (
              <div className="text-center py-8">Loading source data...</div>
            ) : sourceData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="text-xl">{getSourceIcon()}</div>
                    Original {item.source === 'use-cases' ? 'Use Case' : 
                             item.source === 'agents' ? 'AI Agent' : 
                             item.source === 'workflows' ? 'Workflow' : 'Training'} Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.source === 'use-cases' && sourceData && (
                    <>
                      <div>
                        <h4 className="font-semibold mb-2">Business Challenge</h4>
                        <p className="text-sm text-muted-foreground">{sourceData.businessChallenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Expected Impact</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {sourceData.impactMetrics.time && (
                            <Badge variant="outline">{sourceData.impactMetrics.time}</Badge>
                          )}
                          {sourceData.impactMetrics.cost && (
                            <Badge variant="outline">{sourceData.impactMetrics.cost}</Badge>
                          )}
                          {sourceData.impactMetrics.accuracy && (
                            <Badge variant="outline">{sourceData.impactMetrics.accuracy}</Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Data Requirements</h4>
                        <ul className="text-sm space-y-1">
                          {sourceData.dataRequirements.slice(0, 3).map((req: string, index: number) => (
                            <li key={index} className="text-muted-foreground">• {req}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {item.source === 'agents' && sourceData && (
                    <>
                      <div>
                        <h4 className="font-semibold mb-2">Agent Description</h4>
                        <p className="text-sm text-muted-foreground">{sourceData.detailedDescription}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {sourceData.stack.map((tech: string) => (
                            <Badge key={tech} variant="outline">
                              {sourceData.stackIcons?.[tech]} {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Estimated ROI</h4>
                        <Badge variant="outline" className="bg-success/10 text-success">
                          {sourceData.estimatedROI}
                        </Badge>
                      </div>
                    </>
                  )}

                  {item.source === 'workflows' && sourceData && (
                    <>
                      <div>
                        <h4 className="font-semibold mb-2">Workflow Description</h4>
                        <p className="text-sm text-muted-foreground">{sourceData.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Automation Level</h4>
                        <Badge variant="outline">{sourceData.automationLevel}</Badge>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Source data not found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Implementation Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {item.implementationSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{step}</p>
                      </div>
                      {index < item.implementationSteps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {item.dependencies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dependencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.dependencies.map((dep, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                        {dep}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {item.assignees.map((assignee, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">{assignee.charAt(0)}</span>
                        </div>
                        <span className="text-sm">{assignee}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes & Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {item.notes || 'No notes available'}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Created: {formatDate(item.createdAt)}</div>
                      <div>Updated: {formatDate(item.updatedAt)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
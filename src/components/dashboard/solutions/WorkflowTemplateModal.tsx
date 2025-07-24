import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkflowTemplate } from '@/data/workflowTemplatesData';
import { Play, Copy, Share2, Clock, Users, Target, CheckCircle, Database, Cog, TrendingUp, ExternalLink, Zap, FileText, GitBranch, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowTemplateModalProps {
  workflow: WorkflowTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (workflow: WorkflowTemplate) => void;
  onCopy: (workflow: WorkflowTemplate) => void;
}

export function WorkflowTemplateModal({ workflow, isOpen, onClose, onDeploy, onCopy }: WorkflowTemplateModalProps) {
  if (!workflow) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-3xl">
                {workflow.appIcons && Object.values(workflow.appIcons).slice(0, 3).map((icon, index) => (
                  <span key={index}>{icon}</span>
                ))}
              </div>
              <div>
                <DialogTitle className="text-2xl mb-2">{workflow.title}</DialogTitle>
                <div className="flex gap-2">
                  <Badge className={cn("text-xs", getComplexityColor(workflow.complexity))}>
                    {workflow.complexity}
                  </Badge>
                  <Badge className={cn("text-xs", getROIColor(workflow.roi))}>
                    {workflow.roi} ROI
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {workflow.setupTime}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.share && navigator.share({ title: workflow.title, text: workflow.description })}
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopy(workflow)}
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy Template
              </Button>
              <Button
                size="sm"
                onClick={() => onDeploy(workflow)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Zap className="w-4 h-4 mr-1" />
                Deploy Now
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview and Stack */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Workflow Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{workflow.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {workflow.category.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                  {workflow.department.map((dept) => (
                    <Badge key={dept} variant="outline">
                      {dept}
                    </Badge>
                  ))}
                </div>
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <h4 className="font-medium mb-2">Pain Point Addressed:</h4>
                  <p className="text-sm text-muted-foreground">{workflow.painPoint}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-2 bg-secondary/50 rounded-md">
                  <div className="text-lg font-bold text-primary">{workflow.setupTime}</div>
                  <div className="text-sm text-muted-foreground">Setup Time</div>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-md">
                  <div className="text-lg font-bold text-primary">{workflow.timeSaved}</div>
                  <div className="text-sm text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-md">
                  <div className="text-lg font-bold text-primary">{workflow.deployments}</div>
                  <div className="text-sm text-muted-foreground">Deployments</div>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-md">
                  <div className="text-lg font-bold text-primary">{workflow.rating}/5</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cog className="w-5 h-5" />
                Apps & Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflow.appIcons && Object.entries(workflow.appIcons).map(([name, icon]) => (
                  <div key={name} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-2xl">{icon}</div>
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-sm text-muted-foreground">Integration</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workflow Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Workflow Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workflow.steps.map((step, index) => (
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

          {/* Prerequisites */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Prerequisites & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {workflow.prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{prerequisite}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Info */}
          {workflow.complianceInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Compliance & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{workflow.complianceInfo}</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button 
              size="lg" 
              onClick={() => onDeploy(workflow)}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Zap className="w-5 h-5 mr-2" />
              Deploy Workflow
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onCopy(workflow)}
              className="flex-1"
            >
              <Copy className="w-5 h-5 mr-2" />
              Copy & Customize
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
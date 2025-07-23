import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentTemplate } from '@/data/agentTemplatesData';
import { Play, Copy, Share2, Clock, Users, Target, CheckCircle, Database, Cog, TrendingUp, ExternalLink, Zap, FileText, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentTemplateModalProps {
  agent: AgentTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (agent: AgentTemplate) => void;
  onCopy: (agent: AgentTemplate) => void;
}

export function AgentTemplateModal({ agent, isOpen, onClose, onDeploy, onCopy }: AgentTemplateModalProps) {
  if (!agent) return null;

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
                {Object.values(agent.stackIcons).slice(0, 3).map((icon, index) => (
                  <span key={index}>{icon}</span>
                ))}
              </div>
              <div>
                <DialogTitle className="text-2xl mb-2">{agent.name}</DialogTitle>
                <div className="flex gap-2">
                  <Badge className={cn("text-xs", getComplexityColor(agent.complexity))}>
                    {agent.complexity}
                  </Badge>
                  <Badge className={cn("text-xs", getROIColor(agent.estimatedROI))}>
                    {agent.estimatedROI} ROI
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {agent.setupTime}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.share && navigator.share({ title: agent.name, text: agent.shortDescription })}
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopy(agent)}
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy Template
              </Button>
              <Button
                size="sm"
                onClick={() => onDeploy(agent)}
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
                <CardTitle className="text-lg">Agent Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{agent.detailedDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {agent.category.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                  {agent.department.map((dept) => (
                    <Badge key={dept} variant="outline">
                      {dept}
                    </Badge>
                  ))}
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
                  <div className="text-lg font-bold text-primary">{agent.setupTime}</div>
                  <div className="text-sm text-muted-foreground">Setup Time</div>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-md">
                  <div className="text-lg font-bold text-primary">{agent.usage}</div>
                  <div className="text-sm text-muted-foreground">Deployments</div>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-md">
                  <div className="text-lg font-bold text-primary">{agent.views}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cog className="w-5 h-5" />
                Technology Stack & Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(agent.stackIcons).map(([name, icon]) => (
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

          {/* Input/Output Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Workflow Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div className="text-center flex-1">
                  <div className="text-2xl mb-2">📥</div>
                  <div className="font-medium">Input</div>
                  <div className="text-sm text-muted-foreground">{agent.inputOutputFlow.input}</div>
                </div>
                <div className="mx-4">→</div>
                <div className="text-center flex-1">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-medium">Process</div>
                  <div className="text-sm text-muted-foreground">{agent.inputOutputFlow.process}</div>
                </div>
                <div className="mx-4">→</div>
                <div className="text-center flex-1">
                  <div className="text-2xl mb-2">📤</div>
                  <div className="font-medium">Output</div>
                  <div className="text-sm text-muted-foreground">{agent.inputOutputFlow.output}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Implementation Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agent.implementationSteps.map((step, index) => (
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

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Use Cases & Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-2">
                {agent.useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials & Documentation */}
          <div className="grid md:grid-cols-2 gap-4">
            {agent.testimonials && agent.testimonials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {agent.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-3 bg-secondary/30 rounded-md italic">
                        "{testimonial}"
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resources & Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agent.docsLink && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={agent.docsLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Documentation
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Setup Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <GitBranch className="w-4 h-4 mr-2" />
                  View Template Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button 
              size="lg" 
              onClick={() => onDeploy(agent)}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Zap className="w-5 h-5 mr-2" />
              Deploy Instantly
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onCopy(agent)}
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
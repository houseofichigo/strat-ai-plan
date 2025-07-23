import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown, Database, Shield, Cog, Users, Target } from 'lucide-react';

export function PillarsTab() {
  const pillars = [
    {
      id: 'data-foundation',
      title: 'Data Foundation',
      icon: Database,
      score: 3.5,
      status: 'strong',
      description: 'Data architecture, quality, and governance capabilities',
      dimensions: [
        { name: 'Data Quality', score: 3.8, status: 'strong', description: 'Strong validation processes, gaps in completeness' },
        { name: 'Data Architecture', score: 3.2, status: 'developing', description: 'Modern cloud infrastructure, needs integration' },
        { name: 'Data Governance', score: 3.5, status: 'strong', description: 'Clear policies established, enforcement needed' },
        { name: 'Data Accessibility', score: 2.9, status: 'developing', description: 'Self-service limited, training required' }
      ]
    },
    {
      id: 'ai-strategy',
      title: 'AI Strategy & Vision',
      icon: Target,
      score: 2.8,
      status: 'developing',
      description: 'Strategic planning, use case definition, and business alignment',
      dimensions: [
        { name: 'Business Alignment', score: 2.5, status: 'developing', description: 'Limited connection to strategic objectives' },
        { name: 'Use Case Definition', score: 3.1, status: 'developing', description: 'Some clear opportunities identified' },
        { name: 'ROI Framework', score: 2.7, status: 'developing', description: 'Basic cost-benefit modeling in place' },
        { name: 'Competitive Strategy', score: 2.9, status: 'developing', description: 'Aware of competitive pressure' }
      ]
    },
    {
      id: 'technology',
      title: 'Technology Infrastructure',
      icon: Cog,
      score: 3.2,
      status: 'good',
      description: 'Technical capabilities, platforms, and integration maturity',
      dimensions: [
        { name: 'Platform Integration', score: 3.0, status: 'developing', description: 'Partial integration, some silos remain' },
        { name: 'Automation Maturity', score: 3.4, status: 'good', description: 'Good automation with reliable workflows' },
        { name: 'System Reliability', score: 3.3, status: 'good', description: 'Stable systems with monitoring' },
        { name: 'Scalability', score: 3.1, status: 'developing', description: 'Can scale but needs optimization' }
      ]
    },
    {
      id: 'talent',
      title: 'Talent & Culture',
      icon: Users,
      score: 2.9,
      status: 'developing',
      description: 'Team skills, learning culture, and organizational readiness',
      dimensions: [
        { name: 'AI Literacy', score: 3.2, status: 'developing', description: 'Basic to intermediate AI tool usage' },
        { name: 'Learning Culture', score: 2.8, status: 'developing', description: 'Some sharing, needs formalization' },
        { name: 'Change Adaptability', score: 2.7, status: 'developing', description: 'Moderate adoption speed' },
        { name: 'Skill Development', score: 2.9, status: 'developing', description: 'Ad-hoc learning approach' }
      ]
    },
    {
      id: 'governance',
      title: 'Governance & Ethics',
      icon: Shield,
      score: 3.1,
      status: 'good',
      description: 'Risk management, compliance, and ethical AI practices',
      dimensions: [
        { name: 'Risk Management', score: 3.3, status: 'good', description: 'Basic risk framework in place' },
        { name: 'Compliance Readiness', score: 2.9, status: 'developing', description: 'GDPR aware, AI Act preparation needed' },
        { name: 'Ethics Framework', score: 3.0, status: 'developing', description: 'Reactive approach to bias management' },
        { name: 'Audit Trail', score: 3.2, status: 'good', description: 'Partial logging and explainability' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong': return 'text-success';
      case 'good': return 'text-primary';
      case 'developing': return 'text-warning';
      case 'focus': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'strong': return CheckCircle;
      case 'good': return TrendingUp;
      case 'developing': return AlertCircle;
      case 'focus': return TrendingDown;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Detailed Pillar Analysis</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          In-depth assessment across all five dimensions of AI and data readiness
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-success/5 border-success/20">
          <CardContent className="text-center p-4">
            <div className="text-3xl font-bold text-success mb-1">2</div>
            <p className="text-sm text-success font-medium">Strong Areas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="text-center p-4">
            <div className="text-3xl font-bold text-primary mb-1">1</div>
            <p className="text-sm text-primary font-medium">Good Areas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="text-center p-4">
            <div className="text-3xl font-bold text-warning mb-1">2</div>
            <p className="text-sm text-warning font-medium">Developing</p>
          </CardContent>
        </Card>
        
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="text-center p-4">
            <div className="text-3xl font-bold text-destructive mb-1">0</div>
            <p className="text-sm text-destructive font-medium">Need Focus</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Pillar Analysis */}
      <div className="space-y-8">
        {pillars.map((pillar) => {
          const StatusIcon = getStatusIcon(pillar.status);
          return (
            <Card key={pillar.id} className="overflow-hidden">
              <CardHeader className="bg-accent/50 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-background">
                      <pillar.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        {pillar.title}
                        <Badge variant="outline" className={`${getStatusColor(pillar.status)} border-current`}>
                          {pillar.score}/5.0
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">{pillar.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusIcon className={`w-8 h-8 ${getStatusColor(pillar.status)}`} />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {pillar.dimensions.map((dimension, index) => {
                    const DimensionIcon = getStatusIcon(dimension.status);
                    return (
                      <div key={index} className="p-4 border rounded-lg hover:bg-accent/30 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <DimensionIcon className={`w-5 h-5 ${getStatusColor(dimension.status)}`} />
                            <div>
                              <h4 className="font-semibold">{dimension.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{dimension.description}</p>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className={`text-lg font-bold ${getStatusColor(dimension.status)}`}>
                              {dimension.score}/5.0
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Progress value={dimension.score * 20} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Current Score</span>
                            <span>{dimension.score * 20}% Complete</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Pillar Summary */}
                <div className="mt-6 p-4 bg-accent/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Pillar Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Average Score:</span>
                      <span className={`ml-2 font-bold ${getStatusColor(pillar.status)}`}>
                        {pillar.score}/5.0
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`ml-2 font-medium ${getStatusColor(pillar.status)} capitalize`}>
                        {pillar.status}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
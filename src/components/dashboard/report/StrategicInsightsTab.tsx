import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, Rocket, CheckCircle, TrendingUp, AlertTriangle, Users, Database, Shield } from 'lucide-react';

export function StrategicInsightsTab() {
  const phases = [
    {
      id: 'quick-wins',
      title: '30 Days - Quick Wins',
      subtitle: 'Immediate Impact',
      icon: Target,
      color: 'success',
      timeframe: '0-30 days',
      description: 'Low-risk, high-impact initiatives to build momentum',
      recommendations: 3,
      recommendations_list: [
        {
          title: 'Data Quality Assessment',
          description: 'Conduct comprehensive audit of existing data sources and implement immediate quality improvements.',
          priority: 'High',
          effort: 'Medium',
          impact: 'High',
          owner: 'Data Team',
          timeline: '2-3 weeks'
        },
        {
          title: 'AI Skills Training Program',
          description: 'Launch foundational AI literacy program for key stakeholders and technical teams.',
          priority: 'High',
          effort: 'Low',
          impact: 'High',
          owner: 'HR & Operations',
          timeline: '1-2 weeks'
        },
        {
          title: 'Quick Win Use Cases',
          description: 'Identify and prioritize 2-3 low-risk, high-impact AI use cases for immediate implementation.',
          priority: 'Medium',
          effort: 'Medium',
          impact: 'Medium',
          owner: 'Product Team',
          timeline: '3-4 weeks'
        }
      ]
    },
    {
      id: 'foundation',
      title: '90 Days - Foundation',
      subtitle: 'Infrastructure Building',
      icon: TrendingUp,
      color: 'primary',
      timeframe: '30-90 days',
      description: 'Establish robust infrastructure and governance frameworks',
      recommendations: 4,
      recommendations_list: [
        {
          title: 'Data Governance Framework',
          description: 'Implement comprehensive data governance policies, roles, and automated quality monitoring.',
          priority: 'High',
          effort: 'High',
          impact: 'High',
          owner: 'Data Governance Lead',
          timeline: '6-8 weeks'
        },
        {
          title: 'Integration Platform',
          description: 'Deploy automated data pipeline and API integration platform to connect siloed systems.',
          priority: 'High',
          effort: 'High',
          impact: 'High',
          owner: 'Engineering Team',
          timeline: '8-10 weeks'
        },
        {
          title: 'AI Ethics Committee',
          description: 'Establish AI ethics review board and implement bias monitoring for all AI initiatives.',
          priority: 'Medium',
          effort: 'Low',
          impact: 'High',
          owner: 'Legal & Compliance',
          timeline: '2-3 weeks'
        },
        {
          title: 'Pilot AI Applications',
          description: 'Deploy 2-3 AI pilot projects with full monitoring and success metrics tracking.',
          priority: 'High',
          effort: 'Medium',
          impact: 'High',
          owner: 'AI Product Team',
          timeline: '6-8 weeks'
        }
      ]
    },
    {
      id: 'transformation',
      title: '180 Days - Transformation',
      subtitle: 'Scale & Optimize',
      icon: Rocket,
      color: 'accent',
      timeframe: '90-180 days',
      description: 'Scale successful initiatives and optimize for enterprise-wide deployment',
      recommendations: 3,
      recommendations_list: [
        {
          title: 'Enterprise AI Platform',
          description: 'Deploy scalable AI/ML platform with automated model lifecycle management and monitoring.',
          priority: 'High',
          effort: 'High',
          impact: 'Very High',
          owner: 'AI Platform Team',
          timeline: '10-12 weeks'
        },
        {
          title: 'Advanced Analytics Suite',
          description: 'Implement predictive analytics across all business functions with real-time dashboards.',
          priority: 'Medium',
          effort: 'High',
          impact: 'High',
          owner: 'Analytics Team',
          timeline: '8-10 weeks'
        },
        {
          title: 'AI-First Processes',
          description: 'Redesign core business processes to be AI-native with continuous optimization capabilities.',
          priority: 'Medium',
          effort: 'Very High',
          impact: 'Very High',
          owner: 'Process Innovation Team',
          timeline: '12-16 weeks'
        }
      ]
    }
  ];

  const getPhaseColor = (color: string) => {
    switch (color) {
      case 'success': return { bg: 'bg-success/5', border: 'border-success/20', text: 'text-success' };
      case 'primary': return { bg: 'bg-primary/5', border: 'border-primary/20', text: 'text-primary' };
      case 'accent': return { bg: 'bg-accent/5', border: 'border-accent/20', text: 'text-accent-foreground' };
      default: return { bg: 'bg-muted/5', border: 'border-muted/20', text: 'text-muted-foreground' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'outline';
      case 'Medium': return 'secondary';
      case 'High': return 'default';
      case 'Very High': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Strategic Transformation Roadmap</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Phased approach to AI and data transformation with clear timelines, priorities, and success metrics
        </p>
      </div>

      {/* Phase Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phases.map((phase) => {
          const colors = getPhaseColor(phase.color);
          const Icon = phase.icon;
          
          return (
            <Card key={phase.id} className={`${colors.bg} ${colors.border} border-2`}>
              <CardContent className="text-center p-6">
                <div className="mb-4">
                  <div className={`w-16 h-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${colors.text} mb-1`}>{phase.title.split(' - ')[0]}</h3>
                <p className={`text-sm ${colors.text}/80 mb-3`}>{phase.subtitle}</p>
                <div className={`text-3xl font-bold ${colors.text} mb-1`}>{phase.recommendations}</div>
                <p className={`text-xs ${colors.text}/60 mb-3`}>Strategic Actions</p>
                <Badge variant="outline" className={`${colors.text} border-current`}>
                  {phase.timeframe}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Transformation Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">Phase 1 - Planning</span>
            </div>
            <Progress value={15} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="text-center">
                <div className="font-medium text-success">Quick Wins</div>
                <div>0-30 days</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-primary">Foundation</div>
                <div>30-90 days</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-accent-foreground">Transformation</div>
                <div>90-180 days</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Phase Breakdown */}
      <div className="space-y-8">
        {phases.map((phase) => {
          const colors = getPhaseColor(phase.color);
          const Icon = phase.icon;
          
          return (
            <Card key={phase.id} className="overflow-hidden">
              <CardHeader className={`${colors.bg} border-b ${colors.border}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full bg-background border ${colors.border}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className={`text-2xl ${colors.text}`}>
                      {phase.title}
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">{phase.description}</p>
                  </div>
                  <Badge variant="outline" className={`${colors.text} border-current`}>
                    {phase.timeframe}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  {phase.recommendations_list.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-6 hover:bg-accent/30 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2">{rec.title}</h4>
                          <p className="text-muted-foreground mb-3">{rec.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Badge variant={getPriorityColor(rec.priority)}>
                            {rec.priority} Priority
                          </Badge>
                          <Badge variant={getEffortColor(rec.effort)}>
                            {rec.effort} Effort
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Owner:</span>
                          <div className="font-medium">{rec.owner}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timeline:</span>
                          <div className="font-medium">{rec.timeline}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className="font-medium">{rec.impact}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Effort:</span>
                          <div className="font-medium">{rec.effort}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Next Steps */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Immediate Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">This Week</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Schedule data quality assessment kick-off
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Identify AI training program participants
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Create project steering committee
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Next 30 Days</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Complete data inventory and quality audit
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Launch AI literacy training program
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Define and prioritize quick-win use cases
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
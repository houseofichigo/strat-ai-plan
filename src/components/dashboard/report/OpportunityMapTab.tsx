import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, ArrowUpRight, Target, Clock, Users, DollarSign } from 'lucide-react';

export function OpportunityMapTab() {
  // Opportunity matrix data
  const opportunities = {
    quickWins: [
      { title: 'Automated Reporting', description: 'Generate weekly business reports automatically', effort: 2, impact: 4, timeline: '2-4 weeks', category: 'Analytics' },
      { title: 'Data Quality Monitoring', description: 'Implement automated data validation alerts', effort: 3, impact: 4, timeline: '3-6 weeks', category: 'Data' },
      { title: 'Basic Chatbot', description: 'FAQ chatbot for customer support', effort: 2, impact: 3, timeline: '2-3 weeks', category: 'Customer Service' }
    ],
    majorProjects: [
      { title: 'Predictive Analytics Platform', description: 'Full-scale predictive modeling for business forecasting', effort: 5, impact: 5, timeline: '3-6 months', category: 'Analytics' },
      { title: 'AI-Powered Personalization', description: 'Dynamic content and product recommendations', effort: 4, impact: 5, timeline: '4-8 months', category: 'Customer Experience' },
      { title: 'Intelligent Process Mining', description: 'AI-driven process optimization and automation', effort: 5, impact: 4, timeline: '6-12 months', category: 'Operations' }
    ],
    fillGaps: [
      { title: 'Data Governance Framework', description: 'Establish formal data policies and procedures', effort: 3, impact: 3, timeline: '4-8 weeks', category: 'Governance' },
      { title: 'AI Ethics Training', description: 'Company-wide AI literacy and ethics program', effort: 2, impact: 3, timeline: '2-4 weeks', category: 'Culture' },
      { title: 'Legacy System Integration', description: 'Connect older systems to modern data platform', effort: 3, impact: 2, timeline: '6-10 weeks', category: 'Technology' }
    ],
    questionable: [
      { title: 'Experimental AI Models', description: 'R&D investment in cutting-edge AI technologies', effort: 5, impact: 2, timeline: '6-12 months', category: 'Research' },
      { title: 'Blockchain Integration', description: 'Explore blockchain for data verification', effort: 4, impact: 1, timeline: '8-16 weeks', category: 'Technology' },
      { title: 'Advanced Computer Vision', description: 'Image recognition for specialized use cases', effort: 5, impact: 2, timeline: '4-8 months', category: 'Technology' }
    ]
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Analytics': 'bg-blue-500/10 text-blue-600 border-blue-200',
      'Data': 'bg-green-500/10 text-green-600 border-green-200',
      'Customer Service': 'bg-purple-500/10 text-purple-600 border-purple-200',
      'Customer Experience': 'bg-pink-500/10 text-pink-600 border-pink-200',
      'Operations': 'bg-orange-500/10 text-orange-600 border-orange-200',
      'Governance': 'bg-gray-500/10 text-gray-600 border-gray-200',
      'Culture': 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
      'Technology': 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
      'Research': 'bg-indigo-500/10 text-indigo-600 border-indigo-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-600 border-gray-200';
  };

  const OpportunityCard = ({ opportunity, className }: { opportunity: any, className?: string }) => (
    <div className={`p-4 border rounded-lg hover:shadow-md transition-all ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{opportunity.title}</h4>
          <p className="text-xs text-muted-foreground mb-2">{opportunity.description}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
          <Clock className="w-3 h-3" />
          {opportunity.timeline}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={`text-xs ${getCategoryColor(opportunity.category)}`}>
          {opportunity.category}
        </Badge>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <ArrowUp className="w-3 h-3 text-success" />
            <span>Impact: {opportunity.impact}/5</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3 text-warning" />
            <span>Effort: {opportunity.effort}/5</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Opportunity Prioritization Matrix</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Strategic prioritization based on impact vs effort analysis to maximize ROI and minimize risk
        </p>
      </div>

      {/* Matrix Overview */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Impact vs Effort Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 h-96">
            {/* Quick Wins - High Impact, Low Effort */}
            <Card className="bg-success/5 border-success/20 border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-success flex items-center gap-2 text-lg">
                  <ArrowUpRight className="w-5 h-5" />
                  Quick Wins
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-sm text-success/80 font-medium">High Impact, Low Effort</p>
                  <p className="text-xs text-muted-foreground">Immediate implementation priorities</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {opportunities.quickWins.map((opp, index) => (
                  <OpportunityCard key={index} opportunity={opp} className="bg-success/5" />
                ))}
              </CardContent>
            </Card>

            {/* Major Projects - High Impact, High Effort */}
            <Card className="bg-primary/5 border-primary/20 border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2 text-lg">
                  <ArrowUp className="w-5 h-5" />
                  Major Projects
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-sm text-primary/80 font-medium">High Impact, High Effort</p>
                  <p className="text-xs text-muted-foreground">Strategic investments with planning required</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {opportunities.majorProjects.map((opp, index) => (
                  <OpportunityCard key={index} opportunity={opp} className="bg-primary/5" />
                ))}
              </CardContent>
            </Card>

            {/* Fill the Gaps - Low Impact, Low Effort */}
            <Card className="bg-warning/5 border-warning/20 border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-warning flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5" />
                  Fill the Gaps
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-sm text-warning/80 font-medium">Low Impact, Low Effort</p>
                  <p className="text-xs text-muted-foreground">Foundation building and maintenance</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {opportunities.fillGaps.map((opp, index) => (
                  <OpportunityCard key={index} opportunity={opp} className="bg-warning/5" />
                ))}
              </CardContent>
            </Card>

            {/* Questionable - Low Impact, High Effort */}
            <Card className="bg-destructive/5 border-destructive/20 border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-destructive flex items-center gap-2 text-lg">
                  <ArrowDown className="w-5 h-5" />
                  Questionable
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-sm text-destructive/80 font-medium">Low Impact, High Effort</p>
                  <p className="text-xs text-muted-foreground">Carefully evaluate before proceeding</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {opportunities.questionable.map((opp, index) => (
                  <OpportunityCard key={index} opportunity={opp} className="bg-destructive/5" />
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recommended Implementation Sequence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 - Immediate */}
            <div className="text-center space-y-4">
              <div className="bg-success/10 rounded-lg p-6 border border-success/20">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="font-bold text-success mb-2 text-lg">Phase 1</h3>
                <p className="text-sm text-success/80 font-medium">Immediate (0-3 months)</p>
                <p className="text-xs text-muted-foreground mt-2">Focus on Quick Wins</p>
              </div>
              <div className="space-y-3">
                {opportunities.quickWins.map((opp, index) => (
                  <div key={index} className="p-3 bg-success/5 rounded-lg border border-success/10">
                    <div className="font-medium text-sm">{opp.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{opp.timeline}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2 - Foundation */}
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📈</span>
                </div>
                <h3 className="font-bold text-primary mb-2 text-lg">Phase 2</h3>
                <p className="text-sm text-primary/80 font-medium">Foundation (3-9 months)</p>
                <p className="text-xs text-muted-foreground mt-2">Build Infrastructure</p>
              </div>
              <div className="space-y-3">
                {opportunities.fillGaps.map((opp, index) => (
                  <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="font-medium text-sm">{opp.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{opp.timeline}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 3 - Transformation */}
            <div className="text-center space-y-4">
              <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🚀</span>
                </div>
                <h3 className="font-bold text-accent-foreground mb-2 text-lg">Phase 3</h3>
                <p className="text-sm text-muted-foreground font-medium">Transformation (9+ months)</p>
                <p className="text-xs text-muted-foreground mt-2">Scale Major Projects</p>
              </div>
              <div className="space-y-3">
                {opportunities.majorProjects.map((opp, index) => (
                  <div key={index} className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <div className="font-medium text-sm">{opp.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{opp.timeline}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            ROI Projections by Phase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-success mb-2">250%</div>
              <div className="text-sm text-muted-foreground">Phase 1 ROI</div>
              <div className="text-xs text-muted-foreground mt-1">Expected within 6 months</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">180%</div>
              <div className="text-sm text-muted-foreground">Phase 2 ROI</div>
              <div className="text-xs text-muted-foreground mt-1">Expected within 12 months</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-accent-foreground mb-2">320%</div>
              <div className="text-sm text-muted-foreground">Phase 3 ROI</div>
              <div className="text-xs text-muted-foreground mt-1">Expected within 18 months</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}